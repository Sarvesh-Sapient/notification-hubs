import { CommonClientOptions } from '@azure/core-client';
import { OperationOptions } from '@azure/core-client';
import { PagedAsyncIterableIterator } from '@azure/core-paging';

/**
 * Represents an Amazon Device Messaging (ADM) based installation.
 */
export declare interface AdmInstallation extends DeviceTokenInstallation {
    /**
     * The platform for the installation.
     */
    platform: "adm";
}

/**
 * Represents a native ADM notification message payload.
 */
export declare interface AdmNativeMessage {
    /**
     * The notification payload to send with the message.
     */
    notification?: AdmNativeNotification;
    /**
     * The payload data to send with the message.
     */
    data?: Record<string, string>;
    /**
     * The priority of the msssage.
     */
    priority?: "normal" | "high";
    /**
     * This is an arbitrary string used to indicate that multiple messages are logically the same
     * and that ADM is allowed to drop previously enqueued messages in favor of this new one.
     */
    consolidationKey?: string;
    /**
     * The number of seconds that ADM should retain the message if the device is offline.
     */
    expiresAfter?: number;
    /**
     * This is a base-64-encoded MD5 checksum of the data parameter.
     */
    md5?: string;
}

/**
 * Describes ADM notification messages.
 */
export declare interface AdmNativeNotification {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The notification's icon.
     */
    icon?: string;
    /**
     * The notification's icon color, expressed in #rrggbb format.
     */
    color?: string;
    /**
     * The sound to play when the device receives the notification. Supports "default" or the filename of a sound resource bundled in the app.
     */
    sound?: string;
    /**
     * Identifier used to replace existing notifications in the notification drawer.
     */
    tag?: string;
    /**
     * The action associated with a user click on the notification.
     */
    clickAction?: string;
    /**
     * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
     */
    bodyLocKey?: string;
    /**
     * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
     */
    bodyLocArgs?: string[];
    /**
     * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
     */
    titleLocKey?: string;
    /**
     * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
     */
    titleLocArgs?: string[];
    /**
     * The notification's channel id.
     */
    channelId?: string;
    /**
     * Sets the "ticker" text, which is sent to accessibility services.
     */
    ticker?: string;
    /**
     * When set to false or unset, the notification is automatically dismissed when the user clicks it in the panel.
     */
    sticky?: boolean;
    /**
     * Set the time that the event in the notification occurred. Must be a timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z".
     */
    eventTime?: string;
    /**
     * Set whether or not this notification is relevant only to the current device.
     */
    localOnly?: boolean;
    /**
     * Set the relative priority for this notification.
     */
    notificationPriority?: number;
    /**
     * If set to true, use the Android framework's default sound for the notification.
     */
    defaultSound?: boolean;
    /**
     * Set the Notification.visibility of the notification.
     */
    visibility?: number;
    /**
     * Sets the number of items this notification represents.
     */
    notificationCount?: number;
    /**
     * Contains the URL of an image that is going to be displayed in a notification.
     */
    image?: string;
}

/**
 * Represents an Amazon Device Messaging (ADM) push notification.
 */
export declare interface AdmNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "adm";
}

/**
 * Represents the description of the Amazon Device Messaging (ADM) registration.
 */
export declare interface AdmRegistrationDescription extends RegistrationDescriptionCommon {
    /**
     * The Amazon Device Messaging registration identifier.
     */
    admRegistrationId: string;
    /**
     * The type of the registration.
     */
    type: "Adm";
}

/**
 * Represents the description of the Amazon Device Messaging (ADM) template registration.
 */
export declare interface AdmTemplateRegistrationDescription extends Omit<AdmRegistrationDescription, "type">, TemplateRegistrationDescription {
    /**
     * The type of the registration.
     */
    type: "AdmTemplate";
}

/**
 * Represents what is in the APNs alert body.
 */
export declare interface AppleAlert {
    /**
     * The title of the notification. Apple Watch displays this string in the short look notification
     * interface. Specify a string that’s quickly understood by the user.
     */
    title?: string;
    /**
     * Additional information that explains the purpose of the notification.
     */
    subtitle?: string;
    /**
     * The content of the alert message.
     */
    body?: string;
    /**
     * The name of the launch image file to display. If the user chooses to launch your app,
     * the contents of the specified image or storyboard file are displayed instead of your app’s normal launch image.
     */
    launchImage?: string;
    /**
     * The key for a localized title string. Specify this key instead of the title key to retrieve
     * the title from your app’s Localizable.strings files. The value must contain the name of a key in your strings file.
     */
    titleLocKey?: string;
    /**
     * An array of strings containing replacement values for variables in your title string.
     * Each %\@ character in the string specified by the title-loc-key is replaced by a value
     * from this array. The first item in the array replaces the first instance
     * of the %\@ character in the string, the second item replaces the second instance, and so on.
     */
    titleLocArgs?: string[];
    /**
     * The key for a localized subtitle string. Use this key, instead of the subtitle key, to
     * retrieve the subtitle from your app’s Localizable.strings file.
     * The value must contain the name of a key in your strings file.
     */
    subtitleLocKey?: string;
    /**
     * An array of strings containing replacement values for variables in your title string.
     * Each %\@ character in the string specified by subtitle-loc-key is replaced by a value
     * from this array. The first item in the array replaces the first instance of the
     * %\@ character in the string, the second item replaces the second instance, and so on.
     */
    subtitleLocArgs?: string[];
    /**
     * The key for a localized message string. Use this key, instead of the body key, to
     * retrieve the message text from your app’s Localizable.strings file. The value must contain
     * the name of a key in your strings file.
     */
    locKey?: string;
    /**
     * An array of strings containing replacement values for variables in your message text.
     * Each %\@ character in the string specified by loc-key is replaced by a value from
     * this array. The first item in the array replaces the first instance of the %\@ character
     * in the string, the second item replaces the second instance, and so on.
     */
    locArgs?: string[];
}

/**
 * Represents an APNs critical sound
 */
