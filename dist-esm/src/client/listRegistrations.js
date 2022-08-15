// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { createRequest, sendRequest } from "./internal/_client.js";
import { registrationDescriptionParser } from "../serializers/registrationSerializer.js";
import { tracingClient } from "../utils/tracing.js";
/**
 * Gets all registrations for the notification hub with the given query options.
 * @param context - The Notification Hubs client.
 * @param options - The options for querying the registrations such as $top and $filter.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export function listRegistrations(context, options = {}) {
    const { span, updatedOptions } = tracingClient.startSpan("NotificationHubsClientContext-listRegistrations", options);
    try {
        const iter = listRegistrationsAll(context, updatedOptions);
        return {
            next() {
                return iter.next();
            },
            [Symbol.asyncIterator]() {
                return this;
            },
            byPage: () => {
                return listRegistrationPagingPage(context, options);
            },
        };
    }
    catch (e) {
        span.setStatus({ status: "error", error: e });
        throw e;
    }
    finally {
        span.end();
    }
}
function listRegistrationsAll(context, options) {
    return __asyncGenerator(this, arguments, function* listRegistrationsAll_1() {
        var e_1, _a;
        try {
            for (var _b = __asyncValues(listRegistrationPagingPage(context, options)), _c; _c = yield __await(_b.next()), !_c.done;) {
                const page = _c.value;
                yield __await(yield* __asyncDelegator(__asyncValues(page)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function listRegistrationPagingPage(context, options) {
    return __asyncGenerator(this, arguments, function* listRegistrationPagingPage_1() {
        let result = yield __await(_listRegistrations(context, options));
        yield yield __await(result.registrations || []);
        let continuationToken = result.continuationToken;
        while (continuationToken) {
            result = yield __await(_listRegistrations(context, options, continuationToken));
            continuationToken = result.continuationToken;
            yield yield __await(result.registrations || []);
        }
    });
}
async function _listRegistrations(context, options, continuationToken) {
    const endpoint = context.requestUrl();
    endpoint.pathname += "/registrations";
    if (options.top !== undefined) {
        endpoint.searchParams.set("$top", `${options.top}`);
    }
    if (options.filter !== undefined) {
        endpoint.searchParams.set("$filter", options.filter);
    }
    if (continuationToken !== undefined) {
        endpoint.searchParams.set("continuationtoken", continuationToken);
    }
    const headers = context.createHeaders();
    const request = createRequest(endpoint, "GET", headers, options);
    const response = await sendRequest(context, request, 200);
    const registrations = await registrationDescriptionParser.parseRegistrationFeed(response.bodyAsText);
    const nextToken = response.headers.get("x-ms-continuationtoken");
    return {
        registrations,
        continuationToken: nextToken,
    };
}
//# sourceMappingURL=listRegistrations.js.map