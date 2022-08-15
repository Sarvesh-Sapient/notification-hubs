// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Creates an ADM registration description.
 * @param description - A partial ADM registration description.
 * @returns A created ADM registration description.
 */
export function createAdmRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Adm" });
}
/**
 * Creates an ADM template registration description.
 * @param description - A partial ADM template registration description.
 * @returns A created ADM template registration description.
 */
export function createAdmTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "AdmTemplate" });
}
/**
 * Creates an Apple registration description.
 * @param description - A partial Apple registration description.
 * @returns A created Apple registration description.
 */
export function createAppleRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Apple" });
}
/**
 * Creates an Apple template registration description.
 * @param description - A partial Apple template registration description.
 * @returns A created Apple template registration description.
 */
export function createAppleTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "AppleTemplate" });
}
/**
 * Creates a Baidu registration description.
 * @param description - A partial Baidu registration description.
 * @returns A created Baidu registration description.
 */
export function createBaiduRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Baidu" });
}
/**
 * Creates a Baidu template registration description.
 * @param description - A partial Baidu template registration description.
 * @returns A created Baidu template registration description.
 */
export function createBaiduTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "BaiduTemplate" });
}
/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push registration description.
 * @returns A created Web Push registration description.
 */
export function createBrowserRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Browser" });
}
/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push template registration description.
 * @returns A created Web Push template registration description.
 */
export function createBrowserTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "BrowserTemplate" });
}
/**
 * @deprecated Use createFcmRegistrationDescription instead.
 * Creates a GCM registration description.
 * @param description - A partial GCM registration description.
 * @returns A created GCM registration description.
 */
export function createGcmRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Gcm" });
}
/**
 * @deprecated Use createFcmTemplateRegistrationDescription instead.
 * Creates a GCM template registration description.
 * @param description - A partial GCM template registration description.
 * @returns A created GCM template registration description.
 */
export function createGcmTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "GcmTemplate" });
}
/**
 * Creates an FCM registration description.
 * @param description - A partial FCM registration description.
 * @returns A created FCM registration description.
 */
export function createFcmRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Fcm" });
}
/**
 * Creates an FCM template registration description.
 * @param description - A partial FCM template registration description.
 * @returns A created FCM template registration description.
 */
export function createFcmTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "FcmTemplate" });
}
/**
 * @deprecated Windows Phone is no longer supported.
 * Creates an MPNS registration description.
 * @param description - A partial MPNS registration description.
 * @returns A created MPNS registration description.
 */
export function createMpnsRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Mpns" });
}
/**
 * @deprecated Windows Phone is no longer supported.
 * Creates an MPNS template registration description.
 * @param description - A partial MPNS template registration description.
 * @returns A created MPNS template registration description.
 */
export function createMpnsTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "MpnsTemplate" });
}
/**
 * Creates a Windows registration description.
 * @param description - A partial Windows registration description.
 * @returns A created Windows registration description.
 */
export function createWindowsRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "Windows" });
}
/**
 * Creates a Windows template registration description.
 * @param description - A partial Windows template registration description.
 * @returns A created Windows template registration description.
 */
export function createWindowsTemplateRegistrationDescription(description) {
    return Object.assign(Object.assign({}, description), { type: "WindowsTemplate" });
}
//# sourceMappingURL=registration.js.map