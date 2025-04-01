"use client";

import Link from "next/link";
import { Logo } from "../logo";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

function generateAvatarFallback(name: string, email: string): string {
  if (name) {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    return initials.slice(0, 2);
  }

  if (email) {
    const emailInitial = email[0].toUpperCase();
    return emailInitial;
  }

  return "NA";
}

export default function DashboardHeader() {
  const pathname = usePathname();
  const session = useSession();

  const { image, name, email } = session.data?.user || {};
  const userAvatar = image ?? "";
  const userEmail = email ?? "";
  const userName = name ?? "";
  const avatarFallback = generateAvatarFallback(userName, userEmail);

  return (
    <header className="sticky top-0 z-10 border-b backdrop-blur-3xl">
      <div className="container flex items-center justify-between py-4">
        <div className="md:hidden">
          <Logo />
        </div>
        <Link
          href={pathname}
          className="text-2xl font-semibold capitalize max-md:hidden"
        >
          {pathname.split("/").at(-1)}
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  className="size-16"
                  src={userAvatar}
                  alt={userName}
                />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar>
                    <AvatarImage src={userAvatar} alt="Shadcn" />
                    <AvatarFallback className="rounded-lg">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userName}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {userEmail}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOutIcon />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
