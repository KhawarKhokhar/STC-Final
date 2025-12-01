"use client";

import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { v4 as uuidv4 } from "uuid";

import {
  CalendarDays,
  ChevronDown,
  MoreHorizontal,
  NotebookPen,
  Settings2,
  Target,
  Plus,
  X,
} from "lucide-react";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ---------------- Types ---------------- */
type ColumnKey = "new" | "inprogress" | "review" | "done";

type Task = {
  id: string;
  title: string;        // tag pill
  heading: string;      // main heading
  description: string;  // body
  date: string;         // footer date
  leads: number;
  image?: string;       // optional preview
};

type Column = {
  key: ColumnKey;
  title: string;
  dot: string;
};

/* ---------------- Columns ---------------- */
const COLUMNS: Column[] = [
  { key: "new",        title: "New",         dot: "bg-indigo-500" },
  { key: "inprogress", title: "In Progress", dot: "bg-cyan-500" },
  { key: "review",     title: "Review",      dot: "bg-amber-500" },
  { key: "done",       title: "Completed",        dot: "bg-emerald-500" },
];

/* ---------------- Initial Tasks ---------------- */
const INITIAL_TASKS: Record<ColumnKey, Task[]> = {
  new: [
    {
      id: "t1",
      title: "Web design",
      heading: "Twottr - Redesign Project",
      description: "Here you will make a Twitter web redesign project carefully.",
      date: "02 May 23",
      leads: 6,
    },
  ],
  inprogress: [
    {
      id: "t2",
      title: "Mobile Design",
      heading: "Notnot - Mobile App",
      description: "Hello guys, here is a brief file from the client. Good luck!",
      date: "03 Jul 23",
      leads: 6,
    },
  ],
  review: [
    {
      id: "t3",
      title: "Web design",
      heading: "Gonial Landing Page",
      description: "Here you will make a Landing Page. Good luck!",
      date: "02 May 23",
      leads: 6,
    },
  ],
  done: [
    {
      id: "t4",
      title: "Dashboard",
      heading: "Maddog - Dashboard UI",
      description: "Do it carefully and in accordance with the wishes of the client.",
      date: "12 May 23",
      leads: 3,
    },
  ],
};

/* ---------------- Form Type ---------------- */
type FormState = {
  col: ColumnKey;
  title: string;
  heading: string;
  description: string;
  imageFile: File | null;
  imagePreview: string;
};

