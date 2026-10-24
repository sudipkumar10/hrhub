"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Suspense, type ReactNode } from "react";

import { deleteUserPlugin } from "@/lib/auth/delete-user-plugin";
import { magicLinkPlugin } from "@/lib/auth/magic-link-plugin";
import { multiSessionPlugin } from "@/lib/auth/multi-session-plugin";
import { organizationPlugin } from "@/lib/auth/organization-plugin";
import { passkeyPlugin } from "@/lib/auth/passkey-plugin";
import { themePlugin } from "@/lib/auth/theme-plugin";
import { usernamePlugin } from "@/lib/auth/username-plugin";
import { authClient } from "@/lib/auth-client";
import { getQueryClient } from "@/lib/query-client";
import { AuthProvider } from "./auth/auth-provider";
import { Toaster } from "./ui/sonner";
import { twoFactorPlugin } from "@/lib/auth/two-factor-plugin";

const normalizeParam = (param: string | string[] | undefined) => {
  const raw = Array.isArray(param) ? param[0] : param;
  if (!raw) return null;
  const decoded = decodeURIComponent(raw);
  return decoded.replace(/^@/, "");
};

function AuthProviderWithParams({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const slug = normalizeParam(params.slug);

  return (
    <AuthProvider
      authClient={authClient}
      redirectTo="/settings/account"
      socialProviders={["google", "github"]}
      emailAndPassword={{ requireEmailVerification: true }}
      navigate={({ to, replace }) =>
        replace ? router.replace(to) : router.push(to)
      }
      plugins={[
        usernamePlugin({
          usernamePrefix: "@",
          localization: { usernamePlaceholder: "username" },
        }),
        magicLinkPlugin(),
        passkeyPlugin(),
        themePlugin({ useTheme }),
        multiSessionPlugin(),
        deleteUserPlugin(),
        organizationPlugin({
          slugPrefix: "@",
          slug,
        }),
        twoFactorPlugin(),
      ]}
      Link={Link}
    >
      {children}
      <Toaster richColors position="top-right" closeButton />
    </AuthProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <AuthProviderWithParams>{children}</AuthProviderWithParams>
      </Suspense>
    </QueryClientProvider>
  );
}