export declare interface AppleCriticalSound {
    /**
     * The critical alert flag. Set to 1 to enable the critical alert.
     */
    critical: number;
    /**
     * The name of a sound file in your app’s main bundle or in the Library/Sounds folder
     * of your app’s container directory. Specify the string “default” to play the system sound.
     */
    name: string;
    /**
     * The volume for the critical alert’s sound. Set this to a value between 0 (silent) and 1 (full volume).
     */
    volume: number;
}

/**
 * Represents an Apple APNs based installation.
 */
export declare interface AppleInstallation extends DeviceTokenInstallation {
    /**
     * The platform for the installation.
     */
    platform: "apns";
}

/**
 * Represents a native APNs message.
 */
export declare interface AppleNativeMessage extends Record<string, any> {
    /**
     * The information for displaying an alert.
     */
    alert?: string | AppleAlert;
    /**
     * The number to display in a badge on your app’s icon.
     */
    badge?: number;
    /**
     * The name of a sound file in your app’s main bundle or in the Library/Sounds
     * folder of your app’s container directory. Specify the string “default” to
     * play the system sound. Use this key for regular notifications.
     * For critical alerts, use the sound dictionary instead.
     */
    sound?: string | AppleCriticalSound;
    /**
     * An app-specific identifier for grouping related notifications.
     */
    threadId?: string;
    /**
     * The notification’s type.
     */
    category?: string;
    /**
     * The background notification flag. To perform a silent background update,
     * specify the value 1 and don’t include the alert, badge, or sound keys in your payload.
     */
    contentAvailable?: number;
    /**
     * The notification service app extension flag. If the value is 1, the system passes
     * the notification to your notification service app extension before delivery.
     */
    mutableContent?: number;
    /**
     * The identifier of the window brought forward.
     */
    targetContentId?: string;
    /**
     * The importance and delivery timing of a notification.
     */
    interruptionLevel?: "passive" | "active" | "time-sensitive" | "critical";
    /**
     * The relevance score, a number between 0 and 1, that the system uses to sort the
     * notifications from your app. The highest score gets featured in the notification summary.
     */
    relevanceScore?: number;
    /**
     * The criteria the system evaluates to determine if it displays the notification in the current Focus.
     */
    filterCriteria?: string;
}

/**
 * Represents an Apple APNs push notification.
 */
export declare interface AppleNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "apple";
}

/**
 * The priority of the Apple push notification.
 */
export declare type ApplePriority = "10" | "5";

/**
 * Represents the description of apple registration.
 */
export declare interface AppleRegistrationDescription extends RegistrationDescriptionCommon {
    /**
     * The APNs device token.
     */
    deviceToken: string;
    /**
     * The type of the registration.
     */
    type: "Apple";
}

/**
 * Represents the description of the Apple template registration.
 */
export declare interface AppleTemplateRegistrationDescription extends Omit<AppleRegistrationDescription, "type">, TemplateRegistrationDescription {
    /**
     * The expiry date.
     */
    expiry?: Date;
    /**
     * The notification priority.
     */
    priority?: ApplePriority;
    /**
     * The APNS headers.
     */
    apnsHeaders?: Record<string, string>;
    /**
     * The type of the registration.
     */
    type: "AppleTemplate";
}

/**
 * Represents the Baidu Apple native payload.
 */
export declare interface BaiduAppleNativePayload {
    /**
     * The alert string.
     */
    alert?: string;
    /**
     * The APNs sound to play.
     */
    sound?: string;
    /**
     * The APNs badge count.
     */
    badge?: number;
}

/**
 * Represents a Baidu based installation.
 */
export declare interface BaiduInstallation extends DeviceTokenInstallation {
    /**
     * The platform for the installation.
     */
    platform: "baidu";
}

/**
 * Baidu Native Format:
 * https://stackoverflow.com/questions/42591815/customize-baidu-push-json-payload
 * http://www.tuicool.com/articles/ZnmANn
 */
export declare interface BaiduNativeMessage extends Record<string, any> {
    /**
     * Notification title for Android.
     */
    title?: string;
    /**
     * Baidu Notification description for Android.
     */
    description?: string;
    /**
     * Baidu Notification builder ID.
     */
    notificationBuilderId?: number;
    /**
     * Baidu Notification Android basic style.
     */
    notificationBasicStyle?: number;
    /**
     * Baidu Android open type.
     */
    openType?: number;
    /**
     * Baidu Android net support option.
     */
    netSupport?: number;
    /**
     * Baidu Android user confirm.
     */
    userConfirm?: number;
    /**
     * Baidu Android URL.
     */
    url?: string;
    /**
     * Baidu Android package content.
     */
    pkgContent?: string;
    /**
     * Baidu Android package version.
     */
    pkgVersion?: string;
    /**
     * Baidu Android custom content dictionary.
     */
    customContent?: Record<string, any>;
    /**
     * Baidu APNs support.
     */
    aps?: BaiduAppleNativePayload;
}

/**
 * Represents a Baidu push notification.
 */
export declare interface BaiduNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "baidu";
}

/**
 * Represents a Baidu registration description.
 */
export declare interface BaiduRegistrationDescription extends RegistrationDescriptionCommon {
    /**
     * The Baidu user identifier.
     */
    baiduUserId: string;
    /**
     * The Baidu channel identifier.
     */
    baiduChannelId: string;
    /**
     * The type of the registration.
     */
    type: "Baidu";
}

/**
 * Represents a Baidu template registration description.
 */
export declare interface BaiduTemplateRegistrationDescription extends Omit<BaiduRegistrationDescription, "type">, TemplateRegistrationDescription {
    /**
     * The type of the registration.
     */
    type: "BaiduTemplate";
}

/**
 * Represents a Browser/Web Push based installation.
 */
export declare interface BrowserInstallation extends InstallationCommon {
    /**
     * The push channel for the Web Push API.
     */
    pushChannel: BrowserPushChannel;
    /**
     * The platform for the installation.
     */
    platform: "browser";
}

/**
 * Represents a Browser push notification.
 */
export declare interface BrowserNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "browser";
}

/**
 * Represents the push channel for a Browser Push installation.
 */
export declare interface BrowserPushChannel {
    /**
     * The P256DH for the browser push installation.
     */
    p256dh: string;
    /**
     * The auth secret for the browser push installation.
     */
    auth: string;
    /**
     * The endpoint URL for the browser push installation.
     */
    endpoint: string;
}

