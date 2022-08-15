// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getDateOrUndefined, getFloatOrUndefined, getString, getStringOrUndefined, isDefined, } from "../utils/utils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { serializeToAtomXmlRequest } from "../utils/xmlUtils.js";
/**
 * @internal
 * Serializes a NotificationHubJob into an Atom XML entry.
 * @param entry - The NotificationHubJob to turn into an Atom XML entry.
 * @returns An Atom XML entry containing the notification hub job.
 */
export function serializeNotificationHubJobEntry(entry) {
    const job = {
        Type: entry.type,
        OutputContainerUri: { __cdata: entry.outputContainerUrl },
        ImportFileUri: isDefined(entry.importFileUrl) ? { __cdata: entry.importFileUrl } : undefined,
    };
    const requestObject = serializeToAtomXmlRequest("NotificationHubJob", job);
    return stringifyXML(requestObject, { rootName: "entry", cdataPropName: "__cdata" });
}
/**
 * Parses an Atom XML of an notification hub job entry.
 * @param bodyText - The incoming Atom XML entry to parse into a notification hub job.
 * @returns A parsed NotificationHubJob.
 */
export async function parseNotificationHubJobEntry(bodyText) {
    const xml = await parseXML(bodyText, { includeRoot: true });
    const content = xml.entry.content.NotificationHubJob;
    return createNotificationHubJob(content);
}
/**
 * Parses an Atom XML feed of notification hub jobs.
 * @param bodyText - The incoming Atom XML feed to parse into notification hub jobs.
 * @returns A list of notification hub jobs.
 */
export async function parseNotificationHubJobFeed(bodyText) {
    const xml = await parseXML(bodyText, { includeRoot: true });
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
//# sourceMappingURL=notificationHubJobSerializer.js.map