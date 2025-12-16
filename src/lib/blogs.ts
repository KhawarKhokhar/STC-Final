// src/lib/blogs.ts
// Realtime Database helpers for Blog CRUD + listing.
"use client";

import {
  get,
  ref,
  push,
  set,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { rdb } from "@/lib/firebase";

export type BlogSection = {
  heading: string;
  body: string; // HTML string from editor
  imageUrl?: string;
  imagePublicId?: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogSection[];
  category?: string;
  readTime?: string;
  coverImageUrl?: string;
  coverImagePublicId?: string;
  author: string;
  status?: string; // "published" | "draft" | "scheduled"
  published: boolean;
  createdAt: number;
  updatedAt: number;
};

export type BlogInput = Omit<Blog, "id" | "createdAt" | "updatedAt"> & {
  createdAt?: number;
  updatedAt?: number;
};

const COLLECTION = "blogs";

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function stripUndefined<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;
}

function normalizeBlog(id: string, data: any): Blog {
  const getMillis = (v: any) => {
    if (!v) return Date.now();
    if (typeof v === "number") return v;
    return Date.now();
  };

  return {
    id,
    title: data.title ?? "",
    slug: data.slug ?? slugify(data.title ?? id),
    excerpt: data.excerpt ?? "",
    content: Array.isArray(data.content) ? data.content : [],
    category: data.category,
    readTime: data.readTime,
    coverImageUrl: data.coverImageUrl,
    coverImagePublicId: data.coverImagePublicId,
    author: data.author ?? "Unknown",
    status: data.status,
    published: data.status === "published" ? true : Boolean(data.published),
    createdAt: getMillis(data.createdAt),
    updatedAt: getMillis(data.updatedAt),
  };
}

export async function listBlogs(includeDrafts = false): Promise<Blog[]> {
  const baseRef = ref(rdb, COLLECTION);
  let snap;

  if (includeDrafts) {
    snap = await get(baseRef);
  } else {
    // Primary: query on "status" == "published" (matches strict rules)
    snap = await get(query(baseRef, orderByChild("status"), equalTo("published")));
    // Fallback: if no data (older entries without status), try boolean published flag
    if (!snap.exists()) {
      snap = await get(query(baseRef, orderByChild("published"), equalTo(true)));
    }
  }

  if (!snap.exists()) return [];
  const val = snap.val() as Record<string, any>;
  const blogs = Object.entries(val).map(([id, data]) =>
    normalizeBlog(id, data)
  );
  return blogs.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getBlog(id: string): Promise<Blog | null> {
  try {
    const snap = await get(ref(rdb, `${COLLECTION}/${id}`));
    if (snap.exists()) return normalizeBlog(id, snap.val());
  } catch (err) {
    // fall through to query-based fetch to satisfy rules that require query params
    console.error("Direct blog fetch failed, trying published query:", err);
  }

  // Fallback: fetch published list and pick the item (works with query-based rules)
  const published = await listBlogs(false);
  return published.find((b) => b.id === id) || null;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const snap = await get(ref(rdb, COLLECTION));
  if (!snap.exists()) return null;
  const val = snap.val() as Record<string, any>;
  for (const [id, data] of Object.entries(val)) {
    if ((data as any)?.slug === slug) {
      return normalizeBlog(id, data);
    }
  }
  return null;
}

export async function createBlog(input: BlogInput): Promise<Blog> {
  const now = Date.now();
  const cleanContent = Array.isArray(input.content)
    ? input.content.map((s) => stripUndefined(s))
    : [];

  const payload: BlogInput = stripUndefined({
    ...input,
    content: cleanContent,
    slug: input.slug?.trim() || slugify(input.title) || `blog-${now}`,
    published: Boolean(input.published),
    status: input.published ? "published" : "draft",
    createdAt: input.createdAt ?? now,
    updatedAt: input.updatedAt ?? now,
  });

  const blogsRef = ref(rdb, COLLECTION);
  const createdRef = push(blogsRef);
  await set(createdRef, payload);
  return normalizeBlog(createdRef.key as string, payload);
}

export async function updateBlog(id: string, input: Partial<BlogInput>) {
  const now = Date.now();
  const cleanContent = Array.isArray(input.content)
    ? input.content.map((s) => stripUndefined(s))
    : undefined;

  const payload = stripUndefined({
    ...input,
    content: cleanContent,
    slug: input.slug ? slugify(input.slug) : input.slug,
    status:
      input.published === undefined
        ? input.status
        : input.published
        ? "published"
        : "draft",
    updatedAt: now,
  });

  await update(ref(rdb, `${COLLECTION}/${id}`), payload as any);
}

export async function setBlogPublished(id: string, published: boolean) {
  await update(ref(rdb, `${COLLECTION}/${id}`), {
    published,
    updatedAt: Date.now(),
  });
}

export async function deleteBlog(id: string) {
  await remove(ref(rdb, `${COLLECTION}/${id}`));
}
