import { Logo } from "@/components/logo";
import "@fontsource-variable/kode-mono";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="bg-[#03001C]">
      <header className="group sticky top-0 z-10">
        <div className="container flex items-center justify-between rounded-b-3xl p-4 backdrop-blur-3xl md:py-6">
          <Link href="/" title="Sev">
            <Logo />
          </Link>
          <div className="flex items-center gap-8">
            <button className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-white/48 bg-white/48 px-5 py-2 text-white uppercase backdrop-blur-2xl">
              <span className="font-heading">Make your own</span>
            </button>
          </div>
        </div>
      </header>

      {children}
    </body>
  );
}
