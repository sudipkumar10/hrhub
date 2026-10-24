import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization, admin, twoFactor, magicLink } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";

import db from "./db";

export const auth = betterAuth({
  appName: "HR Hub",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    organization(),
    admin(),
    twoFactor(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log(`Magic link for ${email}: ${url}`);
      },
    }),
    passkey(),
  ],
});
