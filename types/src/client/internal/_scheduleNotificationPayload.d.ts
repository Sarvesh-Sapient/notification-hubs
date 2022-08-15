import { Notification } from "../../models/notification.js";
import { NotificationHubsClientContext } from "../index.js";
import { NotificationHubsMessageResponse } from "../../models/response.js";
import { OperationOptions } from "@azure/core-client";
/**
 * @internal
 */
export declare function scheduleNotificationPayload(context: NotificationHubsClientContext, scheduledTime: Date, tags: string[] | string | undefined, notification: Notification, options?: OperationOptions): Promise<NotificationHubsMessageResponse>;
//# sourceMappingURL=_scheduleNotificationPayload.d.ts.map