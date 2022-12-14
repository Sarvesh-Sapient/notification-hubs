import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../models/registration.js";
/**
 * Creates a new registration. This method generates a registration ID,
 * which you can subsequently use to retrieve, update, and delete this registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create.
 * @param options - Options for creating a new registration.
 * @returns The newly created registration description.
 */
export declare function createRegistration(context: NotificationHubsClientContext, registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
//# sourceMappingURL=createRegistration.d.ts.map