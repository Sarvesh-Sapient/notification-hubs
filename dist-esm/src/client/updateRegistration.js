// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RestError } from "@azure/core-rest-pipeline";
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Updates an existing registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to update.
 * @param options - The operation options.
 * @returns The updated registration description.
 */
export function updateRegistration(context, registration, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-updateRegistration", options, async (updatedOptions) => {
        if (!registration.etag) {
            throw new RestError("ETag is required for registration update", { statusCode: 400 });
        }
        return createOrUpdateRegistrationDescription(context, registration, "update", updatedOptions);
    });
}
//# sourceMappingURL=updateRegistration.js.map