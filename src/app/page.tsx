import "@fontsource-variable/kode-mono";
import { Header, Hero, Feature, Statistics, Footer } from "@/components/home";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const session = await auth();
  const [user, link, click] = await Promise.all([
    prisma.user.count(),
    prisma.links.count(),
    prisma.links.aggregate({
      _sum: { visitor_count: true },
    }),
  ]);
  const data = {
    user,
    link,
    click: click._sum.visitor_count || 0,
  };

  return (
    <body className="bg-[#03001C]">
      <Header isLoggedIn={!!session} />

      <main className="mt-12 space-y-16">
        <Hero />
        <Feature />
        <Statistics data={data} />
      </main>

      <Footer />

      <Toaster />
    </body>
  );
}
