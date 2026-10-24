import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  organization,
  admin,
  twoFactor,
  magicLink,
  username,
  multiSession,
} from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";

import db from "./db";
import { sendEmail } from "./email";

export const auth = betterAuth({
  appName: "HR Hub",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    organization(),
    admin(),
    username(),
    multiSession(),
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
    twoFactor({
      issuer: "HR Hub",
      otpOptions: {
        sendOTP: async ({ user, otp }) => {
          void sendEmail({
            to: user.email,
            subject: "Your 2FA Code",
            text: `Your verification code is: ${otp}`,
          });
        },
      },
    }),
  ],
});
