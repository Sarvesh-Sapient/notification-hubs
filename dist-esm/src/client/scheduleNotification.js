// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { scheduleNotificationPayload } from "./internal/_scheduleNotificationPayload.js";
/**
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function scheduleNotification(context, scheduledTime, tags, notification, options = {}) {
    return scheduleNotificationPayload(context, scheduledTime, tags, notification, options);
}
//# sourceMappingURL=scheduleNotification.js.map