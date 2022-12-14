// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RestError } from "@azure/core-rest-pipeline";
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Creates a new registration. This method generates a registration ID,
 * which you can subsequently use to retrieve, update, and delete this registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create.
 * @param options - Options for creating a new registration.
 * @returns The newly created registration description.
 */
export function createRegistration(context, registration, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-createRegistration", options, async (updatedOptions) => {
        if (registration.registrationId) {
            throw new RestError("registrationId must not be set during a create operation", {
                statusCode: 400,
            });
        }
        return createOrUpdateRegistrationDescription(context, registration, "create", updatedOptions);
    });
}
//# sourceMappingURL=createRegistration.js.map