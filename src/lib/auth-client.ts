import { createAuthClient } from "better-auth/react";
import {
  organizationClient,
  adminClient,
  twoFactorClient,
  magicLinkClient,
  usernameClient,
  multiSessionClient,
} from "better-auth/client/plugins";
import { passkeyClient } from "@better-auth/passkey/client";
import { razorpayClient } from "better-auth-razorpay/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    organizationClient(),
    adminClient(),
    twoFactorClient(),
    magicLinkClient(),
    passkeyClient(),
    usernameClient(),
    multiSessionClient(),
    razorpayClient({ subscription: true }),
  ],
});
