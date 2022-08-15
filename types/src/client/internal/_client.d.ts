/// <reference types="node" resolution-mode="require"/>
import { HttpHeaders, HttpMethods, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { NotificationHubsMessageResponse, NotificationHubsResponse } from "../../models/response.js";
import { NotificationHubsClientContext } from "../index.js";
import { OperationOptions } from "@azure/core-client";
/**
 * @internal
 */
export declare function createRequest(endpoint: URL, method: HttpMethods, headers: HttpHeaders, options: OperationOptions): PipelineRequest;
/**
 * @internal
 */
export declare function parseNotificationResponse(response: PipelineResponse): NotificationHubsResponse;
/**
 * @internal
 */
export declare function parseNotificationSendResponse(response: PipelineResponse): NotificationHubsMessageResponse;
/**
 * Sends a request through the client context.
 * @param context - The client context to use.
 * @param request - The HTTP request to send.
 * @param successStatusCode - A status code or list of status codes to check for success.
 * @returns The HTTP Response.
 */
export declare function sendRequest(context: NotificationHubsClientContext, request: PipelineRequest, successStatusCode: number | number[]): Promise<PipelineResponse>;
//# sourceMappingURL=_client.d.ts.map