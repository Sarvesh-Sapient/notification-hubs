// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createRequest, sendRequest } from "./internal/_client.js";
import { parseNotificationHubJobFeed } from "../serializers/notificationHubJobSerializer.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Gets all Notification Hub Jobs for this Notification Hub.
 * @param context - The Notification Hubs client.xs
 * @param options - The operation options.
 * @returns An array of all Notification Hub Jobs for this Notification Hub.
 */
export function listNotificationHubJobs(context, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-getNotificationHubJobs", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/jobs";
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        const request = createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await sendRequest(context, request, 200);
        return parseNotificationHubJobFeed(response.bodyAsText);
    });
}
//# sourceMappingURL=listNotificationHubJobs.js.map