// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createRequest, parseNotificationResponse, sendRequest } from "./internal/_client.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Deletes an installation from a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installationId - The installation ID of the installation to delete.
 * @param options - Configuration options for the installation delete operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function deleteInstallation(context, installationId, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-deleteInstallation", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = context.createHeaders();
        const request = createRequest(endpoint, "DELETE", headers, updatedOptions);
        const response = await sendRequest(context, request, 204);
        return parseNotificationResponse(response);
    });
}
//# sourceMappingURL=deleteInstallation.js.map