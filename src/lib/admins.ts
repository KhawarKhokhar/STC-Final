"use client";

// Helpers for managing admin profiles in Firebase Realtime Database.

import { rdb } from "@/lib/firebase";
import { get, push, ref, set } from "firebase/database";

export type AdminProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  title?: string;
  role?: string;
  location?: string;
  avatarUrl?: string;
  avatarPublicId?: string;
  uid?: string; // Firebase Auth UID (when tied to a real account)
  createdAt?: number;
  updatedAt?: number;
};

const PATH = "admins";

export async function fetchAdminProfileByUid(
  uid: string
): Promise<AdminProfile | null> {
  if (!uid) return null;
  const snap = await get(ref(rdb, `${PATH}/${uid}`));
  if (!snap.exists()) return null;
  const data = snap.val() as AdminProfile;
  return { ...data, id: uid };
}

export async function listAdmins(): Promise<AdminProfile[]> {
  const snap = await get(ref(rdb, PATH));
  if (!snap.exists()) return [];
  const val = snap.val() as Record<string, AdminProfile>;
  return Object.entries(val).map(([id, admin]) => ({ ...admin, id }));
}

export async function upsertAdminProfile(
  admin: Omit<AdminProfile, "id"> & { id?: string }
): Promise<AdminProfile> {
  const id = admin.id || admin.uid || push(ref(rdb, PATH)).key;
  if (!id) {
    throw new Error("Failed to generate admin id.");
  }

  const payload: AdminProfile = {
    id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone || "",
    title: admin.title || "",
    role: admin.role || "Admin",
    location: admin.location || "",
    avatarUrl: admin.avatarUrl || "",
    avatarPublicId: admin.avatarPublicId || "",
    uid: admin.uid || id,
    createdAt: admin.createdAt || Date.now(),
    updatedAt: Date.now(),
  };

  await set(ref(rdb, `${PATH}/${id}`), payload);
  return payload;
}
