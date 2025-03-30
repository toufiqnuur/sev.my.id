import { z } from "zod";
import { auth } from "@/lib/auth";
import { customAlphabet } from "nanoid";
import { prisma } from "@/lib/prisma";
import { formatResponse } from "@/lib/response";
import { routeErrorHandler } from "@/lib/error-handler";
import { addDays } from "date-fns";

const generateSlug = () => {
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
  );
  const slug = nanoid();
  return slug;
};

export async function POST(req: Request) {
  const session = await auth();

  const schema = z.object({
    originalUrl: z.string().url(),
    shortUrl: z.string().optional(),
    expirationTime: z
      .string()
      .refine(
        (value) => {
          const parsedDate = new Date(value);
          return !isNaN(parsedDate.getTime());
        },
        { message: "Invalid ISO string format for expirationTime" },
      )
      .optional(),
    password: z.string().optional(),
  });

  try {
    const reqJson = await req.json();
    const reqBody = schema.parse(reqJson);

    if (!session || !session.user) {
      reqBody.expirationTime = addDays(new Date(), 7).toISOString();
      reqBody.shortUrl = generateSlug();
    }

    reqBody.shortUrl = reqBody.shortUrl || generateSlug();

    const data = await prisma.links.create({
      data: {
        original_url: reqBody.originalUrl,
        short_url: reqBody.shortUrl || null,
        expiration_time: reqBody.expirationTime || null,
        password: reqBody.password || null,
        user_id: session?.user?.id || null,
      },
    });

    return formatResponse(data, "Link created successfully", 201);
  } catch (error) {
    return routeErrorHandler(error);
  }
}
