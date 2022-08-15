'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreRestPipeline = require('@azure/core-rest-pipeline');
var coreAmqp = require('@azure/core-amqp');
var coreXml = require('@azure/core-xml');
var coreClient = require('@azure/core-client');
var coreTracing = require('@azure/core-tracing');
var tslib = require('tslib');

// Copyright (c) Microsoft Corporation.
/**
 * Creates a SasTokenProvider from a shared access key and shared access key name.
 * @param sharedAccessKey - The shared access key value.
 * @param sharedAccessKeyName - The shared access key name.
 * @returns A SasTokenProvider with the given shared access token information.
 */
function createTokenProviderFromConnection(sharedAccessKey, sharedAccessKeyName) {
    return coreAmqp.createSasTokenProvider({ sharedAccessKey, sharedAccessKeyName });
}
/**
 * Parses given connection string into the different properties applicable to Azure Service Bus.
 * The properties are useful to then construct a ServiceBusClient.
 * @param connectionString - The connection string associated with the Shared Access Policy created
 * for the Service Bus namespace, queue or topic.
 */
function parseNotificationHubsConnectionString(connectionString) {
    const parsedResult = coreAmqp.parseConnectionString(connectionString);
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

// Copyright (c) Microsoft Corporation.
const API_VERSION = "2020-06";
/**
 * Creates a NotificationHubClient from the Access Policy connection string and hub name.
 * @param connectionString - The Access Policy connection string for the notification hub.
 * @param hubName - The notification hub name.
 * @returns A NotificationHubsClientContext initialized from the connection string and hub name.
 */
function createClientContext(connectionString, hubName, options = {}) {
    return new NotificationHubsServiceClient$1(connectionString, hubName, options);
}
class NotificationHubsServiceClient$1 extends coreClient.ServiceClient {
    constructor(connectionString, hubName, options = {}) {
        super(Object.assign({ deserializationOptions: {
                parseXML: coreXml.parseXML,
            }, serializationOptions: {
                stringifyXML: coreXml.stringifyXML,
            } }, options));
        this.hubName = hubName;
        const parsedConnection = parseNotificationHubsConnectionString(connectionString);
        this.baseUrl = parsedConnection.endpoint;
        this.sasTokenProvider = createTokenProviderFromConnection(parsedConnection.sharedAccessKey, parsedConnection.sharedAccessKeyName);
    }
    createHeaders() {
        const authorization = this.sasTokenProvider.getToken(this.baseUrl);
        const headers = coreRestPipeline.createHttpHeaders();
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
function isDefined(thing) {
    return typeof thing !== "undefined" && thing !== null;
}
/**
 * Helper TypeGuard that checks if something is a string or not.
 * @param thing - Anything
 * @internal
 */
function isString(thing) {
    return typeof thing === "string" || thing instanceof String;
}
/**
 * @internal
 * Helper utility to retrieve `string` value from given string,
 * or throws error if undefined.
 */
function getString(value, nameOfProperty) {
    const result = getStringOrUndefined(value);
    if (result === undefined) {
        throw new Error(`"${nameOfProperty}" received from service expected to be a string value and not undefined.`);
    }
    return result;
}
/**
 * @internal
 * Helper utility to retrieve `string` value from given input,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getStringOrUndefined(value) {
    if (!isDefined(value)) {
        return undefined;
    }
    return value.toString();
}
/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or throws error if undefined.
 */
function getInteger(value, nameOfProperty) {
    const result = getIntegerOrUndefined(value);
    if (result === undefined) {
        throw new Error(`"${nameOfProperty}" received from service expected to be a number value and not undefined.`);
    }
    return result;
}
/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getIntegerOrUndefined(value) {
    if (!isDefined(value)) {
        return undefined;
    }
    const result = parseInt(value.toString());
    return isNaN(result) ? undefined : result;
}
/**
 * @internal
 * Helper utility to retrieve `float` value from given string,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getFloatOrUndefined(value) {
    if (!isDefined(value)) {
        return undefined;
    }
    const result = parseFloat(value.toString());
    return Number.isNaN(result) ? undefined : result;
}
/**
 * @internal
 * Helper utility to convert ISO-8601 time into Date type,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getDateOrUndefined(value) {
    const stringValue = getStringOrUndefined(value);
    if (stringValue === undefined) {
        return undefined;
    }
    const result = new Date(stringValue.toString());
    return Number.isNaN(+result) ? undefined : result;
}
/**
 * @internal
 * Helper utility to parse tags from a comma separated string.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getTagsOrUndefined(value) {
    const result = getStringOrUndefined(value);
    if (result === undefined) {
        return undefined;
    }
    return result.split(",");
}

// Copyright (c) Microsoft Corporation.
/**
 * Marker for atom metadata.
 *
 * @internal
 */
const XML_METADATA_MARKER = "$";
/**
 * @internal
 * Helps in differentiating JSON like objects from other kinds of objects.
 */
const EMPTY_JSON_OBJECT_CONSTRUCTOR = {}.constructor;
/**
 * @internal
 * Returns `true` if given input is a JSON like object.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function isJSONLikeObject(value) {
    // `value.constructor === {}.constructor` differentiates among the "object"s,
    //    would filter the JSON objects and won't match any array or other kinds of objects
    // -------------------------------------------------------------------------------
    // Few examples       | typeof obj ==="object" |  obj.constructor==={}.constructor
    // -------------------------------------------------------------------------------
    // {abc:1}            | true                   | true
    // ["a","b"]          | true                   | false
    // [{"a":1},{"b":2}]  | true                   | false
    // new Date()         | true                   | false
    // 123                | false                  | false
    // -------------------------------------------------------------------------------
    return typeof value === "object" && value.constructor === EMPTY_JSON_OBJECT_CONSTRUCTOR;
}
/**
 * @internal
 * The key-value pairs having undefined/null as the values would lead to the empty tags in the serialized XML request.
 * Empty tags in the request body is problematic because of the following reasons.
 * - ATOM based management operations throw a "Bad Request" error if empty tags are included in the XML request body at top level.
 * - At the inner levels, Service assigns the empty strings as values to the empty tags instead of throwing an error.
 *
 * This method recursively removes the key-value pairs with undefined/null as the values from the request object that is to be serialized.
 *
 */
function sanitizeSerializableObject(resource) {
    Object.keys(resource).forEach(function (property) {
        if (!isDefined(resource[property])) {
            delete resource[property];
        }
        else if (isJSONLikeObject(resource[property])) {
            sanitizeSerializableObject(resource[property]);
        }
    });
}
/**
 * @internal
 * Serializes input information to construct the Atom XML request
 * @param resourceName - Name of the resource to be serialized like `QueueDescription`
 * @param resource - The entity details
 * @returns An object to be serialized into a string.
 */
function serializeToAtomXmlRequest(resourceName, resource) {
    const content = {};
    content[resourceName] = Object.assign({}, resource);
    sanitizeSerializableObject(content[resourceName]);
    content[resourceName][XML_METADATA_MARKER] = {
        xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
        "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance",
    };
    content[XML_METADATA_MARKER] = { type: "application/xml" };
    const requestDetails = {
        updated: new Date().toISOString(),
        content: content,
    };
    requestDetails[XML_METADATA_MARKER] = {
        xmlns: "http://www.w3.org/2005/Atom",
    };
    return requestDetails;
}
/**
 * @internal
 * Parses the XML message from a Notification Hubs response
 * @param bodyText - The HTTP response body.
 * @returns The notification details if any from the XML.
 */
async function parseXMLError(bodyText) {
    let result;
    const xmlError = await coreXml.parseXML(bodyText, { includeRoot: true });
    const detail = xmlError["Detail"];
    if (isDefined(detail)) {
        return detail;
    }
    return result;
}

// Copyright (c) Microsoft Corporation.
/**
 * @internal
 */
function createRequest(endpoint, method, headers, options) {
    return coreRestPipeline.createPipelineRequest(Object.assign(Object.assign(Object.assign({}, options.tracingOptions), options.requestOptions), { url: endpoint.toString(), abortSignal: options.abortSignal, method,
        headers }));
}
/**
 * @internal
 */
function parseNotificationResponse(response) {
    const correlationId = response.headers.get("x-ms-correlation-request-id");
    const trackingId = response.headers.get("TrackingId");
    const location = response.headers.get("Location");
    return {
        correlationId,
        trackingId,
        location,
    };
}
/**
 * @internal
 */
function parseNotificationSendResponse(response) {
    const result = parseNotificationResponse(response);
    let notificationId;
    if (result.location) {
        const locationUrl = new URL(result.location);
        notificationId = locationUrl.pathname.split("/")[3];
    }
    return Object.assign(Object.assign({}, result), { notificationId });
}
/**
 * Sends a request through the client context.
 * @param context - The client context to use.
 * @param request - The HTTP request to send.
 * @param successStatusCode - A status code or list of status codes to check for success.
 * @returns The HTTP Response.
 */
async function sendRequest(context, request, successStatusCode) {
    const statuses = Array.isArray(successStatusCode)
        ? successStatusCode
        : [successStatusCode];
    const response = await context.sendRequest(request);
    if (!statuses.some((statusCode) => statusCode === response.status)) {
        const responseBody = response.bodyAsText;
        let details;
        if (isDefined(responseBody)) {
            try {
                details = await parseXMLError(responseBody);
            }
            catch (err) {
                // eslint-disable no-empty
            }
        }
        let errorMessage;
        if (isDefined(details)) {
            errorMessage = `operations failed with: ${details}`;
        }
        else {
            errorMessage = `operation failed with status ${response.status}`;
        }
        throw new coreRestPipeline.RestError(errorMessage, {
            statusCode: response.status,
            response,
        });
    }
    return response;
}

// Copyright (c) Microsoft Corporation.
/**
 * A tracing client to handle spans.
 * @internal
 */
const tracingClient = coreTracing.createTracingClient({
    namespace: "Microsoft.NotificationHubs",
    packageName: "@azure/notification-hubs",
    packageVersion: "1.0.0",
});

// Copyright (c) Microsoft Corporation.
/**
 * Cancels the scheduled notification with the given notification ID.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param notificationId - The notification ID from the scheduled notification.
 * @param options - The operation options.
 * @returns A notification hub response with correlation ID and tracking ID.
 */
function cancelScheduledNotification(context, notificationId, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-cancelScheduledNotification", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/schedulednotifications/${notificationId}`;
        const headers = context.createHeaders();
        const request = createRequest(endpoint, "DELETE", headers, updatedOptions);
        const response = await sendRequest(context, request, 200);
        return parseNotificationSendResponse(response);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Creates or overwrites an installation to a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installation - The installation to create or overwrite.
 * @param options - Configuration options for the create or update installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function createOrUpdateInstallation(context, installation, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-createOrUpdateInstallation", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installation.installationId}`;
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/json");
        const request = createRequest(endpoint, "PUT", headers, updatedOptions);
        request.body = JSON.stringify(installation);
        const response = await sendRequest(context, request, 200);
        return parseNotificationResponse(response);
    });
}

// Copyright (c) Microsoft Corporation.
const registrationDescriptionParser = {
    /**
     * @internal
     * Creates a registration type from the incoming entry.
     */
    async parseRegistrationEntry(bodyText) {
        const xml = await coreXml.parseXML(bodyText, { includeRoot: true });
        const keyName = Object.keys(xml.entry.content)[0];
        const content = xml.entry.content[keyName];
        const methodName = `create${keyName}`;
        const method = this[methodName];
        if (!methodName) {
            throw new coreRestPipeline.RestError(`${keyName} is not a supported registration type`, { statusCode: 500 });
        }
        return method.call(this, content);
    },
    /**
     * @internal
     * Creates a list of registrations from an incoming ATOM XML Feed.
     */
    async parseRegistrationFeed(bodyText) {
        const xml = await coreXml.parseXML(bodyText, { includeRoot: true });
        const results = [];
        for (const entry of xml.feed.entry) {
            delete entry.content["$"];
            const keyName = Object.keys(entry.content)[0];
            const methodName = `create${keyName}`;
            const content = entry.content[keyName];
            const method = this[methodName];
            if (!methodName) {
                throw new coreRestPipeline.RestError(`${keyName} is not a supported registration type`, { statusCode: 500 });
            }
            results.push(method.call(this, content));
        }
        return results;
    },
    /**
     * @internal
     * Creates an ADM registration description from incoming XML property bag.
     */
    createAdmRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ admRegistrationId: getString(rawRegistrationDescription["AdmRegistrationId"], "admRegistrationId") }, createRegistrationDescription(rawRegistrationDescription)), { type: "Adm" });
    },
    /**
     * @internal
     * Creates an ADM template registration description from incoming XML property bag.
     */
    createAdmTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createAdmRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { type: "AdmTemplate" });
    },
    /**
     * @internal
     * Creates an Apple registration description from incoming XML property bag.
     */
    createAppleRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ deviceToken: getString(rawRegistrationDescription["DeviceToken"], "deviceToken") }, createRegistrationDescription(rawRegistrationDescription)), { type: "Apple" });
    },
    /**
     * @internal
     * Creates an Apple template registration description from incoming XML property bag.
     */
    createAppleTemplateRegistrationDescription(rawRegistrationDescription) {
        var _a;
        return Object.assign(Object.assign(Object.assign({ priority: getStringOrUndefined(rawRegistrationDescription["Priority"]), apnsHeaders: getHeadersOrUndefined((_a = rawRegistrationDescription["ApnsHeaders"]) === null || _a === void 0 ? void 0 : _a["ApnsHeader"]) }, this.createAppleRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { type: "AppleTemplate" });
    },
    /**
     * @internal
     * Creates a Baidu registration description from incoming XML property bag.
     */
    createBaiduRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ baiduChannelId: getString(rawRegistrationDescription["BaiduChannelId"], "baiduChannelId"), baiduUserId: getString(rawRegistrationDescription["BaiduUserId"], "baiduUserId") }, createRegistrationDescription(rawRegistrationDescription)), { type: "Baidu" });
    },
    /**
     * @internal
     * Creates a Baidu template registration description from incoming XML property bag.
     */
    createBaiduTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createBaiduRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { type: "BaiduTemplate" });
    },
    /**
     * @internal
     * Creates a Browser registration description from incoming XML property bag.
     */
    createBrowserRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ endpoint: getString(rawRegistrationDescription["Endpoint"], "endpoint"), p256dh: getString(rawRegistrationDescription["P256DH"], "p256dh"), auth: getString(rawRegistrationDescription["Auth"], "auth") }, createRegistrationDescription(rawRegistrationDescription)), { type: "Browser" });
    },
    /**
     * @internal
     * Creates a Browser template registration description from incoming XML property bag.
     */
    createBrowserTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createBrowserRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { type: "BrowserTemplate" });
    },
    /**
     * @internal
     * Creates an GCM registration description from incoming XML property bag.
     */
    createGcmRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ gcmRegistrationId: getString(rawRegistrationDescription["GcmRegistrationId"], "gcmRegistrationId") }, createRegistrationDescription(rawRegistrationDescription)), { type: "Gcm" });
    },
    /**
     * @internal
     * Creates an FCM template registration description from incoming XML property bag.
     */
    createGcmTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createGcmRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { type: "GcmTemplate" });
    },
    /**
     * @internal
     * Creates an FCM registration description from incoming XML property bag.
     */
    createFcmRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ fcmRegistrationId: getString(rawRegistrationDescription["FcmRegistrationId"], "fcmRegistrationId") }, createRegistrationDescription(rawRegistrationDescription)), { type: "Fcm" });
    },
    /**
     * @internal
     * Creates an FCM template registration description from incoming XML property bag.
     */
    createFcmTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createFcmRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { type: "FcmTemplate" });
    },
    /**
     * @internal
     * Creates a Windows Phone registration description from incoming XML property bag.
     */
    createMpnsRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ channelUri: getString(rawRegistrationDescription["ChannelUri"], "channelUri") }, createRegistrationDescription(rawRegistrationDescription)), { type: "Mpns" });
    },
    /**
     * @internal
     * Creates a Windows Phone template registration description from incoming XML property bag.
     */
    createMpnsTemplateRegistrationDescription(rawRegistrationDescription) {
        var _a;
        return Object.assign(Object.assign(Object.assign({ mpnsHeaders: getHeadersOrUndefined((_a = rawRegistrationDescription["MpnsHeaders"]) === null || _a === void 0 ? void 0 : _a["MpnsHeader"]) }, this.createWindowsRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { type: "MpnsTemplate" });
    },
    /**
     * @internal
     * Creates a Windows registration description from incoming XML property bag.
     */
    createWindowsRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ channelUri: getString(rawRegistrationDescription["ChannelUri"], "channelUri") }, createRegistrationDescription(rawRegistrationDescription)), { type: "Windows" });
    },
    /**
     * @internal
     * Creates a Windows template registration description from incoming XML property bag.
     */
    createWindowsTemplateRegistrationDescription(rawRegistrationDescription) {
        var _a;
        return Object.assign(Object.assign(Object.assign({ wnsHeaders: getHeadersOrUndefined((_a = rawRegistrationDescription["WnsHeaders"]) === null || _a === void 0 ? void 0 : _a["WnsHeader"]) }, this.createWindowsRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { type: "WindowsTemplate" });
    },
};
function getHeadersOrUndefined(value) {
    if (!isDefined(value)) {
        return undefined;
    }
    const headerObj = {};
    for (const { Header, Value } of value) {
        headerObj[Header] = Value;
    }
    return headerObj;
}
function createRegistrationDescription(rawRegistrationDescription) {
    let pushVariables;
    const unparsed = getStringOrUndefined(rawRegistrationDescription["PushVariables"]);
    if (unparsed) {
        pushVariables = JSON.parse(unparsed);
    }
    return {
        registrationId: getStringOrUndefined(rawRegistrationDescription["RegistrationId"]),
        expirationTime: getDateOrUndefined(rawRegistrationDescription["ExpirationTime"]),
        etag: getStringOrUndefined(rawRegistrationDescription["ETag"]),
        tags: getTagsOrUndefined(rawRegistrationDescription["Tags"]),
        pushVariables: pushVariables,
    };
}
function createTemplateRegistrationDescription(rawRegistrationDescription) {
    return Object.assign({ bodyTemplate: getString(rawRegistrationDescription["BodyTemplate"], "bodyTemplate"), templateName: getStringOrUndefined(rawRegistrationDescription["TemplateName"]) }, createRegistrationDescription(rawRegistrationDescription));
}
/**
 * Represents a RegistrationDescription serializer.
 */
const registrationDescriptionSerializer = {
    serializeRegistrationDescription(description) {
        const rootName = `${description.type}RegistrationDescription`;
        const methodName = `serialize${rootName}`;
        const method = this[methodName].bind(this);
        if (!isDefined(method)) {
            throw new coreRestPipeline.RestError(`Undefined platform ${description.type}`, { statusCode: 400 });
        }
        const registration = method(description);
        const requestObject = serializeToAtomXmlRequest(rootName, registration);
        return coreXml.stringifyXML(requestObject, { rootName: "entry" });
    },
    /**
     * @internal
     * Serializes an existing ADM registration description to an object for serialization.
     */
    serializeAdmRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { AdmRegistrationId: getString(description.admRegistrationId, "admRegistrationId") });
    },
    /**
     * @internal
     * Serializes an existing ADM template registration description to an object for serialization.
     */
    serializeAdmTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeAdmRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * Serializes an existing Apple registration description to an object for serialization.
     */
    serializeAppleRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { DeviceToken: getString(description.deviceToken, "deviceToken") });
    },
    /**
     * @internal
     * Serializes an existing Apple template registration description to an object for serialization.
     */
    serializeAppleTemplateRegistrationDescription(description) {
        let apnsHeaders;
        if (description.apnsHeaders) {
            apnsHeaders = {
                ApnsHeader: [],
            };
            for (const header of Object.keys(description.apnsHeaders)) {
                apnsHeaders["ApnsHeader"].push({
                    Header: header,
                    Value: description.apnsHeaders[header],
                });
            }
        }
        return Object.assign(Object.assign(Object.assign({}, this.serializeAppleRegistrationDescription(description)), serializeTemplateRegistrationDescription(description)), { Expiry: getStringOrUndefined(description.expiry), ApnsHeaders: apnsHeaders });
    },
    /**
     * @internal
     * Serializes an existing Baidu registration description to an object for serialization.
     */
    serializeBaiduRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { BaiduChannelId: getString(description.baiduChannelId, "baiduChannelId"), BaiduUserId: getString(description.baiduUserId, "baiduUserId") });
    },
    /**
     * @internal
     * Serializes an existing Baidu template registration description to an object for serialization.
     */
    serializeBaiduTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeBaiduRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * Serializes an existing Browser registration description to an object for serialization.
     */
    serializeBrowserRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { Endpoint: description.endpoint, Auth: description.auth, P256DH: description.p256dh });
    },
    /**
     * @internal
     * Serializes an existing Browser template registration description to an object for serialization.
     */
    serializeBrowserTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeBrowserRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * @deprecated Should use FCM registrations instead of GCM.
     * Serializes an existing GCM registration description to an object for serialization.
     */
    serializeGcmRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { GcmRegistrationId: getString(description.gcmRegistrationId, "gcmRegistrationId") });
    },
    /**
     * @internal
     * @deprecated Should use FCM template registrations instead of GCM.
     * Serializes an existing GCM template registration description to an object for serialization.
     */
    serializeGcmTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeGcmRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * Serializes an existing FCM registration description to an object for serialization.
     */
    serializeFcmRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { FcmRegistrationId: description.fcmRegistrationId });
    },
    /**
     * @internal
     * Serializes an existing FCM template registration description to an object for serialization.
     */
    serializeFcmTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeFcmRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * @deprecated Windows Phone is no longer supported.
     * Serializes an existing MPNS registration description to an object for serialization.
     */
    serializeMpnsRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { ChannelUri: description.channelUri });
    },
    /**
     * @internal
     * @deprecated Windows Phone is no longer supported.
     * Serializes an existing MPNS template registration description to an object for serialization.
     */
    serializeMpnsTemplateRegistrationDescription(description) {
        let mpnsHeaders;
        if (description.mpnsHeaders) {
            mpnsHeaders = {
                MpnsHeader: [],
            };
            for (const header of Object.keys(description.mpnsHeaders)) {
                mpnsHeaders["MpnsHeader"].push({
                    Header: header,
                    Value: description.mpnsHeaders[header],
                });
            }
        }
        return Object.assign(Object.assign(Object.assign({}, this.serializeMpnsRegistrationDescription(description)), serializeTemplateRegistrationDescription(description)), { MpnsHeaders: mpnsHeaders });
    },
    /**
     * @internal
     * Serializes an existing Windows registration description to an object for serialization.
     */
    serializeWindowsRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { ChannelUri: description.channelUri });
    },
    /**
     * @internal
     * Serializes an existing Windows template registration description to an object for serialization.
     */
    serializeWindowsTemplateRegistrationDescription(description) {
        let wnsHeaders;
        if (description.wnsHeaders) {
            wnsHeaders = {
                WnsHeader: [],
            };
            for (const header of Object.keys(description.wnsHeaders)) {
                wnsHeaders["WnsHeader"].push({
                    Header: header,
                    Value: description.wnsHeaders[header],
                });
            }
        }
        return Object.assign(Object.assign(Object.assign({}, this.serializeWindowsRegistrationDescription(description)), serializeTemplateRegistrationDescription(description)), { WnsHeaders: wnsHeaders });
    },
};
function serializeRegistrationDescription(description) {
    let tags;
    if (description.tags) {
        tags = description.tags.join(",");
    }
    let pushVariables;
    if (description.pushVariables) {
        pushVariables = JSON.stringify(description.pushVariables);
    }
    return {
        RegistrationId: getStringOrUndefined(description.registrationId),
        Tags: tags,
        PushVariables: pushVariables,
    };
}
function serializeTemplateRegistrationDescription(description) {
    return {
        BodyTemplate: { __cdata: description.bodyTemplate },
        TemplateName: getStringOrUndefined(description.templateName),
    };
}

