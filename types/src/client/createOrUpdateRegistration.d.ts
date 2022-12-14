import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../models/registration.js";
/**
 * Creates or updates a registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create or update.
 * @param options - The operation options.
 * @returns The created or updated registration description.
 */
export declare function createOrUpdateRegistration(context: NotificationHubsClientContext, registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
//# sourceMappingURL=createOrUpdateRegistration.d.ts.map