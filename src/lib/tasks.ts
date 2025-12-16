// src/lib/tasks.ts
// Firebase Realtime Database helpers for Tasks board.

import { ref, get, set, update } from "firebase/database";
import { rdb } from "@/lib/firebase";

export type ColumnKey = "new" | "inprogress" | "review" | "done";

export type Task = {
  id: string;
  title: string;        // tag pill
  heading: string;      // main heading
  description: string;  // body
  date: string;         // footer date
  leads: number;
  imageUrl?: string;
  imagePublicId?: string;
};

export type TasksBoard = Record<ColumnKey, Task[]>;

const PATH = "tasksBoard";

export async function loadTasksBoard(): Promise<TasksBoard | null> {
  const snap = await get(ref(rdb, PATH));
  if (!snap.exists()) return null;
  return snap.val() as TasksBoard;
}

export async function saveTasksBoard(board: TasksBoard): Promise<void> {
  await set(ref(rdb, PATH), {
    ...board,
    updatedAt: Date.now(),
  } as any);
}

// Optional convenience: store board under PATH/board, keep meta separate.
export async function saveTasksBoardV2(board: TasksBoard): Promise<void> {
  await set(ref(rdb, `${PATH}/board`), board);
  await update(ref(rdb, PATH), { updatedAt: Date.now() });
}

export async function loadTasksBoardV2(): Promise<TasksBoard | null> {
  const snap = await get(ref(rdb, `${PATH}/board`));
  if (!snap.exists()) return null;
  return snap.val() as TasksBoard;
}
