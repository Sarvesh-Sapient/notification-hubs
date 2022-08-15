// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortError } from "@azure/abort-controller";
import { delay } from "@azure/core-amqp";
import { isDefined } from "./utils.js";
import { isError } from "@azure/core-util";
import { isRestError } from "@azure/core-rest-pipeline";
const JITTER_FACTOR = 0.08;
function isAbortError(e) {
    if (e instanceof AbortError) {
        return true;
    }
    return isError(e) && e.name === "AbortError";
}
/**
 * Represents the retry delay calculation either fixed or exponential.
 */
export var RetryMode;
(function (RetryMode) {
    /**
     * Fixed interval between retries.
     */
    RetryMode[RetryMode["Fixed"] = 0] = "Fixed";
    /**
     * Exporation interval between retries.
     */
    RetryMode[RetryMode["Exponential"] = 1] = "Exponential";
})(RetryMode = RetryMode || (RetryMode = {}));
/**
 * Creates a set of retry options with defaults.
 * @param options - The options for the retry behavior.
 * @returns The retry options.
 */
export function createRetryOptions(options) {
    return Object.assign({ mode: RetryMode.Fixed, maxRetries: 3, delay: 1000, maxDelay: 1000 * 60 }, options);
}
/**
 * Creates a base retry policy with the incoming calculateRetryDelay method.
 * @param calculateRetryDelay - The retry calculation behavior based upon attempt number and error.
 * @returns A retry policy with the given calculateRetryDelay method.
 */
export function createBaseRetryPolicy(calculateRetryDelay) {
    async function runOperation(operation, signal) {
        let failedAttemptCount = 0;
        while (!(signal === null || signal === void 0 ? void 0 : signal.aborted)) {
            try {
                return await operation(signal);
            }
            catch (err) {
                ++failedAttemptCount;
                const retryDelay = calculateRetryDelay(err, failedAttemptCount);
                if (isDefined(retryDelay)) {
                    await delay(retryDelay, signal);
                }
                else {
                    throw err;
                }
            }
        }
        throw new AbortError("The operation has been aborted");
    }
    return {
        calculateRetryDelay,
        runOperation,
    };
}
/**
 * Creates a retry policy configured with the given retry options.
 * @param options - The retry options including delay, max attempts and backoff behavior.
 * @returns A retry policy configured with the given options.
 */
export function createDefaultRetryPolicy(options) {
    function calculateRetryDelay(error, attempt) {
        var _a;
        if (options.maxRetries <= 0 ||
            options.delay === 0 ||
            options.maxDelay === 0 ||
            attempt > options.maxRetries ||
            !shouldRetryError(error)) {
            return undefined;
        }
        const baseJitterSeconds = (options.delay / 1000) * JITTER_FACTOR;
        let retryDelay;
        if (isRestError(error)) {
            retryDelay = parseRetryAfter((_a = error.response) === null || _a === void 0 ? void 0 : _a.headers.get("retry-after"));
        }
        if (!isDefined(retryDelay)) {
            if (options.mode === RetryMode.Exponential) {
                retryDelay = calculateExponentialDelay(attempt, options.delay / 1000, baseJitterSeconds);
            }
            else {
                retryDelay = calculateFixedDelay(options.delay / 1000, baseJitterSeconds);
            }
        }
        if (options.maxDelay < retryDelay) {
            return options.maxDelay;
        }
        return retryDelay;
    }
    return createBaseRetryPolicy(calculateRetryDelay);
}
function parseRetryAfter(headerValue) {
    if (!isDefined(headerValue)) {
        return undefined;
    }
    // Retry-After is defined in seconds
    const number = new Number(headerValue);
    if (Number.isFinite(number) && number >= 0) {
        return number.valueOf() * 1000;
    }
    // Retry-After is defined as a Date
    const retryDate = Date.parse(headerValue);
    if (Number.isNaN(retryDate)) {
        return undefined;
    }
    const diff = retryDate - Date.now();
    return diff <= 0 ? undefined : diff;
}
function shouldRetryError(e) {
    if (isAbortError(e)) {
        return false;
    }
    if (isRestError(e)) {
        // Throttle and legacy throttle
        if ((e === null || e === void 0 ? void 0 : e.statusCode) === 429 || (e === null || e === void 0 ? void 0 : e.statusCode) === 403) {
            return true;
        }
        // Network hiccups
        if ((e === null || e === void 0 ? void 0 : e.statusCode) === 500 ||
            (e === null || e === void 0 ? void 0 : e.statusCode) === 503 ||
            (e === null || e === void 0 ? void 0 : e.statusCode) === 504 ||
            (e === null || e === void 0 ? void 0 : e.statusCode) === 408) {
            return true;
        }
    }
    return false;
}
function calculateFixedDelay(baseDelaySeconds, baseJitterSeconds) {
    return (baseDelaySeconds + Math.random() * baseJitterSeconds) * 1000;
}
function calculateExponentialDelay(attemptCount, baseDelaySeconds, baseJitterSeconds) {
    return (Math.pow(2, attemptCount) * baseDelaySeconds + Math.random() * baseJitterSeconds) * 1000;
}
//# sourceMappingURL=retryPolicy.js.map