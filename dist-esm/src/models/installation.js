// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Creates an Apple based installation.
 * @param installation - A partial installation used to create the Apple installation.
 * @returns The newly created Apple installation.
 */
export function createAppleInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "apns" });
}
/**
 * Creates an Amazon Device Messaging (ADM) based installation.
 * @param installation - A partial installation used to create the ADM installation.
 * @returns The newly created ADM installation.
 */
export function createAdmInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "adm" });
}
/**
 * Creates a Baidu based installation.
 * @param installation - A partial installation used to create the Baidu installation.
 * @returns The newly created Baidu installation.
 */
export function createBaiduInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "baidu" });
}
/**
 * Creates a Firebase legacy HTTP based installation.
 * @param installation - A partial installation used to create the Firebase Legacy HTTP installation.
 * @returns The newly created Baidu installation.
 */
export function createFirebaseLegacyInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "gcm" });
}
/**
 * Creates a Windows Notification Services (WNS) based installation.
 * @param installation - A partial installation used to create the WNS installation.
 * @returns The newly created WNS installation.
 */
export function createWindowsInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "wns" });
}
/**
 * Creates a Web Push based installation.
 * @param installation - A partial installation used to create the Web Push installation.
 * @returns The newly created Web Push installation.
 */
export function createBrowserInstallation(installation) {
    return Object.assign(Object.assign({}, installation), { platform: "browser" });
}
//# sourceMappingURL=installation.js.map