/**
 * Represents a Browser Push registration description.
 */
export declare interface BrowserRegistrationDescription extends RegistrationDescriptionCommon {
    /**
     * The Browser push endpoint.
     */
    endpoint: string;
    /**
     * The Browser push P256DH.
     */
    p256dh: string;
    /**
     * The Browser push auth secret.
     */
    auth: string;
    /**
     * The type of the registration.
     */
    type: "Browser";
}

/**
 * Represents a Browser Push remplate registration description.
 */
export declare interface BrowserTemplateRegistrationDescription extends Omit<BrowserRegistrationDescription, "type">, TemplateRegistrationDescription {
    /**
     * The type of the registration.
     */
    type: "BrowserTemplate";
}

/**
 * Creates a AdmNotification from a native ADM payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The AdmNotification to send to Notification Hubs.
 */
export declare function buildAdmNativeMessage(nativeMessage: AdmNativeMessage): AdmNotification;

/**
 * Creates an APNs native message to send to Notification Hubs.
 * @param nativeMessage - The Apple native message properties to set.
 * @param additionalProperties - Additional properties for Apple messages.
 * @returns An AppleNotification to send to Notification Hubs.
 */
export declare function buildAppleNativeMessage(nativeMessage: AppleNativeMessage, additionalProperties?: Record<string, any>): AppleNotification;

/**
 * Creates a BaiduNotification from a native Baidu payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @param additionalProperties - Additional properties for Apple Baidu messages.
 * @returns The BaiduNotification to send to Notification Hubs.
 */
export declare function buildBaiduNativeMessage(nativeMessage: BaiduNativeMessage, additionalProperties?: Record<string, any>): BaiduNotification;

/**
 * Creates a FirebaseLegacyNotification from a native Firebase payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The FirebaseLegacyNotification to send to Notification Hubs.
 */
export declare function buildFirebaseLegacyNativeMessage(nativeMessage: FirebaseLegacyNativeMessage): FirebaseLegacyNotification;

/**
 * Builds a WindowsNotification from a Windows Badge.
 * @param nativeMessage - The Windows Badge Message to build.
 * @returns A WindowsNotification created with the badge information.
 */
export declare function buildWindowsBadgeNativeMessage(nativeMessage: WindowsBadgeNativeMessage): WindowsNotification;

/**
 * Creates an Amazon Device Messaging (ADM) based installation.
 * @param installation - A partial installation used to create the ADM installation.
 * @returns The newly created ADM installation.
 */
export declare function createAdmInstallation(installation: Omit<AdmInstallation, "platform">): AdmInstallation;

/**
 * Creates a notification to send to an Amazon Device Messaging device.
 * @param notification - A partial message used to create a message for Amazon Device Messaging.
 * @returns A newly created Amazon Device Messaging.
 */
export declare function createAdmNotification(notification: Omit<AdmNotification, "platform" | "contentType">): AdmNotification;

/**
 * Creates an ADM registration description.
 * @param description - A partial ADM registration description.
 * @returns A created ADM registration description.
 */
export declare function createAdmRegistrationDescription(description: Omit<AdmRegistrationDescription, "type">): AdmRegistrationDescription;

/**
 * Creates an ADM template registration description.
 * @param description - A partial ADM template registration description.
 * @returns A created ADM template registration description.
 */
export declare function createAdmTemplateRegistrationDescription(description: Omit<AdmTemplateRegistrationDescription, "type">): AdmTemplateRegistrationDescription;

/**
 * Creates an Apple based installation.
 * @param installation - A partial installation used to create the Apple installation.
 * @returns The newly created Apple installation.
 */
export declare function createAppleInstallation(installation: Omit<AppleInstallation, "platform">): AppleInstallation;

/**
 * Creates a notification to send to an Apple device.
 * @param notification - A partial message used to create a message for Apple.
 * @returns A newly created Apple.
 */
export declare function createAppleNotification(notification: Omit<AppleNotification, "platform" | "contentType">): AppleNotification;

/**
 * Creates an Apple registration description.
 * @param description - A partial Apple registration description.
 * @returns A created Apple registration description.
 */
export declare function createAppleRegistrationDescription(description: Omit<AppleRegistrationDescription, "type">): AppleRegistrationDescription;

/**
 * Creates an Apple template registration description.
 * @param description - A partial Apple template registration description.
 * @returns A created Apple template registration description.
 */
export declare function createAppleTemplateRegistrationDescription(description: Omit<AppleTemplateRegistrationDescription, "type">): AppleTemplateRegistrationDescription;

/**
 * Creates a Baidu based installation.
 * @param installation - A partial installation used to create the Baidu installation.
 * @returns The newly created Baidu installation.
 */
export declare function createBaiduInstallation(installation: Omit<BaiduInstallation, "platform">): BaiduInstallation;

/**
 * Creates a notification to send to a Baidu registered device.
 * @param notification - A partial message used to create a message for Baidu.
 * @returns A newly created Baidu.
 */
export declare function createBaiduNotification(notification: Omit<BaiduNotification, "platform" | "contentType">): BaiduNotification;

/**
 * Creates a Baidu registration description.
 * @param description - A partial Baidu registration description.
 * @returns A created Baidu registration description.
 */
export declare function createBaiduRegistrationDescription(description: Omit<BaiduRegistrationDescription, "type">): BaiduRegistrationDescription;

/**
 * Creates a Baidu template registration description.
 * @param description - A partial Baidu template registration description.
 * @returns A created Baidu template registration description.
 */
export declare function createBaiduTemplateRegistrationDescription(description: Omit<BaiduTemplateRegistrationDescription, "type">): BaiduTemplateRegistrationDescription;

/**
 * Creates a Web Push based installation.
 * @param installation - A partial installation used to create the Web Push installation.
 * @returns The newly created Web Push installation.
 */
export declare function createBrowserInstallation(installation: Omit<BrowserInstallation, "platform">): BrowserInstallation;

/**
 * Creates a notification to send to a browser.
 * @param notification - A partial message used to create a message for a browser.
 * @returns A newly created Web Push browser.
 */