// Copyright (c) Microsoft Corporation.
/**
 * @internal
 */
async function createOrUpdateRegistrationDescription(context, registration, operationName, options) {
    const endpoint = context.requestUrl();
    endpoint.pathname += "/registrations";
    let httpMethod = "POST";
    if (operationName === "createOrUpdate" || operationName === "update") {
        endpoint.pathname += `/${registration.registrationId}`;
        httpMethod = "PUT";
    }
    const etag = registration.etag;
    // Clear out readonly properties
    registration.registrationId = undefined;
    registration.etag = undefined;
    const headers = context.createHeaders();
    headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
    if (operationName === "update") {
        headers.set("If-Match", isDefined(etag) ? `"${etag}"` : "*");
    }
    const request = createRequest(endpoint, httpMethod, headers, options);
    request.body = registrationDescriptionSerializer.serializeRegistrationDescription(registration);
    const response = await sendRequest(context, request, [200, 201]);
    return registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText);
}

// Copyright (c) Microsoft Corporation.
/**
 * Creates or updates a registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create or update.
 * @param options - The operation options.
 * @returns The created or updated registration description.
 */
function createOrUpdateRegistration(context, registration, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-createOrUpdateRegistration", options, async (updatedOptions) => {
        return createOrUpdateRegistrationDescription(context, registration, "createOrUpdate", updatedOptions);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Creates a new registration ID.
 * @param context - The Notification Hubs client.
 * @param options - The options for creating a new registration ID.
 * @returns The newly created registration ID.
 */
function createRegistrationId(context, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-createRegistrationId", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/registrationIDs";
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");
        const request = createRequest(endpoint, "POST", headers, updatedOptions);
        const response = await sendRequest(context, request, 201);
        // In the form: https://{namespace}.servicebus.windows.net/{NotificationHub}/registrations/<registrationId>
        const locationHeader = response.headers.get("Location");
        const locationUrl = new URL(locationHeader);
        const registrationId = locationUrl.pathname.split("/")[3];
        return registrationId;
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Creates a new registration. This method generates a registration ID,
 * which you can subsequently use to retrieve, update, and delete this registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create.
 * @param options - Options for creating a new registration.
 * @returns The newly created registration description.
 */
function createRegistration(context, registration, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-createRegistration", options, async (updatedOptions) => {
        if (registration.registrationId) {
            throw new coreRestPipeline.RestError("registrationId must not be set during a create operation", {
                statusCode: 400,
            });
        }
        return createOrUpdateRegistrationDescription(context, registration, "create", updatedOptions);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Deletes an installation from a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installationId - The installation ID of the installation to delete.
 * @param options - Configuration options for the installation delete operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function deleteInstallation(context, installationId, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-deleteInstallation", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = context.createHeaders();
        const request = createRequest(endpoint, "DELETE", headers, updatedOptions);
        const response = await sendRequest(context, request, 204);
        return parseNotificationResponse(response);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
 * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
 * @param context - The Notification Hubs client.
 * @param options - The options for getting the push notification feedback container URL.
 * @returns The URL of the Azure Storage Container containing the feedback data.
 */
function getFeedbackContainerUrl(context, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-getFeedbackContainerUrl", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/feedbackcontainer";
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");
        const request = createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await sendRequest(context, request, 200);
        return response.bodyAsText;
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Gets an Azure Notification Hub installation by the installation ID.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to get.
 * @param options - Configuration options for the get installation operation.
 * @returns The installation that matches the installation ID.
 */
function getInstallation(context, installationId, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-getInstallation", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/json");
        const request = createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await sendRequest(context, request, 200);
        return JSON.parse(response.bodyAsText);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * @internal
 * Serializes a NotificationHubJob into an Atom XML entry.
 * @param entry - The NotificationHubJob to turn into an Atom XML entry.
 * @returns An Atom XML entry containing the notification hub job.
 */
function serializeNotificationHubJobEntry(entry) {
    const job = {
        Type: entry.type,
        OutputContainerUri: { __cdata: entry.outputContainerUrl },
        ImportFileUri: isDefined(entry.importFileUrl) ? { __cdata: entry.importFileUrl } : undefined,
    };
    const requestObject = serializeToAtomXmlRequest("NotificationHubJob", job);
    return coreXml.stringifyXML(requestObject, { rootName: "entry", cdataPropName: "__cdata" });
}
/**
 * Parses an Atom XML of an notification hub job entry.
 * @param bodyText - The incoming Atom XML entry to parse into a notification hub job.
 * @returns A parsed NotificationHubJob.
 */
async function parseNotificationHubJobEntry(bodyText) {
    const xml = await coreXml.parseXML(bodyText, { includeRoot: true });
    const content = xml.entry.content.NotificationHubJob;
    return createNotificationHubJob(content);
}
/**
 * Parses an Atom XML feed of notification hub jobs.
 * @param bodyText - The incoming Atom XML feed to parse into notification hub jobs.
 * @returns A list of notification hub jobs.
 */
async function parseNotificationHubJobFeed(bodyText) {
    const xml = await coreXml.parseXML(bodyText, { includeRoot: true });
    const results = [];
    for (const item of xml.feed.entry) {
        results.push(createNotificationHubJob(item.content.NotificationHubJob));
    }
    return results;
}
function createInputOutputProperties(content) {
    const props = {};
    for (const item of content["d3p1:KeyValueOfstringstring"]) {
        props[item["d3p1:Key"]] = item["d3p1:Value"];
    }
    return props;
}
function createNotificationHubJob(content) {
    let outputProperties;
    if (isDefined(content["OutputProperties"])) {
        outputProperties = createInputOutputProperties(content["OutputProperties"]);
    }
    let inputProperties;
    if (isDefined(content["InputProperties"])) {
        inputProperties = createInputOutputProperties(content["InputProperties"]);
    }
    return {
        jobId: getStringOrUndefined(content["JobId"]),
        type: getString(content["Type"], "type"),
        status: getStringOrUndefined(content["Status"]),
        progress: getFloatOrUndefined(content["Progress"]),
        outputContainerUrl: getString(content["OutputContainerUri"], "outputContainerUrl"),
        importFileUrl: getStringOrUndefined(content["ImportFileUri"]),
        failure: getStringOrUndefined(content["Failure"]),
        createdAt: getDateOrUndefined(content["CreatedAt"]),
        updatedAt: getDateOrUndefined(content["UpdatedAt"]),
        inputProperties,
        outputProperties,
    };
}

// Copyright (c) Microsoft Corporation.
/**
 * Gets a Notification Hub Job by the ID.
 * @param context - The Notification Hubs client.
 * @param jobId - The Notification Hub Job ID.
 * @param options - The operation options.
 * @returns The Notification Hub Job with the matching ID.
 */
function getNotificationHubJob(context, jobId, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-getNotificationHubJob", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/jobs/${jobId}`;
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        const request = createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await sendRequest(context, request, 200);
        return parseNotificationHubJobEntry(response.bodyAsText);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * @internal
 * Parses a NotificationDetails from incoming XML.
 */
async function parseNotificationDetails(bodyText) {
    const xml = await coreXml.parseXML(bodyText, {
        includeRoot: true,
        stopNodes: ["NotificationDetails.NotificationBody"],
    });
    const notificationDetails = xml["NotificationDetails"];
    let apnsOutcomeCounts;
    if (isDefined(notificationDetails["ApnsOutcomeCounts"])) {
        apnsOutcomeCounts = parseOutcomeCounts(notificationDetails["ApnsOutcomeCounts"]["Outcome"]);
    }
    let admOutcomeCounts;
    if (isDefined(notificationDetails["AdmOutcomeCounts"])) {
        admOutcomeCounts = parseOutcomeCounts(notificationDetails["AdmOutcomeCounts"]["Outcome"]);
    }
    let baiduOutcomeCounts;
    if (isDefined(notificationDetails["BaiduOutcomeCounts"])) {
        baiduOutcomeCounts = parseOutcomeCounts(notificationDetails["BaiduOutcomeCounts"]["Outcome"]);
    }
    let fcmOutcomeCounts;
    if (isDefined(notificationDetails["GcmOutcomeCounts"])) {
        fcmOutcomeCounts = parseOutcomeCounts(notificationDetails["GcmOutcomeCounts"]["Outcome"]);
    }
    let wnsOutcomeCounts;
    if (isDefined(notificationDetails["WnsOutcomeCounts"])) {
        wnsOutcomeCounts = parseOutcomeCounts(notificationDetails["WnsOutcomeCounts"]["Outcome"]);
    }
    return {
        notificationId: getStringOrUndefined(notificationDetails["NotificationId"]),
        location: getStringOrUndefined(notificationDetails["Location"]),
        state: getStringOrUndefined(notificationDetails["State"]),
        enqueueTime: getDateOrUndefined(notificationDetails["EnqueueTime"]),
        startTime: getDateOrUndefined(notificationDetails["StartTime"]),
        endTime: getDateOrUndefined(notificationDetails["EndTime"]),
        pnsErrorDetailsUrl: getStringOrUndefined(notificationDetails["PnsErrorDetailsUri"]),
        targetPlatforms: getStringOrUndefined(notificationDetails["TargetPlatforms"]),
        apnsOutcomeCounts,
        admOutcomeCounts,
        baiduOutcomeCounts,
        fcmOutcomeCounts,
        wnsOutcomeCounts,
    };
}
function parseOutcomeCounts(counts) {
    const results = [];
    for (const item of counts) {
        results.push({ state: item["Name"], count: getInteger(item["Count"], "Count") });
    }
    return results;
}

// Copyright (c) Microsoft Corporation.
/**
 * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
 * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
 * @param context - The Notification Hubs client.
 * @param notificationId - The notification ID returned from the send operation.
 * @param options - The operation options.
 * @returns The results of the send operation.
 */
function getNotificationOutcomeDetails(context, notificationId, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-getNotificationOutcomeDetails", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/messages/${notificationId}`;
        const headers = context.createHeaders();
        const request = createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await sendRequest(context, request, 200);
        return parseNotificationDetails(response.bodyAsText);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Gets a registration by the given registration ID.
 * @param context - The Notification Hubs client.
 * @param registrationId - The ID of the registration to get.
 * @param options - The options for getting a registration by ID.
 * @returns A RegistrationDescription that has the given registration ID.
 */
function getRegistration(context, registrationId, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-getRegistration", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/registrations/${registrationId}`;
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");
        const request = createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await sendRequest(context, request, 200);
        return registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Gets all Notification Hub Jobs for this Notification Hub.
 * @param context - The Notification Hubs client.xs
 * @param options - The operation options.
 * @returns An array of all Notification Hub Jobs for this Notification Hub.
 */
function listNotificationHubJobs(context, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-getNotificationHubJobs", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/jobs";
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        const request = createRequest(endpoint, "GET", headers, updatedOptions);
        const response = await sendRequest(context, request, 200);
        return parseNotificationHubJobFeed(response.bodyAsText);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Lists all registrations with the matching tag.
 * @param context - The Notification Hubs client.
 * @param tag - The tag to query for matching registrations.
 * @param options - The query options such as $top.
 * @returns A paged async iterable containing the matching registrations for the notification hub.
 */
function listRegistrationsByTag(context, tag, options = {}) {
    const { span, updatedOptions } = tracingClient.startSpan("NotificationHubsClientContext-listRegistrationsByTag", options);
    try {
        const iter = listRegistrationsByTagAll(context, tag, updatedOptions);
        return {
            next() {
                return iter.next();
            },
            [Symbol.asyncIterator]() {
                return this;
            },
            byPage: () => {
                return listRegistrationsByTagPagingPage(context, tag, options);
            },
        };
    }
    catch (e) {
        span.setStatus({ status: "error", error: e });
        throw e;
    }
    finally {
        span.end();
    }
}
function listRegistrationsByTagAll(context, tag, options) {
    return tslib.__asyncGenerator(this, arguments, function* listRegistrationsByTagAll_1() {
        var e_1, _a;
        try {
            for (var _b = tslib.__asyncValues(listRegistrationsByTagPagingPage(context, tag, options)), _c; _c = yield tslib.__await(_b.next()), !_c.done;) {
                const page = _c.value;
                yield tslib.__await(yield* tslib.__asyncDelegator(tslib.__asyncValues(page)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield tslib.__await(_a.call(_b));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function listRegistrationsByTagPagingPage(context, tag, options) {
    return tslib.__asyncGenerator(this, arguments, function* listRegistrationsByTagPagingPage_1() {
        let result = yield tslib.__await(_listRegistrationsByTag(context, tag, options));
        yield yield tslib.__await(result.registrations || []);
        let continuationToken = result.continuationToken;
        while (continuationToken) {
            result = yield tslib.__await(_listRegistrationsByTag(context, tag, options, continuationToken));
            continuationToken = result.continuationToken;
            yield yield tslib.__await(result.registrations || []);
        }
    });
}
async function _listRegistrationsByTag(context, tag, options, continuationToken) {
    const endpoint = context.requestUrl();
    endpoint.pathname += `/tags/${tag}/registrations`;
    if (options.top !== undefined) {
        endpoint.searchParams.set("$top", `${options.top}`);
    }
    if (continuationToken !== undefined) {
        endpoint.searchParams.set("continuationtoken", continuationToken);
    }
    const headers = context.createHeaders();
    const request = createRequest(endpoint, "GET", headers, options);
    const response = await sendRequest(context, request, 200);
    const registrations = await registrationDescriptionParser.parseRegistrationFeed(response.bodyAsText);
    const nextToken = response.headers.get("x-ms-continuationtoken");
    return {
        registrations,
        continuationToken: nextToken,
    };
}

// Copyright (c) Microsoft Corporation.
/**
 * Gets all registrations for the notification hub with the given query options.
 * @param context - The Notification Hubs client.
 * @param options - The options for querying the registrations such as $top and $filter.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
function listRegistrations(context, options = {}) {
    const { span, updatedOptions } = tracingClient.startSpan("NotificationHubsClientContext-listRegistrations", options);
    try {
        const iter = listRegistrationsAll(context, updatedOptions);
        return {
            next() {
                return iter.next();
            },
            [Symbol.asyncIterator]() {
                return this;
            },
            byPage: () => {
                return listRegistrationPagingPage(context, options);
            },
        };
    }
    catch (e) {
        span.setStatus({ status: "error", error: e });
        throw e;
    }
    finally {
        span.end();
    }
}
function listRegistrationsAll(context, options) {
    return tslib.__asyncGenerator(this, arguments, function* listRegistrationsAll_1() {
        var e_1, _a;
        try {
            for (var _b = tslib.__asyncValues(listRegistrationPagingPage(context, options)), _c; _c = yield tslib.__await(_b.next()), !_c.done;) {
                const page = _c.value;
                yield tslib.__await(yield* tslib.__asyncDelegator(tslib.__asyncValues(page)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield tslib.__await(_a.call(_b));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function listRegistrationPagingPage(context, options) {
    return tslib.__asyncGenerator(this, arguments, function* listRegistrationPagingPage_1() {
        let result = yield tslib.__await(_listRegistrations(context, options));
        yield yield tslib.__await(result.registrations || []);
        let continuationToken = result.continuationToken;
        while (continuationToken) {
            result = yield tslib.__await(_listRegistrations(context, options, continuationToken));
            continuationToken = result.continuationToken;
            yield yield tslib.__await(result.registrations || []);
        }
    });
}
async function _listRegistrations(context, options, continuationToken) {
    const endpoint = context.requestUrl();
    endpoint.pathname += "/registrations";
    if (options.top !== undefined) {
        endpoint.searchParams.set("$top", `${options.top}`);
    }
    if (options.filter !== undefined) {
        endpoint.searchParams.set("$filter", options.filter);
    }
    if (continuationToken !== undefined) {
        endpoint.searchParams.set("continuationtoken", continuationToken);
    }
    const headers = context.createHeaders();
    const request = createRequest(endpoint, "GET", headers, options);
    const response = await sendRequest(context, request, 200);
    const registrations = await registrationDescriptionParser.parseRegistrationFeed(response.bodyAsText);
    const nextToken = response.headers.get("x-ms-continuationtoken");
    return {
        registrations,
        continuationToken: nextToken,
    };
}

// Copyright (c) Microsoft Corporation.
/**
 * @internal
 */
function scheduleNotificationPayload(context, scheduledTime, tags, notification, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-$scheduleNotification", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/schedulednotifications/";
        const headers = context.createHeaders();
        if (notification.headers) {
            for (const headerName of Object.keys(notification.headers)) {
                headers.set(headerName, notification.headers[headerName]);
            }
        }
        headers.set("ServiceBusNotification-ScheduleTime", scheduledTime.toISOString());
        headers.set("Content-Type", notification.contentType);
        headers.set("ServiceBusNotification-Format", notification.platform);
        if (tags) {
            let tagExpression = null;
            if (Array.isArray(tags)) {
                tagExpression = tags.join("||");
            }
            else {
                tagExpression = tags;
            }
            headers.set("ServiceBusNotification-Tags", tagExpression);
        }
        const request = createRequest(endpoint, "POST", headers, updatedOptions);
        request.body = notification.body;
        const response = await sendRequest(context, request, 201);
        return parseNotificationSendResponse(response);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Schedules a push notification to all devices registered on the Notification Hub.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function scheduleBroadcastNotification(context, scheduledTime, notification, options = {}) {
    return scheduleNotificationPayload(context, scheduledTime, undefined, notification, options);
}

// Copyright (c) Microsoft Corporation.
/**
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function scheduleNotification(context, scheduledTime, tags, notification, options = {}) {
    return scheduleNotificationPayload(context, scheduledTime, tags, notification, options);
}

// Copyright (c) Microsoft Corporation.
/**
 * @internal
 */
function sendNotificationPayload(context, notification, method, pushHandle, tags, options = {}) {
    return tracingClient.withSpan(`NotificationHubsClientContext-${method}`, options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/messages/";
        if (options.enableTestSend) {
            endpoint.searchParams.append("debug", "true");
        }
        const headers = context.createHeaders();
        if (notification.headers) {
            for (const headerName of Object.keys(notification.headers)) {
                headers.set(headerName, notification.headers[headerName]);
            }
        }
        if (pushHandle) {
            endpoint.searchParams.append("direct", "true");
            if (notification.platform === "browser") {
                const browserHandle = pushHandle;
                headers.set("ServiceBusNotification-DeviceHandle", browserHandle.endpoint);
                headers.set("Auth", browserHandle.auth);
                headers.set("P256DH", browserHandle.p256dh);
            }
            else {
                headers.set("ServiceBusNotification-DeviceHandle", pushHandle);
            }
        }
        headers.set("Content-Type", notification.contentType);
        headers.set("ServiceBusNotification-Format", notification.platform);
        if (tags) {
            let tagExpression = null;
            if (Array.isArray(tags)) {
                tagExpression = tags.join("||");
            }
            else {
                tagExpression = tags;
            }
            headers.set("ServiceBusNotification-Tags", tagExpression);
        }
        const request = createRequest(endpoint, "POST", headers, updatedOptions);
        request.body = notification.body;
        const response = await sendRequest(context, request, 201);
        return parseNotificationSendResponse(response);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Sends push notifications to all devices on the Notification Hub.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to all devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function sendBroadcastNotification(context, notification, options = {}) {
    return sendNotificationPayload(context, notification, "sendNotification", undefined, undefined, options);
}

// Copyright (c) Microsoft Corporation.
/**
 * Sends a direct push notification to a device with the given push handle.
 * @param context - The Notification Hubs client.
 * @param pushHandle - The push handle which is the unique identifier for the device.
 * @param notification - The notification to send to the device.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function sendDirectNotification(context, pushHandle, notification, options = {}) {
    return sendNotificationPayload(context, notification, "sendDirectNotification", pushHandle, undefined, options);
}

// Copyright (c) Microsoft Corporation.
/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function sendNotification(context, tags, notification, options = {}) {
    return sendNotificationPayload(context, notification, "sendNotification", undefined, tags, options);
}

// Copyright (c) Microsoft Corporation.
/**
 * Submits a Notification Hub Job.
 * Note: this is available to Standard SKU namespace and above.
 * @param context - The Notification Hubs client.
 * @param job - The notification hub job to submit.
 * @param options - The operation options.
 * @returns The notification hub job details including job ID and status.
 */
function submitNotificationHubJob(context, job, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-submitNotificationHubJob", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += "/jobs";
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
        const request = createRequest(endpoint, "POST", headers, updatedOptions);
        request.body = serializeNotificationHubJobEntry(job);
        const response = await sendRequest(context, request, 201);
        return parseNotificationHubJobEntry(response.bodyAsText);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Updates an installation using the JSON-Patch standard in RFC6902.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to update.
 * @param installationPatches - An array of patches following the JSON-Patch standard.
 * @param options - Configuration options for the patch installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
function updateInstallation(context, installationId, installationPatches, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-updateInstallation", options, async (updatedOptions) => {
        const endpoint = context.requestUrl();
        endpoint.pathname += `/installations/${installationId}`;
        const headers = context.createHeaders();
        headers.set("Content-Type", "application/json");
        const request = createRequest(endpoint, "PATCH", headers, updatedOptions);
        request.body = JSON.stringify(installationPatches);
        const response = await sendRequest(context, request, 200);
        return parseNotificationResponse(response);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * Updates an existing registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to update.
 * @param options - The operation options.
 * @returns The updated registration description.
 */
function updateRegistration(context, registration, options = {}) {
    return tracingClient.withSpan("NotificationHubsClientContext-updateRegistration", options, async (updatedOptions) => {
        if (!registration.etag) {
            throw new coreRestPipeline.RestError("ETag is required for registration update", { statusCode: 400 });
        }
        return createOrUpdateRegistrationDescription(context, registration, "update", updatedOptions);
    });
}

// Copyright (c) Microsoft Corporation.
/**
 * This represents a client for Azure Notification Hubs to manage installations and send
 * messages to devices.
 */
class NotificationHubsServiceClient {
    /**
     * Creates a new instance of the NotificationClient with a connection string, hub name and options.
     * @param connectionString - The Notification Hub Access Policy connection string.
     * @param hubName - The name of the Azure Notification Hub.
     * @param options - Options for configuring the Azure Notification Hubs client.
     */
    constructor(connectionString, hubName, options = {}) {
        this._client = createClientContext(connectionString, hubName, options);
    }
    /**
     * Creates or overwrites an installation to a Notification Hub.
     * @param installation - The installation to create or overwrite.
     * @param options - Configuration options for the create or update installation operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    createOrUpdateInstallation(installation, options = {}) {
        return createOrUpdateInstallation(this._client, installation, options);
    }
    /**
     * Deletes an installation from a Notification Hub.
     * @param installationId - The installation ID of the installation to delete.
     * @param options - Configuration options for the installation delete operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    deleteInstallation(installationId, options = {}) {
        return deleteInstallation(this._client, installationId, options);
    }
    /**
     * Gets an Azure Notification Hub installation by the installation ID.
     * @param installationId - The ID of the installation to get.
     * @param options - Configuration options for the get installation operation.
     * @returns The installation that matches the installation ID.
     */
    getInstallation(installationId, options = {}) {
        return getInstallation(this._client, installationId, options);
    }
    /**
     * Updates an installation using the JSON-Patch standard in RFC6902.
     * @param installationId - The ID of the installation to update.
     * @param patches - An array of patches following the JSON-Patch standard.
     * @param options - Configuration options for the patch installation operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    updateInstallation(installationId, patches, options = {}) {
        return updateInstallation(this._client, installationId, patches, options);
    }
    /**
     * Creates a new registration ID.
     * @param options - The options for creating a new registration ID.
     * @returns The newly created registration ID.
     */
    createRegistrationId(options = {}) {
        return createRegistrationId(this._client, options);
    }
    /**
     * Creates a new registration. This method generates a registration ID,
     * which you can subsequently use to retrieve, update, and delete this registration.
     * @param registration - The registration to create.
     * @param options - Options for creating a new registration.
     * @returns The newly created registration description.
     */
    createRegistration(registration, options = {}) {
        return createRegistration(this._client, registration, options);
    }
    /**
     * Creates or updates a registration.
     * @param registration - The registration to create or update.
     * @param options - The operation options.
     * @returns The created or updated registration description.
     */
    createOrUpdateRegistration(registration, options = {}) {
        return createOrUpdateRegistration(this._client, registration, options);
    }
    /**
     * Updates an existing registration.
     * @param registration - The registration to update.
     * @param options - The operation options.
     * @returns The updated registration description.
     */
    updateRegistration(registration, options = {}) {
        return updateRegistration(this._client, registration, options);
    }
    /**
     * Gets a registration by the given registration ID.
     * @param registrationId - The ID of the registration to get.
     * @param options - The options for getting a registration by ID.
     * @returns A RegistrationDescription that has the given registration ID.
     */
    getRegistration(registrationId, options = {}) {
        return getRegistration(this._client, registrationId, options);
    }
    /**
     * Gets all registrations for the notification hub with the given query options.
     * @param options - The options for querying the registrations such as $top and $filter.
     * @returns A paged async iterable containing all of the registrations for the notification hub.
     */
    listRegistrations(options = {}) {
        return listRegistrations(this._client, options);
    }
    /**
     * Lists all registrations with the matching tag.
     * @param tag - The tag to query for matching registrations.
     * @param options - The query options such as $top.
     * @returns A paged async iterable containing the matching registrations for the notification hub.
     */
    listRegistrationsByTag(tag, options = {}) {
        return listRegistrationsByTag(this._client, tag, options);
    }
    /**
     * Sends a direct push notification to a device with the given push handle.
     * @param pushHandle - The push handle which is the unique identifier for the device.
     * @param notification - The notification to send to the device.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendDirectNotification(pushHandle, notification, options = {}) {
        return sendDirectNotification(this._client, pushHandle, notification, options);
    }
    /**
     * Sends push notifications to devices that match the given tags or tag expression.
     * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
     * @param notification - The notification to send to the matching devices.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendNotification(tags, notification, options = {}) {
        return sendNotification(this._client, tags, notification, options);
    }
    /**
     * Sends push notifications to all devices on the Notification Hub.
     * @param notification - The notification to send to all devices.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendBroadcastNotification(notification, options = {}) {
        return sendBroadcastNotification(this._client, notification, options);
    }
    /**
     * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
     * NOTE: This is only available in Standard SKU Azure Notification Hubs.
     * @param scheduledTime - The Date to send the push notification.
     * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
     * @param notification - The notification to send to the matching devices.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    scheduleNotification(scheduledTime, tags, notification, options = {}) {
        return scheduleNotification(this._client, scheduledTime, tags, notification, options);
    }
    /**
     * Schedules a push notification to all devices registered on the Notification Hub.
     * NOTE: This is only available in Standard SKU Azure Notification Hubs.
     * @param scheduledTime - The Date to send the push notification.
     * @param notification - The notification to send to the matching devices.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    scheduleBroadcastNotification(scheduledTime, notification, options = {}) {
        return scheduleBroadcastNotification(this._client, scheduledTime, notification, options);
    }
    /**
     * Cancels the scheduled notification with the given notification ID.
     * @param notificationId - The notification ID from the scheduled notification.
     * @param options - The operation options.
     * @returns A notification hub response with correlation ID and tracking ID.
     */
    cancelScheduledNotification(notificationId, options = {}) {
        return cancelScheduledNotification(this._client, notificationId, options);
    }
    /**
     * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
     * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
     * @param options - The options for getting the push notification feedback container URL.
     * @returns The URL of the Azure Storage Container containing the feedback data.
     */
    getFeedbackContainerUrl(options = {}) {
        return getFeedbackContainerUrl(this._client, options);
    }
    /**
     * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
     * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
     * @param notificationId - The notification ID returned from the send operation.
     * @param options - The operation options.
     * @returns The results of the send operation.
     */
    getNotificationOutcomeDetails(notificationId, options = {}) {
        return getNotificationOutcomeDetails(this._client, notificationId, options);
    }
    /**
     * Gets a Notification Hub Job by the ID.
     * @param jobId - The Notification Hub Job ID.
     * @param options - The operation options.
     * @returns The Notification Hub Job with the matching ID.
     */
    getNotificationHubJob(jobId, options = {}) {
        return getNotificationHubJob(this._client, jobId, options);
    }
    /**
     * Submits a Notification Hub Job.  Note this is available to Standard SKU namespace and above.
     * @param job - The notification hub job to submit.
     * @param options - The operation options.
     * @returns The notification hub job details including job ID and status.
     */
    submitNotificationHubJob(job, options = {}) {
        return submitNotificationHubJob(this._client, job, options);
    }
    /**
     * Gets all Notification Hub Jobs for this Notification Hub.
     * @param options - The operation options.
     * @returns An array of all Notification Hub Jobs for this Notification Hub.
     */
    listNotificationHubJobs(options = {}) {
        return listNotificationHubJobs(this._client, options);
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Creates an Apple based installation.
 * @param installation - A partial installation used to create the Apple installation.
 * @returns The newly created Apple installation.
 */
function createAppleInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "apns" });
}
/**
 * Creates an Amazon Device Messaging (ADM) based installation.
 * @param installation - A partial installation used to create the ADM installation.
 * @returns The newly created ADM installation.
 */
function createAdmInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "adm" });
}
/**
 * Creates a Baidu based installation.
 * @param installation - A partial installation used to create the Baidu installation.
 * @returns The newly created Baidu installation.
 */
function createBaiduInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "baidu" });
}
/**
 * Creates a Firebase legacy HTTP based installation.
 * @param installation - A partial installation used to create the Firebase Legacy HTTP installation.
 * @returns The newly created Baidu installation.
 */
function createFirebaseLegacyInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "gcm" });
}
/**
 * Creates a Windows Notification Services (WNS) based installation.
 * @param installation - A partial installation used to create the WNS installation.
 * @returns The newly created WNS installation.
 */
function createWindowsInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "wns" });
}
/**
 * Creates a Web Push based installation.
 * @param installation - A partial installation used to create the Web Push installation.
 * @returns The newly created Web Push installation.
 */
function createBrowserInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "browser" });
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const JSON_CONTENT_TYPE = "application/json;charset=utf-8";
const XML_CONTENT_TYPE = "application/xml";
const STREAM_CONTENT_TYPE = "application/octet-stream";
const WNS_TYPE_NAME = "X-WNS-Type";
const WNS_RAW = "wns/raw";
const WNS_BADGE = "wns/badge";
const WNS_TITLE = "wns/tile";
const WNS_TOAST = "wns/toast";

// Copyright (c) Microsoft Corporation.
/**
 * Creates a notification to send to an Apple device.
 * @param notification - A partial message used to create a message for Apple.
 * @returns A newly created Apple.
 */
function createAppleNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "apple", contentType: JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to an Amazon Device Messaging device.
 * @param notification - A partial message used to create a message for Amazon Device Messaging.
 * @returns A newly created Amazon Device Messaging.
 */
function createAdmNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "adm", contentType: JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to a Baidu registered device.
 * @param notification - A partial message used to create a message for Baidu.
 * @returns A newly created Baidu.
 */
function createBaiduNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "baidu", contentType: JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to a browser.
 * @param notification - A partial message used to create a message for a browser.
 * @returns A newly created Web Push browser.
 */
function createBrowserNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "browser", contentType: JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
function createFirebaseLegacyNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "gcm", contentType: JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
function createTemplateNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "template", contentType: JSON_CONTENT_TYPE });
}
/**
 * Creates a badge message to send to WNS.
 * @param notification - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge.
 */
function createWindowsBadgeNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "wns", contentType: XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    result.headers[WNS_TYPE_NAME] = WNS_BADGE;
    return result;
}
/**
 * Creates a tile message to send to WNS.
 * @param notification - A partial message used to create a tile message for WNS.
 * @returns A newly created WNS tile.
 */
function createWindowsTileNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "wns", contentType: XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    result.headers[WNS_TYPE_NAME] = WNS_TITLE;
    return result;
}
/**
 * Creates a toast message to send to WNS.
 * @param notification - A partial message used to create a toast message for WNS.
 * @returns A newly created WNS toast.
 */
function createWindowsToastNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "wns", contentType: XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    result.headers[WNS_TYPE_NAME] = WNS_TOAST;
    return result;
}
/**
 * Creates a notification to send to WNS in wns/raw format..
 * @param notification - A partial message used to create a message for WNS in XML format.
 * @returns A newly created WNS message using XML.
 */
function createWindowsRawNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "wns", contentType: STREAM_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    result.headers[WNS_TYPE_NAME] = WNS_RAW;
    return result;
}

// Copyright (c) Microsoft Corporation.
function createAppleNativeAlert(nativeAlert) {
    if (!isDefined(nativeAlert)) {
        return undefined;
    }
    if (isString(nativeAlert)) {
        return nativeAlert;
    }
    const alert = {
        title: nativeAlert.title,
        subtitle: nativeAlert.subtitle,
        body: nativeAlert.body,
        "launch-image": nativeAlert.launchImage,
        "title-loc-key": nativeAlert.titleLocKey,
        "title-loc-args": nativeAlert.titleLocArgs,
        "subtitle-loc-key": nativeAlert.subtitleLocKey,
        "subtitle-loc-args": nativeAlert.subtitleLocArgs,
        "loc-key": nativeAlert.locKey,
        "loc-args": nativeAlert.locArgs,
    };
    return alert;
}
/**
 * Creates an APNs native message to send to Notification Hubs.
 * @param nativeMessage - The Apple native message properties to set.
 * @param additionalProperties - Additional properties for Apple messages.
 * @returns An AppleNotification to send to Notification Hubs.
 */
function buildAppleNativeMessage(nativeMessage, additionalProperties) {
    const headers = {};
    const message = Object.assign({ aps: {
            alert: createAppleNativeAlert(nativeMessage.alert),
            sound: nativeMessage.sound,
            badge: nativeMessage.badge,
            "thread-id": nativeMessage.threadId,
            category: nativeMessage.category,
            "content-available": nativeMessage.contentAvailable,
            "mutable-content": nativeMessage.mutableContent,
            "target-content-id": nativeMessage.targetContentId,
            "interruption-level": nativeMessage.interruptionLevel,
            "relevance-score": nativeMessage.relevanceScore,
            "filter-criteria": nativeMessage.filterCriteria,
        } }, additionalProperties);
    const apnsPriority = (nativeMessage === null || nativeMessage === void 0 ? void 0 : nativeMessage.contentAvailable) === 1 ? "5" : "10";
    headers["apns-priority"] = apnsPriority;
    return createAppleNotification({
        body: JSON.stringify(message),
        headers: headers,
    });
}
function buildFirebaseLegacyNativePayload(nativeNotification) {
    if (!isDefined(nativeNotification)) {
        return undefined;
    }
    const androidMessage = nativeNotification;
    const appleMessage = nativeNotification;
    const notification = {
        title: nativeNotification.title,
        body: nativeNotification.body,
        click_action: nativeNotification.clickAction,
        // Apple/Android fields
        sound: appleMessage.sound,
        badge: appleMessage.badge,
        subtitle: appleMessage.subtitle,
        body_loc_key: appleMessage.bodyLocKey,
        body_loc_args: appleMessage.bodyLocArgs,
        title_loc_key: appleMessage.bodyLocKey,
        title_loc_args: appleMessage.bodyLocArgs,
        // Android/Web fields
        android_channel_id: androidMessage.androidChannelId,
        icon: androidMessage.icon,
        tag: androidMessage.tag,
        color: androidMessage.color,
    };
    return notification;
}
/**
 * Creates a FirebaseLegacyNotification from a native Firebase payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The FirebaseLegacyNotification to send to Notification Hubs.
 */
