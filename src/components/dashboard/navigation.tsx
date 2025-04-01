import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  ChartNoAxesColumnIcon,
  LayoutDashboardIcon,
  LinkIcon,
  SettingsIcon,
} from "lucide-react";
import { Logo } from "../logo";
import VersionInfo from "./version-info";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const NavLink = ({ href, icon, text }: NavLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        className={buttonVariants({ variant: "ghost", size: "lg" })}
      >
        {icon}
        <span className="max-md:hidden">{text}</span>
      </Link>
    </li>
  );
};

export default function DashboardNavigation() {
  return (
    <nav className="z-10 w-full max-md:fixed max-md:bottom-0 max-md:backdrop-blur-3xl md:sticky md:top-0 md:flex md:h-[100dvh] md:max-w-56 md:flex-col md:justify-between md:border-r md:p-4">
      <div className="max-md:container">
        <Link className="max-md:hidden" href="/dashboard" title="Sev Dashboard">
          <Logo />
        </Link>
        <ul className="flex items-center py-4 max-md:justify-around md:flex-col md:items-start">
          <NavLink
            href="/dashboard"
            icon={<LayoutDashboardIcon />}
            text="Dashboard"
          />
          <NavLink href="/dashboard/links" icon={<LinkIcon />} text="Links" />
          <NavLink
            href="/dashboard/analytics"
            icon={<ChartNoAxesColumnIcon />}
            text="Analytics"
          />
          <NavLink
            href="/dashboard/settings"
            icon={<SettingsIcon />}
            text="Settings"
          />
        </ul>
        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full max-md:hidden",
          )}
          href="/dashboard/links"
        >
          Shorten
        </Link>
      </div>

      <footer className="mt-auto border-t pt-4 max-md:hidden">
        <div className="container">
          <p className="text-muted-foreground mb-2 text-sm font-semibold uppercase">
            Sev - &copy; {new Date().getFullYear()}
          </p>
          <VersionInfo />
        </div>
      </footer>
    </nav>
  );
}
