// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createRequest, parseNotificationResponse, sendRequest } from "./internal/_client.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Updates an installation using the JSON-Patch standard in RFC6902.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to update.
 * @param installationPatches - An array of patches following the JSON-Patch standard.
 * @param options - Configuration options for the patch installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function updateInstallation(context, installationId, installationPatches, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-updateInstallation", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/json");
        const request = createRequest(endpoint, "PATCH", headers, updatedOptions);
        request.body = JSON.stringify(installationPatches);
        const response = await sendRequest(context, request, 200);
        return parseNotificationResponse(response);
    });
}
//# sourceMappingURL=updateInstallation.js.map