"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paypalClient = paypalClient;
const checkout_server_sdk_1 = __importDefault(require("@paypal/checkout-server-sdk"));
function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID || "";
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";
    if (process.env.NODE_ENV === "production") {
        return new checkout_server_sdk_1.default.core.LiveEnvironment(clientId, clientSecret);
    }
    else {
        return new checkout_server_sdk_1.default.core.SandboxEnvironment(clientId, clientSecret);
    }
}
function paypalClient() {
    return new checkout_server_sdk_1.default.core.PayPalHttpClient(environment());
}