export declare function createBrowserNotification(notification: Omit<BrowserNotification, "platform" | "contentType">): BrowserNotification;

/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push registration description.
 * @returns A created Web Push registration description.
 */
export declare function createBrowserRegistrationDescription(description: Omit<BrowserRegistrationDescription, "type">): BrowserRegistrationDescription;

/**
 * Creates a Web Push registration description.
 * @param description - A partial Web Push template registration description.
 * @returns A created Web Push template registration description.
 */
export declare function createBrowserTemplateRegistrationDescription(description: Omit<BrowserTemplateRegistrationDescription, "type">): BrowserTemplateRegistrationDescription;

/**
 * Creates an FCM registration description.
 * @param description - A partial FCM registration description.
 * @returns A created FCM registration description.
 */
export declare function createFcmRegistrationDescription(description: Omit<FcmRegistrationDescription, "type">): FcmRegistrationDescription;

/**
 * Creates an FCM template registration description.
 * @param description - A partial FCM template registration description.
 * @returns A created FCM template registration description.
 */
export declare function createFcmTemplateRegistrationDescription(description: Omit<FcmTemplateRegistrationDescription, "type">): FcmTemplateRegistrationDescription;

/**
 * Creates a Firebase legacy HTTP based installation.
 * @param installation - A partial installation used to create the Firebase Legacy HTTP installation.
 * @returns The newly created Baidu installation.
 */
export declare function createFirebaseLegacyInstallation(installation: Omit<FirebaseLegacyInstallation, "platform">): FirebaseLegacyInstallation;

/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
export declare function createFirebaseLegacyNotification(notification: Omit<FirebaseLegacyNotification, "platform" | "contentType">): FirebaseLegacyNotification;

/**
 * @deprecated Use createFcmRegistrationDescription instead.
 * Creates a GCM registration description.
 * @param description - A partial GCM registration description.
 * @returns A created GCM registration description.
 */
export declare function createGcmRegistrationDescription(description: Omit<GcmRegistrationDescription, "type">): GcmRegistrationDescription;

/**
 * @deprecated Use createFcmTemplateRegistrationDescription instead.
 * Creates a GCM template registration description.
 * @param description - A partial GCM template registration description.
 * @returns A created GCM template registration description.
 */
export declare function createGcmTemplateRegistrationDescription(description: Omit<GcmTemplateRegistrationDescription, "type">): GcmTemplateRegistrationDescription;

/**
 * @deprecated Windows Phone is no longer supported.
 * Creates an MPNS registration description.
 * @param description - A partial MPNS registration description.
 * @returns A created MPNS registration description.
 */
export declare function createMpnsRegistrationDescription(description: Omit<MpnsRegistrationDescription, "type">): MpnsRegistrationDescription;

/**
 * @deprecated Windows Phone is no longer supported.
 * Creates an MPNS template registration description.
 * @param description - A partial MPNS template registration description.
 * @returns A created MPNS template registration description.
 */
export declare function createMpnsTemplateRegistrationDescription(description: Omit<MpnsTemplateRegistrationDescription, "type">): MpnsTemplateRegistrationDescription;

/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
export declare function createTemplateNotification(notification: Omit<TemplateNotification, "platform" | "contentType">): TemplateNotification;

/**
 * Creates a badge message to send to WNS.
 * @param notification - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge.
 */
export declare function createWindowsBadgeNotification(notification: Omit<WindowsNotification, "platform" | "contentType">): WindowsNotification;

/**
 * Creates a Windows Notification Services (WNS) based installation.
 * @param installation - A partial installation used to create the WNS installation.
 * @returns The newly created WNS installation.
 */
export declare function createWindowsInstallation(installation: Omit<WindowsInstallation, "platform">): WindowsInstallation;

/**
 * Creates a notification to send to WNS in wns/raw format..
 * @param notification - A partial message used to create a message for WNS in XML format.
 * @returns A newly created WNS message using XML.
 */
export declare function createWindowsRawNotification(notification: Omit<WindowsNotification, "platform" | "contentType">): WindowsNotification;

/**
 * Creates a Windows registration description.
 * @param description - A partial Windows registration description.
 * @returns A created Windows registration description.
 */
export declare function createWindowsRegistrationDescription(description: Omit<WindowsRegistrationDescription, "type">): WindowsRegistrationDescription;

/**
 * Creates a Windows template registration description.
 * @param description - A partial Windows template registration description.
 * @returns A created Windows template registration description.
 */
export declare function createWindowsTemplateRegistrationDescription(description: Omit<WindowsTemplateRegistrationDescription, "type">): WindowsTemplateRegistrationDescription;

/**
 * Creates a tile message to send to WNS.
 * @param notification - A partial message used to create a tile message for WNS.
 * @returns A newly created WNS tile.
 */
export declare function createWindowsTileNotification(notification: Omit<WindowsNotification, "platform" | "contentType">): WindowsNotification;

/**
 * Creates a toast message to send to WNS.
 * @param notification - A partial message used to create a toast message for WNS.
 * @returns A newly created WNS toast.
 */
export declare function createWindowsToastNotification(notification: Omit<WindowsNotification, "platform" | "contentType">): WindowsNotification;

/**
 * Represents an installation with a string based device token.
 */
export declare interface DeviceTokenInstallation extends InstallationCommon {
    /**
     * The push channel for a device.
     */
    pushChannel: string;
}

/**
 * Represents entity update operation options that can be set.
 */
export declare interface EntityOperationOptions extends OperationOptions {
    /**
     * ETag as returned by creation, update, and retrieval, or ‘*’ (overwrite).
     */
    etag?: string;
}

/**
 * Represents Notification Hub registration description for Firebase Legacy HTTP API.
 */
export declare interface FcmRegistrationDescription extends RegistrationDescriptionCommon {
    /**
     * Registration id obtained from the Google Cloud Messaging service.
     */
    fcmRegistrationId: string;
    /**
     * The type of the registration.
     */
    type: "Fcm";
}

/**
 * Represents Notification Hub template registration description for Firebase Legacy HTTP API.
 */
export declare interface FcmTemplateRegistrationDescription extends Omit<FcmRegistrationDescription, "type">, TemplateRegistrationDescription {
    /**
     * The type of the registration.
     */
    type: "FcmTemplate";
}