function buildFirebaseLegacyNativeMessage(nativeMessage) {
    const jsonMessage = {
        to: nativeMessage.to,
        registration_ids: nativeMessage.registrationIds,
        condition: nativeMessage.condition,
        collapse_key: nativeMessage.collapseKey,
        priority: nativeMessage.priority,
        content_available: nativeMessage.contentAvailable,
        mutable_content: nativeMessage.mutableContent,
        time_to_live: nativeMessage.timeToLive,
        restricted_package_name: nativeMessage.restrictedPackageName,
        dry_run: nativeMessage.dryRun,
        data: nativeMessage.data,
        notification: buildFirebaseLegacyNativePayload(nativeMessage.notification),
    };
    return createFirebaseLegacyNotification({
        body: JSON.stringify(jsonMessage),
    });
}
function buildAdmNativeNotification(nativeNotification) {
    if (!isDefined(nativeNotification)) {
        return undefined;
    }
    return {
        title: nativeNotification.title,
        body: nativeNotification.body,
        icon: nativeNotification.icon,
        color: nativeNotification.color,
        sound: nativeNotification.sound,
        tag: nativeNotification.tag,
        click_action: nativeNotification.clickAction,
        body_loc_key: nativeNotification.bodyLocKey,
        body_loc_args: nativeNotification.bodyLocArgs,
        title_loc_key: nativeNotification.titleLocKey,
        title_loc_args: nativeNotification.titleLocArgs,
        channel_id: nativeNotification.channelId,
        ticker: nativeNotification.ticker,
        sticky: nativeNotification.sticky,
        event_time: nativeNotification.eventTime,
        local_only: nativeNotification.localOnly,
        notification_priority: nativeNotification.notificationPriority,
        default_sound: nativeNotification.defaultSound,
        visibility: nativeNotification.visibility,
        notification_count: nativeNotification.notificationCount,
        image: nativeNotification.image,
    };
}
/**
 * Creates a AdmNotification from a native ADM payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The AdmNotification to send to Notification Hubs.
 */
