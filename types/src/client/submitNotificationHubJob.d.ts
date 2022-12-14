import { NotificationHubJob } from "../models/notificationHubJob.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
/**
 * Submits a Notification Hub Job.
 * Note: this is available to Standard SKU namespace and above.
 * @param context - The Notification Hubs client.
 * @param job - The notification hub job to submit.
 * @param options - The operation options.
 * @returns The notification hub job details including job ID and status.
 */
export declare function submitNotificationHubJob(context: NotificationHubsClientContext, job: NotificationHubJob, options?: OperationOptions): Promise<NotificationHubJob>;
//# sourceMappingURL=submitNotificationHubJob.d.ts.map