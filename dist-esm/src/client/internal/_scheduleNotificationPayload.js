// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createRequest, parseNotificationSendResponse, sendRequest } from "./_client.js";
import { tracingClient } from "../../utils/tracing.js";
/**
 * @internal
 */
export function scheduleNotificationPayload(context, scheduledTime, tags, notification, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-$scheduleNotification", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/schedulednotifications/";
        const headers = context.createHeaders();
        if (notification.headers) {
            for (const headerName of Object.keys(notification.headers)) {
                headers.set(headerName, notification.headers[headerName]);
            }
        }
        headers.set("ServiceBusNotification-ScheduleTime", scheduledTime.toISOString());
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
//# sourceMappingURL=_scheduleNotificationPayload.js.map