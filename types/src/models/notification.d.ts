/**
 * Represents a notification hub.
 */
export interface NotificationCommon {
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
 * Represents a JSON notification hub.
 */
export interface JsonNotification extends NotificationCommon {
    /**
     * The content type for the push notification.
     */
    contentType: "application/json;charset=utf-8";
}
/**
 * Represents an Apple APNs push notification.
 */
export interface AppleNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "apple";
}
/**
 * Creates a notification to send to an Apple device.
 * @param notification - A partial message used to create a message for Apple.
 * @returns A newly created Apple.
 */
export declare function createAppleNotification(notification: Omit<AppleNotification, "platform" | "contentType">): AppleNotification;
/**
 * Represents an Amazon Device Messaging (ADM) push notification.
 */
export interface AdmNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "adm";
}
/**
 * Creates a notification to send to an Amazon Device Messaging device.
 * @param notification - A partial message used to create a message for Amazon Device Messaging.
 * @returns A newly created Amazon Device Messaging.
 */
export declare function createAdmNotification(notification: Omit<AdmNotification, "platform" | "contentType">): AdmNotification;
/**
 * Represents a Baidu push notification.
 */
export interface BaiduNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "baidu";
}
/**
 * Creates a notification to send to a Baidu registered device.
 * @param notification - A partial message used to create a message for Baidu.
 * @returns A newly created Baidu.
 */
export declare function createBaiduNotification(notification: Omit<BaiduNotification, "platform" | "contentType">): BaiduNotification;
/**
 * Represents a Browser push notification.
 */
export interface BrowserNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "browser";
}
/**
 * Creates a notification to send to a browser.
 * @param notification - A partial message used to create a message for a browser.
 * @returns A newly created Web Push browser.
 */
export declare function createBrowserNotification(notification: Omit<BrowserNotification, "platform" | "contentType">): BrowserNotification;
/**
 * Represents a Firebase legacy HTTP push notification.
 */
export interface FirebaseLegacyNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "gcm";
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
export declare function createFirebaseLegacyNotification(notification: Omit<FirebaseLegacyNotification, "platform" | "contentType">): FirebaseLegacyNotification;
/**
 * Represents a template based push notification.
 */
export interface TemplateNotification extends JsonNotification {
    /**
     * The platform for the push notification.
     */
    platform: "template";
}
/**
 * Creates a notification to send to Firebase.
 * @param notification - A partial message used to create a message for Firebase.
 * @returns A newly created Firebase.
 */
export declare function createTemplateNotification(notification: Omit<TemplateNotification, "platform" | "contentType">): TemplateNotification;
/**
 * Represents the possible WNS content-types.
 */
export declare type WindowsContentType = "application/xml" | "application/octet-stream";
/**
 * Represents a Windows Notification Services (WNS) push notification.
 */
export interface WindowsNotification extends NotificationCommon {
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
 * Creates a badge message to send to WNS.
 * @param notification - A partial message used to create a badge message for WNS.
 * @returns A newly created WNS badge.
 */
export declare function createWindowsBadgeNotification(notification: Omit<WindowsNotification, "platform" | "contentType">): WindowsNotification;
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
 * Creates a notification to send to WNS in wns/raw format..
 * @param notification - A partial message used to create a message for WNS in XML format.
 * @returns A newly created WNS message using XML.
 */
export declare function createWindowsRawNotification(notification: Omit<WindowsNotification, "platform" | "contentType">): WindowsNotification;
/**
 * Represents the possible push notification messages types.
 */
export declare type Notification = AppleNotification | AdmNotification | BaiduNotification | BrowserNotification | FirebaseLegacyNotification | WindowsNotification | TemplateNotification;
//# sourceMappingURL=notification.d.ts.map