// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getDateOrUndefined, getString, getStringOrUndefined, getTagsOrUndefined, isDefined, } from "../utils/utils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { RestError } from "@azure/core-rest-pipeline";
import { serializeToAtomXmlRequest } from "../utils/xmlUtils.js";
export const registrationDescriptionParser = {
    /**
     * @internal
     * Creates a registration type from the incoming entry.
     */
    async parseRegistrationEntry(bodyText) {
        const xml = await parseXML(bodyText, { includeRoot: true });
        const keyName = Object.keys(xml.entry.content)[0];
        const content = xml.entry.content[keyName];
        const methodName = `create${keyName}`;
        const method = this[methodName];
        if (!methodName) {
            throw new RestError(`${keyName} is not a supported registration type`, { statusCode: 500 });
        }
        return method.call(this, content);
    },
    /**
     * @internal
     * Creates a list of registrations from an incoming ATOM XML Feed.
     */
    async parseRegistrationFeed(bodyText) {
        const xml = await parseXML(bodyText, { includeRoot: true });
        const results = [];
        for (const entry of xml.feed.entry) {
            delete entry.content["$"];
            const keyName = Object.keys(entry.content)[0];
            const methodName = `create${keyName}`;
            const content = entry.content[keyName];
            const method = this[methodName];
            if (!methodName) {
                throw new RestError(`${keyName} is not a supported registration type`, { statusCode: 500 });
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
export const registrationDescriptionSerializer = {
    serializeRegistrationDescription(description) {
        const rootName = `${description.type}RegistrationDescription`;
        const methodName = `serialize${rootName}`;
        const method = this[methodName].bind(this);
        if (!isDefined(method)) {
            throw new RestError(`Undefined platform ${description.type}`, { statusCode: 400 });
        }
        const registration = method(description);
        const requestObject = serializeToAtomXmlRequest(rootName, registration);
        return stringifyXML(requestObject, { rootName: "entry" });
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
//# sourceMappingURL=registrationSerializer.js.map