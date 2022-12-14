import { Installation } from "../models/installation.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
/**
 * Gets an Azure Notification Hub installation by the installation ID.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to get.
 * @param options - Configuration options for the get installation operation.
 * @returns The installation that matches the installation ID.
 */
export declare function getInstallation(context: NotificationHubsClientContext, installationId: string, options?: OperationOptions): Promise<Installation>;
//# sourceMappingURL=getInstallation.d.ts.map