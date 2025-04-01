import {
  LifeBuoy,
  LinkIcon,
  LockIcon,
  MousePointerClickIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface OverviewCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function OverviewCard({ title, value, icon }: OverviewCardProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

interface ShortcutLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

function ShortcutLink({ href, icon, text }: ShortcutLinkProps) {
  return (
    <Link href={href}>
      <Card>
        <CardContent className="flex items-center gap-3">
          {icon}
          {text}
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function DashboardPage() {
  const session = await auth();

  const [totalLinks, totalVisitors, totalLinksWithPassword] = await Promise.all(
    [
      prisma.links.count({ where: { user_id: session?.user?.id } }),
      prisma.links.aggregate({
        where: { user_id: session?.user?.id },
        _sum: { visitor_count: true },
      }),
      prisma.links.count({
        where: {
          user_id: session?.user?.id,
          password: { not: null },
        },
      }),
    ],
  );

  return (
    <main className="py-4 max-md:mb-18 lg:mt-8">
      <div className="container">
        <h1 className="text-muted-foreground text-xl font-semibold">
          Quick Access
        </h1>
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ShortcutLink
            href="/dashboard/links"
            icon={<LinkIcon size={20} />}
            text="Short new link"
          />
          <ShortcutLink
            href="#"
            icon={<LifeBuoy size={20} />}
            text="Help & Support"
          />
        </div>

        <h1 className="text-muted-foreground mt-6 text-xl font-semibold">
          Analytics
        </h1>
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <OverviewCard
            title="Total Links"
            value={totalLinks.toString()}
            icon={<LinkIcon size={20} />}
          />
          <OverviewCard
            title="Engagements"
            value={totalVisitors._sum.visitor_count?.toString() ?? "0"}
            icon={<MousePointerClickIcon size={20} />}
          />
          <OverviewCard
            title="Protected Links"
            value={totalLinksWithPassword.toString()}
            icon={<LockIcon size={20} />}
          />
        </div>
      </div>
    </main>
  );
}
