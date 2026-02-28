import { auth } from "@clerk/nextjs/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as HandleUploadBody;

    const response = await handleUpload({
      body,
        request: req,
      onBeforeGenerateToken: async () => {
        const { userId } = await auth();
        if (!userId) {
          throw new Error("Unauthorized");
        }

        return {
          allowedContentTypes: [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp",
          ],
          maximumSizeInBytes: 50 * 1024 * 1024,
          addRandomSuffix: true,
          metadata: { userId },
          tokenPayload: JSON.stringify({ userId }),
        };
      },

      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = tokenPayload ? JSON.parse(tokenPayload) : null;
        const userId = payload?.userId;

        console.log("Upload completed:", {
          url: blob.url,
          userId,
        });
      },
      token:process.env.BLOB_READ_WRITE_TOKEN ,
    });

    return NextResponse.json(response);

  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 200 }
    );
  }
}