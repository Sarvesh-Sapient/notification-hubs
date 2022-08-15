/// <reference types="node" resolution-mode="require"/>
import { HttpHeaders, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { NotificationHubsClientOptions } from "../models/options.js";
import { SasTokenProvider } from "@azure/core-amqp";
/**
 * Represents the Notification Hubs SDK client context.
 */
export interface NotificationHubsClientContext {
    /**
     * The SAS Token Provider for connecting to Notification Hubs.
     */
    readonly sasTokenProvider: SasTokenProvider;
    /**
     * The base URL for the Notification Hub namespace.
     */
    readonly baseUrl: string;
    /**
     * The Notification Hub name.
     */
    readonly hubName: string;
    /**
     * @internal
     */
    sendRequest(request: PipelineRequest): Promise<PipelineResponse>;
    /**
     * @internal
     */
    createHeaders(): HttpHeaders;
    /**
     * @internal
     */
    requestUrl(): URL;
}
/**
 * Creates a NotificationHubClient from the Access Policy connection string and hub name.
 * @param connectionString - The Access Policy connection string for the notification hub.
 * @param hubName - The notification hub name.
 * @returns A NotificationHubsClientContext initialized from the connection string and hub name.
 */
export declare function createClientContext(connectionString: string, hubName: string, options?: NotificationHubsClientOptions): NotificationHubsClientContext;
//# sourceMappingURL=index.d.ts.map