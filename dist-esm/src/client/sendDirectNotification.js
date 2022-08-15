// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { sendNotificationPayload } from "./internal/_sendNotificationPayload.js";
/**
 * Sends a direct push notification to a device with the given push handle.
 * @param context - The Notification Hubs client.
 * @param pushHandle - The push handle which is the unique identifier for the device.
 * @param notification - The notification to send to the device.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendDirectNotification(context, pushHandle, notification, options = {}) {
    return sendNotificationPayload(context, notification, "sendDirectNotification", pushHandle, undefined, options);
}
//# sourceMappingURL=sendDirectNotification.js.map