import NotFound from "@/components/not-found";
import ExpiredView from "@/components/shorten/expired";
import ProtectedView from "@/components/shorten/protected";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/types/Protected";
import { redirect } from "next/navigation";

interface ShortenPageProps {
  params: Promise<{ short: string }>;
}

export default async function ShortenPage({ params }: ShortenPageProps) {
  const { short } = await params;
  const data = await prisma.links.findUnique({
    where: {
      short_url: short,
    },
  });

  async function verifyPassword(
    prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> {
    "use server";

    const password = formData.get("password") as string;
    const data = await prisma.links.findUnique({
      where: {
        short_url: short,
      },
    });

    if (data?.password === password) {
      return {
        success: true,
        message: "Password is correct",
        data: data.original_url,
      };
    } else {
      return {
        success: false,
        message: "Password is incorrect",
        data: null,
      };
    }
  }

  if (!data) {
    return <NotFound />;
  }

  const isExpiredLink =
    data.expiration_time && data.expiration_time < new Date();
  if (isExpiredLink) {
    return <ExpiredView />;
  }

  if (data.password) {
    return <ProtectedView submitAction={verifyPassword} />;
  }

  return redirect(data && data.original_url);
}
