import Link from "next/link";

import { UserButton } from "./auth/user/user-button";
import { Logo } from "./logo";
import { OrganizationSwitcher } from "./auth/organization/organization-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="py-3 px-4 md:px-6 mx-auto justify-between flex items-center">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Logo />
          <h1 className="text-base font-semibold">HR HUB</h1>
        </Link>
        <div className="flex items-center gap-2">
          <OrganizationSwitcher />
          <UserButton size="icon" />
        </div>
      </div>
    </header>
  );
}
