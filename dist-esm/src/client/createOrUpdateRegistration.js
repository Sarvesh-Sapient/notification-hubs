// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Creates or updates a registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create or update.
 * @param options - The operation options.
 * @returns The created or updated registration description.
 */
export function createOrUpdateRegistration(context, registration, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-createOrUpdateRegistration", options, async (updatedOptions) => {
        return createOrUpdateRegistrationDescription(context, registration, "createOrUpdate", updatedOptions);
    });
}
//# sourceMappingURL=createOrUpdateRegistration.js.map