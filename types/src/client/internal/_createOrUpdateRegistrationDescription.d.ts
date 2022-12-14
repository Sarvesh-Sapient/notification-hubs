import { NotificationHubsClientContext } from "../index.js";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../../models/registration.js";
/**
 * @internal
 */
export declare function createOrUpdateRegistrationDescription(context: NotificationHubsClientContext, registration: RegistrationDescription, operationName: "create" | "createOrUpdate" | "update", options: OperationOptions): Promise<RegistrationDescription>;
//# sourceMappingURL=_createOrUpdateRegistrationDescription.d.ts.map