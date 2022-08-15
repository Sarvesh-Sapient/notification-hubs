import { PushHandle } from "../../models/installation.js";
import { Notification } from "../../models/notification.js";
import { NotificationHubsClientContext } from "../index.js";
import { NotificationHubsMessageResponse } from "../../models/response.js";
import { SendOperationOptions } from "../../models/options.js";
/**
 * @internal
 */
export declare function sendNotificationPayload(context: NotificationHubsClientContext, notification: Notification, method: string, pushHandle?: PushHandle, tags?: string | string[], options?: SendOperationOptions): Promise<NotificationHubsMessageResponse>;
//# sourceMappingURL=_sendNotificationPayload.d.ts.map