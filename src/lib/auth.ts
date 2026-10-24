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
import { razorpay } from "better-auth-razorpay";
import Razorpay from "razorpay";

import db from "./db";
import { sendEmail } from "./email";

const razorpayClient = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

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
    organization({
      async sendInvitationEmail(data) {
        const inviteLink = `http://localhost:3000/auth/accept-invitation?invitationId=${data.id}`;
        await sendEmail({
          to: data.email,
          subject: `You have been invited to join ${data.organization.name}`,
          text: `Click the link to join: ${inviteLink}`,
        });
      },
    }),
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

    razorpay({
      razorpayClient,
      razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            planId: process.env.RAZORPAY_PLAN_PRO!,
            name: "pro",
            totalCount: 12,
          },
          {
            planId: process.env.RAZORPAY_PLAN_ENTERPRISE!,
            name: "enterprise",
            totalCount: 12,
          },
        ],
      },
      organization: {
        enabled: true,
      },
    }),
  ],
});