function buildAdmNativeMessage(nativeMessage) {
    const jsonObj = Object.assign({ notification: buildAdmNativeNotification(nativeMessage.notification), data: nativeMessage.data || {} }, nativeMessage);
    return createAdmNotification({
        body: JSON.stringify(jsonObj),
    });
}
/**
 * Creates a BaiduNotification from a native Baidu payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @param additionalProperties - Additional properties for Apple Baidu messages.
 * @returns The BaiduNotification to send to Notification Hubs.
 */
function buildBaiduNativeMessage(nativeMessage, additionalProperties) {
    const jsonObj = Object.assign({ title: nativeMessage.title, description: nativeMessage.description, notification_builder_id: nativeMessage.notificationBuilderId, notification_basic_style: nativeMessage.notificationBasicStyle, open_type: nativeMessage.openType, net_support: nativeMessage.netSupport, user_confirm: nativeMessage.userConfirm, url: nativeMessage.url, pkg_content: nativeMessage.pkgContent, pkg_version: nativeMessage.pkgVersion, custom_content: nativeMessage.customContent, aps: nativeMessage.aps }, additionalProperties);
    return createBaiduNotification({
        body: JSON.stringify(jsonObj),
    });
}
/**
 * Builds a WindowsNotification from a Windows Badge.
 * @param nativeMessage - The Windows Badge Message to build.
 * @returns A WindowsNotification created with the badge information.
 */
