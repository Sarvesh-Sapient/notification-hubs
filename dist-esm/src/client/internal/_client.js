// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RestError, createPipelineRequest, } from "@azure/core-rest-pipeline";
import { isDefined } from "../../utils/utils.js";
import { parseXMLError } from "../../utils/xmlUtils.js";
/**
 * @internal
 */
export function createRequest(endpoint, method, headers, options) {
    return createPipelineRequest(Object.assign(Object.assign(Object.assign({}, options.tracingOptions), options.requestOptions), { url: endpoint.toString(), abortSignal: options.abortSignal, method,
        headers }));
}
/**
 * @internal
 */
export function parseNotificationResponse(response) {
    const correlationId = response.headers.get("x-ms-correlation-request-id");
    const trackingId = response.headers.get("TrackingId");
    const location = response.headers.get("Location");
    return {
        correlationId,
        trackingId,
        location,
    };
}
/**
 * @internal
 */
export function parseNotificationSendResponse(response) {
    const result = parseNotificationResponse(response);
    let notificationId;
    if (result.location) {
        const locationUrl = new URL(result.location);
        notificationId = locationUrl.pathname.split("/")[3];
    }
    return Object.assign(Object.assign({}, result), { notificationId });
}
/**
 * Sends a request through the client context.
 * @param context - The client context to use.
 * @param request - The HTTP request to send.
 * @param successStatusCode - A status code or list of status codes to check for success.
 * @returns The HTTP Response.
 */
export async function sendRequest(context, request, successStatusCode) {
    const statuses = Array.isArray(successStatusCode)
        ? successStatusCode
        : [successStatusCode];
    const response = await context.sendRequest(request);
    if (!statuses.some((statusCode) => statusCode === response.status)) {
        const responseBody = response.bodyAsText;
        let details;
        if (isDefined(responseBody)) {
            try {
                details = await parseXMLError(responseBody);
            }
            catch (err) {
                // eslint-disable no-empty
            }
        }
        let errorMessage;
        if (isDefined(details)) {
            errorMessage = `operations failed with: ${details}`;
        }
        else {
            errorMessage = `operation failed with status ${response.status}`;
        }
        throw new RestError(errorMessage, {
            statusCode: response.status,
            response,
        });
    }
    return response;
}
//# sourceMappingURL=_client.js.map