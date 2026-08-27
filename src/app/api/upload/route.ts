import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { filename, contentType, userId } = await req.json();

    if (!filename || !contentType || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const S3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
      },
    });

    const bucketName = process.env.NEXT_PUBLIC_CLOUDFLARE_BUCKET_NAME as string;
    
    // Create a unique object key (e.g. properties/uid123/123456789_image.jpg)
    const objectKey = `properties/${userId}/${Date.now()}_${filename}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      ContentType: contentType,
    });

    // The presigned URL expires in 15 minutes
    const presignedUrl = await getSignedUrl(S3, command, { expiresIn: 900 });
    
    const publicUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_PUBLIC_URL}/${objectKey}`;

    return NextResponse.json({
      presignedUrl,
      publicUrl,
      objectKey
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ error: "Error generating presigned URL" }, { status: 500 });
  }
}
