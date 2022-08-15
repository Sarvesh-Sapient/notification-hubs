// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createRequest, parseNotificationSendResponse, sendRequest } from "./_client.js";
import { tracingClient } from "../../utils/tracing.js";
/**
 * @internal
 */
export function sendNotificationPayload(context, notification, method, pushHandle, tags, options = {}) {
    return tracingClient.withSpan(`NotificationHubsClientContext-${method}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/messages/";
        if (options.enableTestSend) {
            endpoint.searchParams.append("debug", "true");
        }
        const headers = context.createHeaders();
        if (notification.headers) {
            for (const headerName of Object.keys(notification.headers)) {
                headers.set(headerName, notification.headers[headerName]);
            }
        }
        if (pushHandle) {
            endpoint.searchParams.append("direct", "true");
            if (notification.platform === "browser") {
                const browserHandle = pushHandle;
                headers.set("ServiceBusNotification-DeviceHandle", browserHandle.endpoint);
                headers.set("Auth", browserHandle.auth);
                headers.set("P256DH", browserHandle.p256dh);
            }
            else {
                headers.set("ServiceBusNotification-DeviceHandle", pushHandle);
            }
        }
        headers.set("Content-Type", notification.contentType);
        headers.set("ServiceBusNotification-Format", notification.platform);
        if (tags) {
            let tagExpression = null;
            if (Array.isArray(tags)) {
                tagExpression = tags.join("||");
            }
            else {
                tagExpression = tags;
            }
            headers.set("ServiceBusNotification-Tags", tagExpression);
        }
        const request = createRequest(endpoint, "POST", headers, updatedOptions);
        request.body = notification.body;
        const response = await sendRequest(context, request, 201);
        return parseNotificationSendResponse(response);
    });
}
//# sourceMappingURL=_sendNotificationPayload.js.map