"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { Logo } from "@/components/logo";

const ActionButton = ({ auth }: { auth: boolean }) => {
  return auth ? (
    <Link
      className="cursor-pointer items-center gap-2 rounded-full border-2 border-white/48 bg-white/48 px-5 py-2 text-white uppercase backdrop-blur-2xl"
      href="/dashboard"
    >
      Dashboard
    </Link>
  ) : (
    <button
      className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-white/48 bg-white/48 px-5 py-2 text-white uppercase backdrop-blur-2xl"
      onClick={() => signIn("", { redirectTo: "/dashboard" })}
    >
      <span className="font-heading">Sign in</span>
      <HiOutlineArrowCircleRight />
    </button>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="font-semibold opacity-60 hover:opacity-100">
      {children}
    </Link>
  );
};

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="group sticky top-0 z-10">
      <div className="container flex items-center justify-between rounded-b-3xl p-4 backdrop-blur-3xl md:py-6">
        <Link href="/" title="Sev">
          <Logo />
        </Link>

        <div className="flex items-center gap-8">
          <div className="font-heading gap-6 text-zinc-50 max-sm:hidden md:flex">
            <NavLink href="#features"># Features</NavLink>
            <NavLink href="#statistics"># Statistics</NavLink>
          </div>

          <ActionButton auth={isLoggedIn} />
        </div>
      </div>
    </header>
  );
}
