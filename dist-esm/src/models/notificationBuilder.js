// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createAdmNotification, createAppleNotification, createBaiduNotification, createFirebaseLegacyNotification, createWindowsBadgeNotification, } from "./notification.js";
import { isDefined, isString } from "../utils/utils.js";
import { stringifyXML } from "@azure/core-xml";
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
export function buildAppleNativeMessage(nativeMessage, additionalProperties) {
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
export function buildFirebaseLegacyNativeMessage(nativeMessage) {
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
export function buildAdmNativeMessage(nativeMessage) {
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
export function buildBaiduNativeMessage(nativeMessage, additionalProperties) {
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
export function buildWindowsBadgeNativeMessage(nativeMessage) {
    const badge = {
        $: { value: nativeMessage.value },
    };
    return createWindowsBadgeNotification({
        body: stringifyXML(badge, { rootName: "badge" }),
    });
}
//# sourceMappingURL=notificationBuilder.js.map