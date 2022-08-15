// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createHttpHeaders, } from "@azure/core-rest-pipeline";
import { createTokenProviderFromConnection, parseNotificationHubsConnectionString, } from "../utils/connectionStringUtils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { ServiceClient } from "@azure/core-client";
const API_VERSION = "2020-06";
/**
 * Creates a NotificationHubClient from the Access Policy connection string and hub name.
 * @param connectionString - The Access Policy connection string for the notification hub.
 * @param hubName - The notification hub name.
 * @returns A NotificationHubsClientContext initialized from the connection string and hub name.
 */
export function createClientContext(connectionString, hubName, options = {}) {
    return new NotificationHubsServiceClient(connectionString, hubName, options);
}
class NotificationHubsServiceClient extends ServiceClient {
    constructor(connectionString, hubName, options = {}) {
        super(Object.assign({ deserializationOptions: {
                parseXML,
            }, serializationOptions: {
                stringifyXML,
            } }, options));
        this.hubName = hubName;
        const parsedConnection = parseNotificationHubsConnectionString(connectionString);
        this.baseUrl = parsedConnection.endpoint;
        this.sasTokenProvider = createTokenProviderFromConnection(parsedConnection.sharedAccessKey, parsedConnection.sharedAccessKeyName);
    }
    createHeaders() {
        const authorization = this.sasTokenProvider.getToken(this.baseUrl);
        const headers = createHttpHeaders();
        headers.set("Authorization", authorization.token);
        headers.set("x-ms-version", API_VERSION);
        return headers;
    }
    requestUrl() {
        // Node doesn't allow change in protocol but browsers do, so doing a string replace
        const url = new URL(this.baseUrl.replace("sb://", "https://"));
        url.pathname = this.hubName;
        url.searchParams.set("api-version", API_VERSION);
        return url;
    }
}
//# sourceMappingURL=index.js.map