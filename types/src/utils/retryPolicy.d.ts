import { AbortSignal } from "@azure/abort-controller";
/**
 * Represents the retry delay calculation either fixed or exponential.
 */
export declare enum RetryMode {
    /**
     * Fixed interval between retries.
     */
    Fixed = 0,
    /**
     * Exporation interval between retries.
     */
    Exponential = 1
}
/**
 * Represents the retry options for an operation.
 */
export interface RetryOptions {
    /**
     * The retry mode.
     */
    mode: RetryMode;
    /**
     * The number of maximum retries.
     */
    maxRetries: number;
    /**
     * The delay in milliseconds between retries.
     */
    delay: number;
    /**
     * The maximum delay in milliseconds between retries.
     */
    maxDelay: number;
}
/**
 * Creates a set of retry options with defaults.
 * @param options - The options for the retry behavior.
 * @returns The retry options.
 */
export declare function createRetryOptions(options?: Partial<RetryOptions>): RetryOptions;
/**
 * Represents a retry policy with a run operation and define a retry time calculation.
 */
export interface RetryPolicy {
    /**
     * Calculates the retry delay based upon the error and retry attempt.
     * @param error - The error from the operation.
     * @param attempt - The retry attempt number.
     */
    calculateRetryDelay: (error: unknown, attempt: number) => number | undefined;
    /**
     * Runs an operation and retries based upon the retry policy.
     * @param operation - The operation to run and retry if necessary.
     * @param signal - An AbortSignal to check for cancellation.
     * @returns The result of the operation.
     */
    runOperation<TResult>(operation: (signal?: AbortSignal) => Promise<TResult>, signal?: AbortSignal): Promise<TResult>;
}
/**
 * Creates a base retry policy with the incoming calculateRetryDelay method.
 * @param calculateRetryDelay - The retry calculation behavior based upon attempt number and error.
 * @returns A retry policy with the given calculateRetryDelay method.
 */
export declare function createBaseRetryPolicy(calculateRetryDelay: (error: unknown, attempt: number) => number | undefined): RetryPolicy;
/**
 * Creates a retry policy configured with the given retry options.
 * @param options - The retry options including delay, max attempts and backoff behavior.
 * @returns A retry policy configured with the given options.
 */
export declare function createDefaultRetryPolicy(options: RetryOptions): RetryPolicy;
//# sourceMappingURL=retryPolicy.d.ts.map