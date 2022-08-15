import { AdmRegistrationDescription, AdmTemplateRegistrationDescription, AppleRegistrationDescription, AppleTemplateRegistrationDescription, BaiduRegistrationDescription, BaiduTemplateRegistrationDescription, BrowserRegistrationDescription, BrowserTemplateRegistrationDescription, FcmRegistrationDescription, FcmTemplateRegistrationDescription, GcmRegistrationDescription, GcmTemplateRegistrationDescription, MpnsRegistrationDescription, MpnsTemplateRegistrationDescription, RegistrationDescription, WindowsRegistrationDescription, WindowsTemplateRegistrationDescription } from "../models/registration.js";
/**
 * Represents a registration description parser from the incoming XML.
 */
export interface RegistrationDescriptionParser {
    /**
     * @internal
     * Creates a registration type from the incoming entry.
     */
    parseRegistrationEntry: (bodyText: string) => Promise<RegistrationDescription>;
    /**
     * @internal
     * Creates a list of registrations from an incoming ATOM XML Feed.
     */
    parseRegistrationFeed: (bodyText: string) => Promise<RegistrationDescription[]>;
    /**
     * @internal
     * Creates an Amazon Device Messaging (ADM) registration description from the incoming parsed XML.
     */
    createAdmRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AdmRegistrationDescription;
    /**
     * @internal
     * Creates an Amazon Device Messaging (ADM) template registration description from the incoming parsed XML.
     */
    createAdmTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AdmTemplateRegistrationDescription;
    /**
     * @internal
     * Creates an Apple Platform Notification Services (APNs) registration description from the incoming parsed XML.
     */
    createAppleRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AppleRegistrationDescription;
    /**
     * @internal
     * Creates an Apple Platform Notification Services (APNs) template registration description from the incoming parsed XML.
     */
    createAppleTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => AppleTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Baidu registration description from the incoming parsed XML.
     */
    createBaiduRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BaiduRegistrationDescription;
    /**
     * @internal
     * Creates a Baidu template registration description from the incoming parsed XML.
     */
    createBaiduTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BaiduTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Web Push registration description from the incoming parsed XML.
     */
    createBrowserRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BrowserRegistrationDescription;
    /**
     * @internal
     * Creates a Web Push template registration description from the incoming parsed XML.
     */
    createBrowserTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => BrowserTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Google Cloud Messaging (GCM) registration description from the incoming parsed XML.
     */
    createGcmRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => GcmRegistrationDescription;
    /**
     * @internal
     * Creates a Google Cloud Messaging (GCM) template registration description from the incoming parsed XML.
     */
    createGcmTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => GcmTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Firebase Cloud Messaging (GCM) registration description from the incoming parsed XML.
     */
    createFcmRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => FcmRegistrationDescription;
    /**
     * @internal
     * Creates a Firebase Cloud Messaging (GCM) template registration description from the incoming parsed XML.
     */
    createFcmTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => FcmTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Microsoft Phone Notification Services (MPNS) registration description from the incoming parsed XML.
     */
    createMpnsRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => MpnsRegistrationDescription;
    /**
     * @internal
     * Creates a Microsoft Phone Notification Services (MPNS) template registration description from the incoming parsed XML.
     */
    createMpnsTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => MpnsTemplateRegistrationDescription;
    /**
     * @internal
     * Creates a Windows Notification Services (WNS) registration description from the incoming parsed XML.
     */
    createWindowsRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => WindowsRegistrationDescription;
    /**
     * @internal
     * Creates a Windows Notification Services (WNS) template registration description from the incoming parsed XML.
     */
    createWindowsTemplateRegistrationDescription: (rawRegistrationDescription: Record<string, any>) => WindowsTemplateRegistrationDescription;
}
export declare const registrationDescriptionParser: RegistrationDescriptionParser;
/**
 * @internal
 * Represents a serializer for all registration descriptions.
 */
export interface RegistrationDescriptionSerializer {
    /**
     * @internal
     * Serializes a registration description into an ATOM XML string.
     */
    serializeRegistrationDescription(description: RegistrationDescription): string;
    /**
     * @internal
     * Serializes an Amazon Device Messaging (ADM) registration description into an XML object for serialization.
     */
    serializeAdmRegistrationDescription(description: Omit<AdmRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes an Amazon Device Messaging (ADM) template registration description into an XML object for serialization.
     */
    serializeAdmTemplateRegistrationDescription(description: Omit<AdmTemplateRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes an Apple registration description into an XML object for serialization.
     */
    serializeAppleRegistrationDescription(description: Omit<AppleRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes an Apple template registration description into an XML object for serialization.
     */
    serializeAppleTemplateRegistrationDescription(description: Omit<AppleRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Baidu registration description into an XML object for serialization.
     */
    serializeBaiduRegistrationDescription(description: Omit<BaiduRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Baidu template registration description into an XML object for serialization.
     */
    serializeBaiduTemplateRegistrationDescription(description: Omit<BaiduTemplateRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Web Push registration description into an XML object for serialization.
     */
    serializeBrowserRegistrationDescription(description: Omit<BrowserRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Web Push template registration description into an XML object for serialization.
     */
    serializeBrowserTemplateRegistrationDescription(description: Omit<BrowserTemplateRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Google Cloud Messaging (GCM) registration description into an XML object for serialization.
     */
    serializeGcmRegistrationDescription(description: Omit<GcmRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Google Cloud Messaging (GCM) template registration description into an XML object for serialization.
     */
    serializeGcmTemplateRegistrationDescription(description: Omit<GcmTemplateRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Firebase registration description into an XML object for serialization.
     */
    serializeFcmRegistrationDescription(description: Omit<FcmRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Firebase template registration description into an XML object for serialization.
     */
    serializeFcmTemplateRegistrationDescription(description: Omit<FcmRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Windows Phone registration description into an XML object for serialization.
     */
    serializeMpnsRegistrationDescription(description: Omit<MpnsRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Windows Phone template registration description into an XML object for serialization.
     */
    serializeMpnsTemplateRegistrationDescription(description: Omit<MpnsTemplateRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Windows Notification Services (WNS) registration description into an XML object for serialization.
     */
    serializeWindowsRegistrationDescription(description: Omit<WindowsRegistrationDescription, "type">): Record<string, any>;
    /**
     * @internal
     * Serializes a Windows Notification Services (WNS) template registration description into an XML object for serialization.
     */
    serializeWindowsTemplateRegistrationDescription(description: Omit<WindowsTemplateRegistrationDescription, "type">): Record<string, any>;
}
/**
 * Represents a RegistrationDescription serializer.
 */
export declare const registrationDescriptionSerializer: RegistrationDescriptionSerializer;
//# sourceMappingURL=registrationSerializer.d.ts.map