function buildWindowsBadgeNativeMessage(nativeMessage) {
    const badge = {
        $: { value: nativeMessage.value },
    };
    return createWindowsBadgeNotification({
        body: coreXml.stringifyXML(badge, { rootName: "badge" }),
    });
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Creates an ADM registration description.
 * @param description - A partial ADM registration description.
 * @returns A created ADM registration description.
 */
function createAdmRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Adm" });
}
/**
 * Creates an ADM template registration description.
 * @param description - A partial ADM template registration description.
 * @returns A created ADM template registration description.
 */
function createAdmTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "AdmTemplate" });
}
/**
 * Creates an Apple registration description.
 * @param description - A partial Apple registration description.
 * @returns A created Apple registration description.
 */
function createAppleRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Apple" });
}
/**
 * Creates an Apple template registration description.
 * @param description - A partial Apple template registration description.
 * @returns A created Apple template registration description.
 */
function createAppleTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "AppleTemplate" });
}
/**
 * Creates a Baidu registration description.
 * @param description - A partial Baidu registration description.
 * @returns A created Baidu registration description.
 */
function createBaiduRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Baidu" });
}
/**
 * Creates a Baidu template registration description.
 * @param description - A partial Baidu template registration description.
 * @returns A created Baidu template registration description.
 */
function createBaiduTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "BaiduTemplate" });
}
/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push registration description.
 * @returns A created Web Push registration description.
 */
function createBrowserRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Browser" });
}
/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push template registration description.
 * @returns A created Web Push template registration description.
 */
function createBrowserTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "BrowserTemplate" });
}
/**
 * @deprecated Use createFcmRegistrationDescription instead.
 * Creates a GCM registration description.
 * @param description - A partial GCM registration description.
 * @returns A created GCM registration description.
 */
function createGcmRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Gcm" });
}
/**
 * @deprecated Use createFcmTemplateRegistrationDescription instead.
 * Creates a GCM template registration description.
 * @param description - A partial GCM template registration description.
 * @returns A created GCM template registration description.
 */
function createGcmTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "GcmTemplate" });
}
/**
 * Creates an FCM registration description.
 * @param description - A partial FCM registration description.
 * @returns A created FCM registration description.
 */
function createFcmRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Fcm" });
}
/**
 * Creates an FCM template registration description.
 * @param description - A partial FCM template registration description.
 * @returns A created FCM template registration description.
 */
function createFcmTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "FcmTemplate" });
}
/**
 * @deprecated Windows Phone is no longer supported.
 * Creates an MPNS registration description.
 * @param description - A partial MPNS registration description.
 * @returns A created MPNS registration description.
 */
function createMpnsRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Mpns" });
}
/**
 * @deprecated Windows Phone is no longer supported.
 * Creates an MPNS template registration description.
 * @param description - A partial MPNS template registration description.
 * @returns A created MPNS template registration description.
 */
function createMpnsTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "MpnsTemplate" });
}
/**
 * Creates a Windows registration description.
 * @param description - A partial Windows registration description.
 * @returns A created Windows registration description.
 */
function createWindowsRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Windows" });
}
/**
 * Creates a Windows template registration description.
 * @param description - A partial Windows template registration description.
 * @returns A created Windows template registration description.
 */
function createWindowsTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "WindowsTemplate" });
}

exports.NotificationHubsServiceClient = NotificationHubsServiceClient;
exports.buildAdmNativeMessage = buildAdmNativeMessage;
exports.buildAppleNativeMessage = buildAppleNativeMessage;
exports.buildBaiduNativeMessage = buildBaiduNativeMessage;
exports.buildFirebaseLegacyNativeMessage = buildFirebaseLegacyNativeMessage;
exports.buildWindowsBadgeNativeMessage = buildWindowsBadgeNativeMessage;
exports.createAdmInstallation = createAdmInstallation;
exports.createAdmNotification = createAdmNotification;
exports.createAdmRegistrationDescription = createAdmRegistrationDescription;
exports.createAdmTemplateRegistrationDescription = createAdmTemplateRegistrationDescription;
exports.createAppleInstallation = createAppleInstallation;
exports.createAppleNotification = createAppleNotification;
exports.createAppleRegistrationDescription = createAppleRegistrationDescription;
exports.createAppleTemplateRegistrationDescription = createAppleTemplateRegistrationDescription;
exports.createBaiduInstallation = createBaiduInstallation;
exports.createBaiduNotification = createBaiduNotification;
exports.createBaiduRegistrationDescription = createBaiduRegistrationDescription;
exports.createBaiduTemplateRegistrationDescription = createBaiduTemplateRegistrationDescription;
exports.createBrowserInstallation = createBrowserInstallation;
exports.createBrowserNotification = createBrowserNotification;
exports.createBrowserRegistrationDescription = createBrowserRegistrationDescription;
exports.createBrowserTemplateRegistrationDescription = createBrowserTemplateRegistrationDescription;
exports.createFcmRegistrationDescription = createFcmRegistrationDescription;
exports.createFcmTemplateRegistrationDescription = createFcmTemplateRegistrationDescription;
exports.createFirebaseLegacyInstallation = createFirebaseLegacyInstallation;
exports.createFirebaseLegacyNotification = createFirebaseLegacyNotification;
exports.createGcmRegistrationDescription = createGcmRegistrationDescription;
exports.createGcmTemplateRegistrationDescription = createGcmTemplateRegistrationDescription;
exports.createMpnsRegistrationDescription = createMpnsRegistrationDescription;
exports.createMpnsTemplateRegistrationDescription = createMpnsTemplateRegistrationDescription;
exports.createTemplateNotification = createTemplateNotification;
exports.createWindowsBadgeNotification = createWindowsBadgeNotification;
exports.createWindowsInstallation = createWindowsInstallation;
exports.createWindowsRawNotification = createWindowsRawNotification;
exports.createWindowsRegistrationDescription = createWindowsRegistrationDescription;
exports.createWindowsTemplateRegistrationDescription = createWindowsTemplateRegistrationDescription;
exports.createWindowsTileNotification = createWindowsTileNotification;
exports.createWindowsToastNotification = createWindowsToastNotification;
//# sourceMappingURL=index.js.map
