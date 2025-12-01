// src/lib/notifications.ts
import { ref, push, set } from "firebase/database";
import { rdb } from "@/lib/firebase";

export type NotificationType = "chat" | "get_quote" | "contact_us";

export async function createNotification(payload: {
  type: NotificationType;
  title: string;
  desc: string;
  refPath?: string;
}) {
  const notifRef = push(ref(rdb, "notifications"));

  await set(notifRef, {
    ...payload,
    createdAt: Date.now(),
    unread: true,
  });
}
