// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createRequest, sendRequest } from "./internal/_client.js";
import { parseNotificationHubJobEntry, serializeNotificationHubJobEntry, } from "../serializers/notificationHubJobSerializer.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Submits a Notification Hub Job.
 * Note: this is available to Standard SKU namespace and above.
 * @param context - The Notification Hubs client.
 * @param job - The notification hub job to submit.
 * @param options - The operation options.
 * @returns The notification hub job details including job ID and status.
 */
export function submitNotificationHubJob(context, job, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-submitNotificationHubJob", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/jobs";
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        const request = createRequest(endpoint, "POST", headers, updatedOptions);
        request.body = serializeNotificationHubJobEntry(job);
        const response = await sendRequest(context, request, 201);
        return parseNotificationHubJobEntry(response.bodyAsText);
    });
}
//# sourceMappingURL=submitNotificationHubJob.js.map