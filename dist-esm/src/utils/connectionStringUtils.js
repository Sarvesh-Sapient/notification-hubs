// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createSasTokenProvider, parseConnectionString } from "@azure/core-amqp";
/**
 * Creates a SasTokenProvider from a shared access key and shared access key name.
 * @param sharedAccessKey - The shared access key value.
 * @param sharedAccessKeyName - The shared access key name.
 * @returns A SasTokenProvider with the given shared access token information.
 */
export function createTokenProviderFromConnection(sharedAccessKey, sharedAccessKeyName) {
    return createSasTokenProvider({ sharedAccessKey, sharedAccessKeyName });
}
/**
 * Parses given connection string into the different properties applicable to Azure Service Bus.
 * The properties are useful to then construct a ServiceBusClient.
 * @param connectionString - The connection string associated with the Shared Access Policy created
 * for the Service Bus namespace, queue or topic.
 */
export function parseNotificationHubsConnectionString(connectionString) {
    const parsedResult = parseConnectionString(connectionString);
    if (!parsedResult.Endpoint) {
        throw new Error("Connection string should have an Endpoint key.");
    }
    if (parsedResult.SharedAccessKey && !parsedResult.SharedAccessKeyName) {
        throw new Error("Connection string with SharedAccessKey should have SharedAccessKeyName.");
    }
    else if (!parsedResult.SharedAccessKey && parsedResult.SharedAccessKeyName) {
        throw new Error("Connection string with SharedAccessKeyName should have SharedAccessKey as well.");
    }
    const output = {
        endpoint: parsedResult.Endpoint,
        sharedAccessKey: parsedResult.SharedAccessKey,
        sharedAccessKeyName: parsedResult.SharedAccessKeyName,
    };
    return output;
}
//# sourceMappingURL=connectionStringUtils.js.map