// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getDateOrUndefined, getInteger, getStringOrUndefined, isDefined } from "../utils/utils.js";
import { parseXML } from "@azure/core-xml";
/**
 * @internal
 * Parses a NotificationDetails from incoming XML.
 */
export async function parseNotificationDetails(bodyText) {
    const xml = await parseXML(bodyText, {
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
//# sourceMappingURL=notificationDetailsSerializer.js.map