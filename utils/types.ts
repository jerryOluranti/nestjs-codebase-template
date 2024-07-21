import * as z from "zod";

export type Nullable<T> = T | null;

export type AppRoles = "USER" | "DRIVER" | "ADMIN";

export type AppMetadata = {};

export enum APIError {
    NOT_FOUND = "data not found",
    UNAUTHORIZED = "user does not have sufficient permission for this operation",
    EMAIL_NOT_VERIFIED = "user email not verified",
    PHONE_NOT_VERIFIED = "phone number not verified",
    USER_NOT_EXIST = "requested user does not exist",
    WITHDRAWAL_PROCESSING_ERROR = "error processing withdrawal",
    WITHDRAWAL_AMOUNT_INSUFFICIENT = "requested amount more than available earnings",
    NO_WITHDRAWAL_EARNINGS = "no withdrawal earnings available",
    TRANSACTION_NOT_FOUND = "could not find referenced payment details",
    TRANSACTION_USED = "the referenced payment is associated with an existing transaction",
    TRANSACTION_PAYMENT_UNSUCCESSFUL = "referenced payment was unsuccessful",
    INSUFFICIENT_AMOUNT = "insufficient amount paid for this service",
    INVALID_OPERATION = "invalid operation performed",
    PAYMENT_SERVICE_ERROR = "unable to complete payment due to error",
    PAYMENT_UNABLE_TO_VERIFY = "unable to verify payment",
    PAYMENT_UNSUCCESSFUL = "payment unsuccessful",
}