/**
 * Represents an Android native payload for the Firebase Legacy HTTP interface.
 */
export declare interface FirebaseLegacyAndroidNativePayload {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The notification's channel ID.
     */
    androidChannelId?: string;
    /**
     * The notification's icon.
     */
    icon?: string;
    /**
     * The sound to play when the device receives the notification.
     */
    sound?: string;
    /**
     * Identifier used to replace existing notifications in the notification drawer.
     */
    tag?: string;
    /**
     * The notification's icon color, expressed in #rrggbb format.
     */
    color?: string;
    /**
     * The action associated with a user click on the notification.
     */
    clickAction?: string;
    /**
     * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
     */
    bodyLocKey?: string;
    /**
     * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
     */
    bodyLocArgs?: string[];
    /**
     * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
     */
    titleLocKey?: string;
    /**
     * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
     */
    titleLocArgs?: string[];
}

/**
 * Represents an APNs native payload for the Firebase Legacy HTTP interface.
 */
export declare interface FirebaseLegacyAppleNativePayload {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The sound to play when the device receives the notification.
     */
    sound?: string;
    /**
     * The value of the badge on the home screen app icon.
     */
    badge?: string;
    /**
     * The action associated with a user click on the notification which corresponds to the APNs category.
     */
    clickAction?: string;
    /**
     * The notification's subtitle.
     */
    subtitle?: string;
    /**
     * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
     */
    bodyLocKey?: string;
    /**
     * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
     */
    bodyLocArgs?: string[];
    /**
     * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
     */
    titleLocKey?: string;
    /**
     * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
     */
    titleLocArgs?: string[];
}

/**
 * Represents a Firebase Legacy HTTP installation.
 */
export declare interface FirebaseLegacyInstallation extends DeviceTokenInstallation {
    /**
     * The platform for the installation.
     */
    platform: "gcm";
}

/**
 * Represents the targets, options, and payload for HTTP JSON messages for the Firebase Legacy HTTP interface.
 */
export declare interface FirebaseLegacyNativeMessage {
    /**
     * The recipient of a message.
     */
    to?: string;
    /**
     * The recipient of a multicast message, a message sent to more than one registration token.
     */
    registrationIds?: string[];
    /**
     * A logical expression of conditions that determine the message target.
     */
    condition?: string;
    /**
     * Used to identify a group of messages.
     */
    collapseKey?: string;
    /**
     * The priority of the message.
     */
    priority?: "normal" | "high";
    /**
     * The background notification flag. To perform a silent background update,
     * specify the value 1 and don’t include the alert, badge, or sound keys in your payload.
     */
    contentAvailable?: boolean;
    /**
     * The notification service app extension flag. If the value is 1, the system passes
     * the notification to your notification service app extension before delivery.
     */
    mutableContent?: number;
    /**
     * Specifies how long (in seconds) the message should be kept in FCM storage if the device is offline
     */
    timeToLive?: number;
    /**
     * The package name of the application where the registration tokens must match in order to receive the message.
     */
    restrictedPackageName?: string;
    /**
     * When set to true, allows developers to test a request without actually sending a message.
     */
    dryRun?: boolean;
    /**
     * Custom key-value pairs of the message's payload.
     */
    data?: Record<string, any>;
    /**
     * The predefined, user-visible key-value pairs of the notification payload.
     */
    notification?: FirebaseLegacyAppleNativePayload | FirebaseLegacyAndroidNativePayload | FirebaseLegacyWebNativePayload;
}

/**
 * Represents a Firebase legacy HTTP push notification.
 */
export declare interface FirebaseLegacyNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "gcm";
}

/**
 * Represents an Web Push native payload for the Firebase Legacy HTTP interface.
 */
export declare interface FirebaseLegacyWebNativePayload {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The URL to use for the notification's icon.
     */
    icon?: string;
    /**
     * The action associated with a user click on the notification.
     */
    clickAction?: string;
}

/**
 * Represents Notification Hub registration description for Google Cloud Messaging.
 * @deprecated Use FcmRegistrationDescription instead.
 */
export declare interface GcmRegistrationDescription extends RegistrationDescriptionCommon {
    /**
     * Registration id obtained from the Google Cloud Messaging service.
     */
    gcmRegistrationId: string;
    /**
     * The type of the registration.
     */
    type: "Gcm";
}

/**
 * @deprecated Use createFcmTemplateRegistrationDescription instead.
 * Represents Notification Hub template registration description for Google Cloud Messaging.
 * @deprecated Use FcmTemplateRegistrationDescription instead
 */
export declare interface GcmTemplateRegistrationDescription extends Omit<GcmRegistrationDescription, "type">, TemplateRegistrationDescription {
    /**
     * The type of the registration.
     */
    type: "GcmTemplate";
}

/**
 * Represents the types of installations available in Notification Hubs.
 */
export declare type Installation = AppleInstallation | AdmInstallation | BaiduInstallation | BrowserInstallation | FirebaseLegacyInstallation | WindowsInstallation;

/**
 * Represents an installation for a device for Notification Hubs.
 */
export declare interface InstallationCommon {
    /**
     * The ID for the installation.
     */
    installationId: string;
    /**
     * The User ID for the installation used for targeting.
     */
    userId?: string;
    /**
     * The installation expiration time.
     */
    readonly expirationTime?: string;
    /**
     * The last update date of the installation.
     */
    readonly lastUpdate?: string;
    /**
     * The platform for the installation.
     */
    platform: "apns" | "adm" | "baidu" | "browser" | "gcm" | "wns";
    /**
     * The tags used for targeting this installation.
     */
    tags?: string[];
    /**
     * The templates for the installation.
     */
    templates?: Record<string, InstallationTemplate>;
}

/**
 * Represents an installation template.
 */
export declare interface InstallationTemplate {
    /**
     * The body for the installation template.
     */
    body: string;
    /**
     * Headers to include for the template send.
     */
    headers: Record<string, string>;
    /**
     * The tags to include for the template.
     */
    tags?: string[];
}

/**
 * Represents a JSON notification hub.
 */
