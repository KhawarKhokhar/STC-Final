// src/lib/cloudinary.ts
// Client-side (browser) Cloudinary helper for UNSIGNED uploads.

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
};

function getCloudName(): string {
  const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!name) {
    throw new Error(
      "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env (Cloudinary cloud name)."
    );
  }
  return name;
}

function getUploadPreset(): string {
  // User provided preset name: dozgkynyw
  return process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "dozgkynyw";
}

/**
 * Upload an image file to Cloudinary using an unsigned upload preset.
 * Returns (secure_url, public_id).
 */
export async function uploadImageUnsigned(file: File): Promise<CloudinaryUploadResult> {
  const cloudName = getCloudName();
  const preset = getUploadPreset();

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);

  const res = await fetch(url, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Cloudinary upload failed (${res.status}). ${txt}`);
  }
  return (await res.json()) as CloudinaryUploadResult;
}