/* ======================= PAGE ======================= */
export default function TasksPage() {
  /* LEFT PANEL STATE */
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [openCalendar, setOpenCalendar] = useState(true);
  const [openOther, setOpenOther] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);

  /* RIGHT PANEL STATE */
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [tasksByCol, setTasksByCol] =
    useState<Record<ColumnKey, Task[]>>(INITIAL_TASKS);

  /* MODAL STATE */
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState<FormState>({
    col: "new",
    title: "",
    heading: "",
    description: "",
    imageFile: null,
    imagePreview: "",
  });

  /* Calendar styling */
  const calendarClassNames = useMemo(
    () => ({
      caption: "flex items-center justify-between mb-3",
      caption_label: "text-sm font-semibold text-slate-900",
      nav_button:
        "h-7 w-7 inline-flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100",
      head_cell: "text-[10px] font-medium text-slate-400",
      day_button:
        "h-8 w-8 rounded-full text-xs hover:bg-slate-100 flex items-center justify-center",
      selected:
        "bg-[#0E1A35] text-white hover:bg-[#0E1A35] font-semibold",
      today: "bg-slate-200 text-slate-900",
      outside: "text-slate-300",
    }),
    []
  );

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgb(199, 228, 226) 1px, transparent 2px),
    linear-gradient(to bottom, rgb(199, 228, 226) 1px, transparent 2px)
  `,
  backgroundSize: "200px 250px",
  backgroundColor: "#eef6f5", // ← Border visible always
} as React.CSSProperties;

  /* Pick image */
  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((p) => ({ ...p, imageFile: file, imagePreview: preview }));
  }

  /* Add task */
  function addTask() {
    if (!form.heading.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title: form.title || "Web design",
      heading: form.heading,
      description: form.description,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      }),
      leads: 0,
      image: form.imagePreview || undefined,
    };

    setTasksByCol((prev) => ({
      ...prev,
      [form.col]: [newTask, ...prev[form.col]],
    }));

    setForm({
      col: "new",
      title: "",
      heading: "",
      description: "",
      imageFile: null,
      imagePreview: "",
    });
    setOpenModal(false);
  }

  return (
    <main className="flex gap-6 h-screen overflow-hidden">
      {/* LEFT PANEL */}
      <aside className="w-[320px] shrink-0 space-y-6 overflow-y-auto p-1">
        {/* Schedule Date Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Schedule Date
          </h3>

          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            showOutsideDays
            weekStartsOn={0}
            className="text-sm"
            classNames={{
              caption: calendarClassNames.caption,
              caption_label: calendarClassNames.caption_label,
              nav_button: calendarClassNames.nav_button,
              head_cell: calendarClassNames.head_cell,
              day_button: calendarClassNames.day_button,
            }}
            modifiersClassNames={{
              selected: calendarClassNames.selected,
              today: calendarClassNames.today,
              outside: calendarClassNames.outside,
            }}
          />
        </div>

        {/* Scheduled List */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-slate-400 font-medium">Scheduled</h3>
            <button className="h-7 w-7 rounded-lg border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition">
              +
            </button>
          </div>

          <div className="space-y-2">
            {/* Calendar Dropdown */}
            <div>
              <button
                onClick={() => setOpenCalendar((v) => !v)}
                className="w-full flex items-center gap-3 px-3 py-2"
              >
                <ChevronDown
                  className={`h-3 w-3 text-slate-500 transition ${
                    openCalendar ? "rotate-180" : ""
                  }`}
                />
                <CalendarDays className="h-4 w-4 text-slate-700" />
                <div className="text-sm font-semibold text-slate-900">
                  Calendar
                </div>
              </button>

              {openCalendar && (
                <div className="pl-12 pt-3 space-y-4 text-sm text-slate-500">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-3 w-3 rounded-md accent-indigo-600"
                    />
                    <span className="text-slate-400 text-sm">Holiday</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-3 w-3 rounded-md accent-indigo-600"
                    />
                    <span className="text-slate-400 text-sm">Reminders</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-3 w-3 rounded-md accent-indigo-600"
                    />
                    <span className="text-slate-400 text-sm">Task</span>
                  </label>
                </div>
              )}
            </div>

            {/* Other Calendars */}
            <button
              onClick={() => setOpenOther((v) => !v)}
              className="w-full flex items-center gap-3 px-2 py-2"
            >
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition ${
                  openOther ? "rotate-180" : ""
                }`}
              />
              <NotebookPen className="h-3 w-3 text-slate-700" />
              <div className="text-sm font-semibold text-slate-900">
                Other Calendars
              </div>
            </button>

            {openOther && (
              <div className="pl-12 space-y-3 text-slate-500 text-sm">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-3 w-3 rounded-md accent-indigo-600"
                  />
                  Work
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded-md accent-indigo-600"
                  />
                  Personal
                </label>
              </div>
            )}

            {/* Target */}
            <button
              onClick={() => setOpenTarget((v) => !v)}
              className="w-full flex items-center gap-3 px-2 py-2"
            >
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition ${
                  openTarget ? "rotate-180" : ""
                }`}
              />
              <Target className="h-3 w-3 text-slate-700" />
              <div className="text-sm font-semibold text-slate-900">
                Target
              </div>
            </button>

            {openTarget && (
              <div className="pl-12 space-y-3 text-slate-500 text-xs">
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  Tax Filing
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  Payments
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <section className="flex-1 flex flex-col min-h-0">
        {/* Top controls */}
        <div className="flex items-center justify-end mb-5 shrink-0">
          {/* Tabs */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-1 inline-flex">
            {(["day", "week", "month"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setView(k)}
                className={`px-5 py-2 text-xs rounded-lg transition ${
                  view === k
                    ? "bg-gray-200"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div> */}

          {/* Actions */}
          <div className="flex items-center gap-2 pr-6">
            <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 text-xs px-5 py-3 rounded-xl shadow-sm hover:bg-slate-50">
              <Settings2 size={16} />
              Filter & Sort
            </button>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-white border border-slate-300 text-slate-700 text-xs px-5 py-3 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2"
            >
              <Plus size={14} />
              Add New
            </button>
          </div>
        </div>

        {/* Board Wrapper with Grid BG */}
        <div
          className="flex-1 min-h-full p-4"
          style={gridBackgroundStyle}
        >
          <TasksBoard
            columns={COLUMNS}
            tasksByCol={tasksByCol}
            setTasksByCol={setTasksByCol}
          />
        </div>
      </section>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">
                Add New Task
              </h3>
              <button
                onClick={() => setOpenModal(false)}
                className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600">Column</label>
                <select
                  value={form.col}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      col: e.target.value as ColumnKey,
                    }))
                  }
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                >
                  {COLUMNS.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-600">Title (tag)</label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. Web design"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600">Heading</label>
                <input
                  value={form.heading}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, heading: e.target.value }))
                  }
                  placeholder="Task heading"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Task details..."
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onPickImage}
                  className="mt-1 block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-medium file:text-slate-700 hover:file:bg-slate-200"
                />
                {form.imagePreview && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-100">
                    <img
                      src={form.imagePreview}
                      alt="preview"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-xl text-sm bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 rounded-xl text-sm bg-slate-900 hover:bg-slate-800 text-white"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ======================= BOARD (INLINE) ======================= */
function TasksBoard({
  columns,
  tasksByCol,
  setTasksByCol,
}: {
  columns: Column[];
  tasksByCol: Record<ColumnKey, Task[]>;
  setTasksByCol: React.Dispatch<
    React.SetStateAction<Record<ColumnKey, Task[]>>
  >;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const columnKeys = useMemo(
    () => columns.map((c) => c.key),
    [columns]
  );

  const findColumnOfTask = (taskId: string): ColumnKey | null => {
    for (const colKey of columnKeys) {
      if (tasksByCol[colKey].some((t) => t.id === taskId)) return colKey;
    }
    return null;
  };

  const activeTask: Task | null = useMemo(() => {
    if (!activeId) return null;
    const col = findColumnOfTask(activeId);
    if (!col) return null;
    return tasksByCol[col].find((t) => t.id === activeId) ?? null;
  }, [activeId, tasksByCol]);

  function onDragStart(e: DragStartEvent) {
    setActiveId(e.active.id as string);
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;

    const activeTaskId = active.id as string;
    const overId = over.id as string;

    const sourceCol = findColumnOfTask(activeTaskId);
    if (!sourceCol) return;

    const destCol =
      findColumnOfTask(overId) ?? (overId as ColumnKey);

    if (!destCol) return;

    if (sourceCol === destCol) {
      const items = tasksByCol[sourceCol];
      const oldIndex = items.findIndex((t) => t.id === activeTaskId);
      const newIndex = items.findIndex((t) => t.id === overId);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      setTasksByCol((prev) => ({
        ...prev,
        [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
      }));
      return;
    }

    setTasksByCol((prev) => {
      const sourceItems = [...prev[sourceCol]];
      const destItems = [...prev[destCol]];

      const movingIndex = sourceItems.findIndex((t) => t.id === activeTaskId);
      if (movingIndex === -1) return prev;

      const [movingTask] = sourceItems.splice(movingIndex, 1);

      const overIndex = destItems.findIndex((t) => t.id === overId);
      if (overIndex >= 0) destItems.splice(overIndex, 0, movingTask);
      else destItems.push(movingTask);

      return {
        ...prev,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      };
    });
  }

  return (
    <>
      {/* hide scrollbars but keep scrolling */}
      <style jsx global>{`
        .board-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .board-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {/* ✅ Whole board scrolls. Columns do NOT scroll */}
        <div className="board-scroll h-full w-full overflow-auto">
          <div className="min-w-[1200px] min-h-full grid grid-cols-4 gap-6 pb-8">
            {columns.map((col) => (
              <ColumnLane
                key={col.key}
                column={col}
                tasks={tasksByCol[col.key]}
              />
            ))}
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTask ? (
            <div className="rotate-1 scale-[1.02]">
              <TaskCard task={activeTask} isOverlay />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

/* ---------------- Column Lane ---------------- */
function ColumnLane({
  column,
  tasks,
}: {
  column: Column;
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.key,
  });

  return (
    <div className="space-y-4 bg-white/50 rounded-2xl p-4 shadow-none border border-gray-300">
      <div className="bg-white/90 backdrop-blur rounded-full px-3 py-2 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
          <span className={`h-2 w-2 rounded-full ${column.dot}`} />
          {column.title}
        </div>
        <div className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-500">
          {tasks.length} Tasks
        </div>
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {/* no overflow here */}
        <div
          ref={setNodeRef}
          className={`space-y-4 rounded-2xl p-1 min-h-[60px] transition ${
            isOver ? "bg-white/60" : "bg-transparent"
          }`}
        >
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}

          {tasks.length === 0 && (
            <div className="h-20 rounded-2xl border border-dashed border-slate-200 bg-white/50 flex items-center justify-center text-xs text-slate-400">
              Drop here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

/* ---------------- Sortable Wrapper ---------------- */
function SortableTaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? "opacity-0" : "opacity-100"}
    >
      <TaskCard task={task} />
    </div>
  );
}

/* ---------------- Task Card ---------------- */
function TaskCard({
  task,
  isOverlay = false,
}: {
  task: Task;
  isOverlay?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm border border-slate-100 w-full ${
        isOverlay ? "shadow-lg border-slate-200" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] px-3 py-2 rounded-full font-semibold bg-indigo-100 text-indigo-700">
          {task.title}
        </span>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <h4 className="text-base font-light text-slate-900 my-4">
        {task.heading}
      </h4>

      <p className="text-md text-slate-400 leading-relaxed mb-3 line-clamp-3">
        {task.description}
      </p>

      {task.image && (
        <div className="mb-3 overflow-hidden rounded-xl border border-slate-100">
          <img
            src={task.image}
            alt="task"
            className="w-full h-28 object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="flex items-center">
          <span className="h-5 w-5 rounded-full bg-red" />
          <span className="h-5 w-5 rounded-full bg-green -ml-2" />
          <span className="h-5 w-5 rounded-full bg-yellow -ml-2" />
        </div>

        <div className="flex items-center gap-1">
          <CalendarDays size={14} className="text-slate-400" />
          {task.date}
        </div>
      </div>
    </div>
  );
}