export declare interface JsonNotification extends NotificationCommon {
    /**
     * The content type for the push notification.
     */
    contentType: "application/json;charset=utf-8";
}

/**
 * Represents a patch operation.
 */
export declare interface JsonPatch {
    /**
     * The patch operation.
     */
    op: JsonPatchOperation;
    /**
     * The path for the patch operation.
     */
    path: string;
    /**
     * The value to add or replace for the operation.
     */
    value?: string;
}

/**
 * Represents the JSON Patch types of add, remove and replace.
 */
export declare type JsonPatchOperation = "add" | "remove" | "replace";

/**
 * Represents a Windows Phone Notification Services registration description.
 * @deprecated Windows Phone is no longer supported.
 */
export declare interface MpnsRegistrationDescription extends RegistrationDescriptionCommon {
    /**
     * The channel URI.
     */
    channelUri: string;
    /**
     * The type of the registration.
     */
    type: "Mpns";
}

/**
 * Represents a Windows Phone Notification Services template registration.
 * @deprecated Windows Phone is no longer supported.
 */
export declare interface MpnsTemplateRegistrationDescription extends Omit<MpnsRegistrationDescription, "type">, TemplateRegistrationDescription {
    /**
     * The WNS headers.
     */
    mpnsHeaders?: Record<string, string>;
    /**
     * The type of the registration.
     */
    type: "MpnsTemplate";
}

/**
 * Represents the possible push notification messages types.
 */
export declare type Notification = AppleNotification | AdmNotification | BaiduNotification | BrowserNotification | FirebaseLegacyNotification | WindowsNotification | TemplateNotification;

/**
 * Represents a notification hub.
 */
export declare interface NotificationCommon {
    /**
     * The body for the push notification.
     */
    body: string;
    /**
     * The headers to include for the push notification.
     */
    headers?: Record<string, string>;
    /**
     * The platform for the push notification.
     */
    platform: string;
    /**
     * The content type for the push notification.
     */
    contentType: string;
}

/**
 * Represents Notification details.
 */
export declare interface NotificationDetails {
    /**
     * The unique notification identifier.
     */
    notificationId?: string;
    /**
     * The notification location.
     */
    location?: string;
    /**
     * The notification state.
     */
    state?: NotificationOutcomeState;
    /**
     * The enqueue time of the notification.
     */
    enqueueTime?: Date;
    /**
     * The notification send start time.
     */
    startTime?: Date;
    /**
     * The notification send end time.
     */
    endTime?: Date;
    /**
     * The notification body.
     */
    notificationBody?: string;
    /**
     * The notification tags.
     */
    tags?: string;
    /**
     * The notification platforms targeted.
     */
    targetPlatforms?: string;
    /**
     * The URL for the platform notification services errors.
     */
    pnsErrorDetailsUrl?: string;
    /**
     * APNs outcomes counts per state.
     */
    apnsOutcomeCounts?: NotificationOutcomeCollectionItem[];
    /**
     * WNS outcomes counts per state.
     */
    wnsOutcomeCounts?: NotificationOutcomeCollectionItem[];
    /**
     * FCM outcome counts per state.
     */
    fcmOutcomeCounts?: NotificationOutcomeCollectionItem[];
    /**
     * ADM outcome counts per state.
     */
    admOutcomeCounts?: NotificationOutcomeCollectionItem[];
    /**
     * Baidu outcome counts per state.
     */
    baiduOutcomeCounts?: NotificationOutcomeCollectionItem[];
    /**
     * Web Push outcome counts per state.
     */
    browserOutcomeCounts?: NotificationOutcomeCollectionItem[];
}

/**
 * Represents a Notification Hub Job.
 */
export declare interface NotificationHubJob {
    /**
     * The unique job identifier.
     */
    jobId?: string;
    /**
     * The output file name.
     */
    outputFileName?: string;
    /**
     * The file name for the job failures.
     */
    failuresFileName?: string;
    /**
     * The progress for the job.
     */
    progress?: number;
    /**
     * The type of job.
     */
    type: NotificationHubJobType;
    /**
     * The status of the job.
     */
    status?: NotificationHubJobStatus;
    /**
     * The output container URL.
     */
    outputContainerUrl: string;
    /**
     * The import file URL.
     */
    importFileUrl?: string;
    /**
     * The input properties for the notification hub job.
     */
    inputProperties?: Record<string, string>;
    /**
     * Gets the notification hub job failure message.
     */
    failure?: string;
    /**
     * The output properties for the notification hub job.
     */
    outputProperties?: Record<string, string>;
    /**
     * Notification hub job created date.
     */
    createdAt?: Date;
    /**
     * Notification hub job last updated date.
     */
    updatedAt?: Date;
}

/**
 * Describes the types of notification hub job statuses.
 */
export declare type NotificationHubJobStatus = 
/**
* Indicates that the NotificationHubJob was accepted.
*/
"Started"
/**
* Indicates that the NotificationHubJob is currently running. Depending on the amount of data,
* a job may stay in this state for several hours.
*/
| "Running"
/**
* Indicates that the NotificationHubJob was completed successfully. Any output
* will be ready where configured via the NotificationHubJob object.
*/
| "Completed"
/**
* Indicates that the NotificationHubJob has failed.
*/
| "Failed";

/**
 * Describes the types of notification hub jobs.
 */
export declare type NotificationHubJobType = 
/**
* Job type to bulk get registrations.
*/
"ExportRegistrations"
/**
* Job type to bulk create registrations.
*/
| "ImportCreateRegistrations"
/**
* Job type to bulk update registrations.
*/
| "ImportUpdateRegistrations"
/**
* Job type to bulk delete registrations.
*/
| "ImportDeleteRegistrations"
/**
* Job type to bulk upsert registrations.
*/
| "ImportUpsertRegistrations";

/**
 * Describes the options that can be provided while creating the NotificationHubsClientContext.
 */
export declare interface NotificationHubsClientOptions extends CommonClientOptions {
}

/**
 * Describes a response from the Notification Hubs service for send operations.
 */
export declare interface NotificationHubsMessageResponse extends NotificationHubsResponse {
    /**
     * The notification ID from the operation.  Note this is only available in Standard SKU and above.
     */
    notificationId?: string;
}

