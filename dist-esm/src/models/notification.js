// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as Constants from "../utils/constants.js";
/**
 * Creates a notification to send to an Apple device.
 * @param notification - A partial message used to create a message for Apple.
 * @returns A newly created Apple.
 */
export function createAppleNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "apple", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to an Amazon Device Messaging device.
 * @param notification - A partial message used to create a message for Amazon Device Messaging.
 * @returns A newly created Amazon Device Messaging.
 */
export function createAdmNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "adm", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to a Baidu registered device.
 * @param notification - A partial message used to create a message for Baidu.
 * @returns A newly created Baidu.
 */
export function createBaiduNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "baidu", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to a browser.
 * @param notification - A partial message used to create a message for a browser.
 * @returns A newly created Web Push browser.
 */
export function createBrowserNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "browser", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
export function createFirebaseLegacyNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "gcm", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
export function createTemplateNotification(notification) {
    return Object.assign(Object.assign({}, notification), { platform: "template", contentType: Constants.JSON_CONTENT_TYPE });
}
/**
 * Creates a badge message to send to WNS.
 * @param notification - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge.
 */
export function createWindowsBadgeNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "wns", contentType: Constants.XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_BADGE;
    return result;
}
/**
 * Creates a tile message to send to WNS.
 * @param notification - A partial message used to create a tile message for WNS.
 * @returns A newly created WNS tile.
 */
export function createWindowsTileNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "wns", contentType: Constants.XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_TITLE;
    return result;
}
/**
 * Creates a toast message to send to WNS.
 * @param notification - A partial message used to create a toast message for WNS.
 * @returns A newly created WNS toast.
 */
export function createWindowsToastNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "wns", contentType: Constants.XML_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_TOAST;
    return result;
}
/**
 * Creates a notification to send to WNS in wns/raw format..
 * @param notification - A partial message used to create a message for WNS in XML format.
 * @returns A newly created WNS message using XML.
 */
export function createWindowsRawNotification(notification) {
    const result = Object.assign(Object.assign({}, notification), { platform: "wns", contentType: Constants.STREAM_CONTENT_TYPE });
    if (!result.headers) {
        result.headers = {};
    }
    result.headers[Constants.WNS_TYPE_NAME] = Constants.WNS_RAW;
    return result;
}
//# sourceMappingURL=notification.js.map