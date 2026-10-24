import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization, admin, twoFactor, magicLink } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";

import db from "./db";
import { sendEmail } from "./email";

export const auth = betterAuth({
  appName: "HR Hub",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  plugins: [
    organization(),
    admin(),
    twoFactor(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        void sendEmail({
          to: email,
          subject: "Your Magic Link",
          text: `Click here to login: ${url}`,
        });
      },
    }),
    passkey(),
  ],
});