/**
 * Describes a response from the Notification Hubs which includes a tracking ID, correlation ID and location.
 */
export declare interface NotificationHubsResponse {
    /**
     * The Tracking ID of the operation.
     */
    trackingId?: string;
    /**
     * The correlation ID of the operation.
     */
    correlationId?: string;
    /**
     * The location of the operation.
     */
    location?: string;
}

/**
 * This represents a client for Azure Notification Hubs to manage installations and send
 * messages to devices.
 */
export declare class NotificationHubsServiceClient {
    private _client;
    /**
     * Creates a new instance of the NotificationClient with a connection string, hub name and options.
     * @param connectionString - The Notification Hub Access Policy connection string.
     * @param hubName - The name of the Azure Notification Hub.
     * @param options - Options for configuring the Azure Notification Hubs client.
     */
    constructor(connectionString: string, hubName: string, options?: NotificationHubsClientOptions);
    /**
     * Creates or overwrites an installation to a Notification Hub.
     * @param installation - The installation to create or overwrite.
     * @param options - Configuration options for the create or update installation operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    createOrUpdateInstallation(installation: Installation, options?: OperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Deletes an installation from a Notification Hub.
     * @param installationId - The installation ID of the installation to delete.
     * @param options - Configuration options for the installation delete operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    deleteInstallation(installationId: string, options?: OperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Gets an Azure Notification Hub installation by the installation ID.
     * @param installationId - The ID of the installation to get.
     * @param options - Configuration options for the get installation operation.
     * @returns The installation that matches the installation ID.
     */
    getInstallation(installationId: string, options?: OperationOptions): Promise<Installation>;
    /**
     * Updates an installation using the JSON-Patch standard in RFC6902.
     * @param installationId - The ID of the installation to update.
     * @param patches - An array of patches following the JSON-Patch standard.
     * @param options - Configuration options for the patch installation operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    updateInstallation(installationId: string, patches: JsonPatch[], options?: OperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Creates a new registration ID.
     * @param options - The options for creating a new registration ID.
     * @returns The newly created registration ID.
     */
    createRegistrationId(options?: OperationOptions): Promise<string>;
    /**
     * Creates a new registration. This method generates a registration ID,
     * which you can subsequently use to retrieve, update, and delete this registration.
     * @param registration - The registration to create.
     * @param options - Options for creating a new registration.
     * @returns The newly created registration description.
     */
    createRegistration(registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
    /**
     * Creates or updates a registration.
     * @param registration - The registration to create or update.
     * @param options - The operation options.
     * @returns The created or updated registration description.
     */
    createOrUpdateRegistration(registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
    /**
     * Updates an existing registration.
     * @param registration - The registration to update.
     * @param options - The operation options.
     * @returns The updated registration description.
     */
    updateRegistration(registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
    /**
     * Gets a registration by the given registration ID.
     * @param registrationId - The ID of the registration to get.
     * @param options - The options for getting a registration by ID.
     * @returns A RegistrationDescription that has the given registration ID.
     */
    getRegistration(registrationId: string, options?: OperationOptions): Promise<RegistrationDescription>;
    /**
     * Gets all registrations for the notification hub with the given query options.
     * @param options - The options for querying the registrations such as $top and $filter.
     * @returns A paged async iterable containing all of the registrations for the notification hub.
     */
    listRegistrations(options?: RegistrationQueryOptions): PagedAsyncIterableIterator<RegistrationDescription>;
    /**
     * Lists all registrations with the matching tag.
     * @param tag - The tag to query for matching registrations.
     * @param options - The query options such as $top.
     * @returns A paged async iterable containing the matching registrations for the notification hub.
     */
    listRegistrationsByTag(tag: string, options?: RegistrationQueryLimitOptions): PagedAsyncIterableIterator<RegistrationDescription>;
    /**
     * Sends a direct push notification to a device with the given push handle.
     * @param pushHandle - The push handle which is the unique identifier for the device.
     * @param notification - The notification to send to the device.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendDirectNotification(pushHandle: PushHandle, notification: Notification, options?: SendOperationOptions): Promise<NotificationHubsMessageResponse>;
    /**
     * Sends push notifications to devices that match the given tags or tag expression.
     * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
     * @param notification - The notification to send to the matching devices.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendNotification(tags: string[] | string, notification: Notification, options?: SendOperationOptions): Promise<NotificationHubsMessageResponse>;
    /**
     * Sends push notifications to all devices on the Notification Hub.
     * @param notification - The notification to send to all devices.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendBroadcastNotification(notification: Notification, options?: SendOperationOptions): Promise<NotificationHubsMessageResponse>;
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
    scheduleNotification(scheduledTime: Date, tags: string[] | string, notification: Notification, options?: OperationOptions): Promise<NotificationHubsMessageResponse>;
    /**
     * Schedules a push notification to all devices registered on the Notification Hub.
     * NOTE: This is only available in Standard SKU Azure Notification Hubs.
     * @param scheduledTime - The Date to send the push notification.
     * @param notification - The notification to send to the matching devices.
     * @param options - Configuration options for the direct send operation which can contain custom headers
     * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    scheduleBroadcastNotification(scheduledTime: Date, notification: Notification, options?: OperationOptions): Promise<NotificationHubsMessageResponse>;
    /**
     * Cancels the scheduled notification with the given notification ID.
     * @param notificationId - The notification ID from the scheduled notification.
     * @param options - The operation options.
     * @returns A notification hub response with correlation ID and tracking ID.
     */
    cancelScheduledNotification(notificationId: string, options?: OperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
     * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
     * @param options - The options for getting the push notification feedback container URL.
     * @returns The URL of the Azure Storage Container containing the feedback data.
     */
    getFeedbackContainerUrl(options?: OperationOptions): Promise<string>;
    /**
     * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
     * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
     * @param notificationId - The notification ID returned from the send operation.
     * @param options - The operation options.
     * @returns The results of the send operation.
     */
    getNotificationOutcomeDetails(notificationId: string, options?: OperationOptions): Promise<NotificationDetails>;
    /**
     * Gets a Notification Hub Job by the ID.
     * @param jobId - The Notification Hub Job ID.
     * @param options - The operation options.
     * @returns The Notification Hub Job with the matching ID.
     */
    getNotificationHubJob(jobId: string, options?: OperationOptions): Promise<NotificationHubJob>;
    /**
     * Submits a Notification Hub Job.  Note this is available to Standard SKU namespace and above.
     * @param job - The notification hub job to submit.
     * @param options - The operation options.
     * @returns The notification hub job details including job ID and status.
     */
    submitNotificationHubJob(job: NotificationHubJob, options?: OperationOptions): Promise<NotificationHubJob>;
    /**
     * Gets all Notification Hub Jobs for this Notification Hub.
     * @param options - The operation options.
     * @returns An array of all Notification Hub Jobs for this Notification Hub.
     */
    listNotificationHubJobs(options?: OperationOptions): Promise<NotificationHubJob[]>;
}

/**
 * The per platform count per state.
 */
export declare interface NotificationOutcomeCollectionItem {
    /**
     * The state of the notification.
     */
    state: string;
    /**
     * The count of notifications per state.
     */
    count: number;
}

/**
 * Represents the notification outcome states.
 */
export declare type NotificationOutcomeState = "Enqueued" | "DetailedStateAvailable" | "Processing" | "Completed" | "Abandoned" | "Unknown" | "NoTargetFound" | "Cancelled";

/**
 * Represents the types of push channels available for Notification Hubs.
 */
export declare type PushHandle = BrowserPushChannel | string;

/**
 * Describes the types of registration descriptions.
 */
export declare type RegistrationDescription = AdmRegistrationDescription | AdmTemplateRegistrationDescription | AppleRegistrationDescription | AppleTemplateRegistrationDescription | BaiduRegistrationDescription | BaiduTemplateRegistrationDescription | BrowserRegistrationDescription | BrowserTemplateRegistrationDescription | GcmRegistrationDescription | GcmTemplateRegistrationDescription | FcmRegistrationDescription | FcmTemplateRegistrationDescription | MpnsRegistrationDescription | MpnsTemplateRegistrationDescription | WindowsRegistrationDescription | WindowsTemplateRegistrationDescription;

/**
 * Represents a registration description.
 */
export declare interface RegistrationDescriptionCommon {
    /**
     * The registration ID.
     */
    registrationId?: string;
    /**
     * The expiration time of the registration.
     */
    expirationTime?: Date;
    /**
     * The ETag associated with this description.
     */
    etag?: string;
    /**
     * The tags associated with the registration.
     */
    tags?: string[];
    /**
     * A dictionary of push variables associated with property bag.
     */
    pushVariables?: Record<string, string>;
    /**
     * The type of the registration.
     */
    type: RegistrationType;
}

/**
 * Represents query options to include $top support.
 */
export declare interface RegistrationQueryLimitOptions extends OperationOptions {
    /**
     * The $top query member to get a number of records.
     */
    top?: number;
}

/**
 * Represents query options to include both $top and $filter.
 */
export declare interface RegistrationQueryOptions extends RegistrationQueryLimitOptions {
    /**
     * The OData $filter operator query string.
     */
    filter?: string;
}

/**
 * Describes a registration query response with registrations and a continuation token.
 */
export declare interface RegistrationQueryResponse {
    /**
     * The list of registrations.
     */
    registrations: RegistrationDescription[];
    /**
     * A continuation token to get more results.
     */
    continuationToken?: string;
}

/**
 * Represents the types of registration descriptions.
 */
export declare type RegistrationType = "Adm" | "AdmTemplate" | "Apple" | "AppleTemplate" | "Baidu" | "BaiduTemplate" | "Browser" | "BrowserTemplate" | "Gcm" | "GcmTemplate" | "Fcm" | "FcmTemplate" | "Mpns" | "MpnsTemplate" | "Windows" | "WindowsTemplate";

/**
 * Represents the send operation options that can be set.
 */
export declare interface SendOperationOptions extends OperationOptions {
    /**
     * Set to true to enable test send.
     */
    enableTestSend?: boolean;
}

/**
 * Represents a template based push notification.
 */
export declare interface TemplateNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "template";
}

/**
 * Represents the description of a template registration.
 */
export declare interface TemplateRegistrationDescription {
    /**
     * The body template.
     */
    bodyTemplate: string;
    /**
     * The name of the template.
     */
    templateName?: string;
}

/**
 * Represents the types of Windows Badge Glyphs
 */
export declare type WindowsBadgeGlyphType = "none" | "activity" | "alarm" | "alert" | "attention" | "available" | "away" | "busy" | "error" | "newMessage" | "paused" | "playing" | "unavailable";

/**
 * Represents the Windows Badge Message
 */
export declare interface WindowsBadgeNativeMessage {
    /**
     * Either a numeric value or a string value that specifies a predefined badge glyph.
     */
    value: WindowsBadgeGlyphType | number;
}

/**
 * Represents the possible WNS content-types.
 */
export declare type WindowsContentType = "application/xml" | "application/octet-stream";

/**
 * Represents a Windows Notification Services (WNS) based installation.
 */
export declare interface WindowsInstallation extends DeviceTokenInstallation {
    /**
     * The platform for the installation.
     */
    platform: "wns";
}

/**
 * Represents a Windows Notification Services (WNS) push notification.
 */
export declare interface WindowsNotification extends NotificationCommon {
    /**
     * The platform for the push notification.
     */
    platform: "wns";
    /**
     * The content type for the push notification.
     */
    contentType: WindowsContentType;
}

/**
 * Represents a Windows Notification Services (WNS) registration description.
 */
export declare interface WindowsRegistrationDescription extends RegistrationDescriptionCommon {
    /**
     * The channel URI.
     */
    channelUri: string;
    /**
     * The type of the registration.
     */
    type: "Windows";
}

/**
 * Represents a Windows Notification Services (WNS) template registration.
 */
export declare interface WindowsTemplateRegistrationDescription extends Omit<WindowsRegistrationDescription, "type">, TemplateRegistrationDescription {
    /**
     * The WNS headers.
     */
    wnsHeaders?: Record<string, string>;
    /**
     * The type of the registration.
     */
    type: "WindowsTemplate";
}

export { }
