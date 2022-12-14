import { NotificationHubsClientContext } from "./index.js";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RegistrationDescription } from "../models/registration.js";
import { RegistrationQueryOptions } from "../models/options.js";
/**
 * Gets all registrations for the notification hub with the given query options.
 * @param context - The Notification Hubs client.
 * @param options - The options for querying the registrations such as $top and $filter.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export declare function listRegistrations(context: NotificationHubsClientContext, options?: RegistrationQueryOptions): PagedAsyncIterableIterator<RegistrationDescription>;
//# sourceMappingURL=listRegistrations.d.ts.map