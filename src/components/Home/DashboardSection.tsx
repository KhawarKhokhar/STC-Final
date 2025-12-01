// app/components/TaskDashboard.tsx
"use client";

import React from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

type Panel = { id: string; title: string; description?: string };

const tasks: Task[] = [
  { id: "t1", title: "Book your free Nexus Review", description: "Fill out an Information sheet and book your free nexus review We perform the nexus review and figure out your current and backdated liabilities", icon: "📶" },
  { id: "t2", title: "Registrations", description: "We as your inhouse accountnat, submit all your registrations and activate your accounts with the states.", icon: "🗻" },
  { id: "t3", title: "Filings", description: "We Clear backlogs; file monthly/quarterly returns. You review the monthly summary and payments.", icon: "📈" },
  { id: "t4", title: "Ongoing Compliance", description: "We File monthly returns. Monitor accounts. Manage letters, audits, and nexus tracking. Ensure full compliance and support your business on an ongoing basis.", icon: "📈" }
];

// Map each task to *its* 3 panels
const panelsByTask: Record<string, Panel[]> = {
  t1: [
    { id: "t1-p1", title: "CHART MOVEMENT" },
    { id: "t1-p2", title: "GRAPHIC OVERVIEW" },
    { id: "t1-p3", title: "FILE MANAGEMENT" },
  ],
  t2: [
    { id: "t2-p1", title: "BURNDOWN CHARTS" },
    { id: "t2-p2", title: "RESOURCE HEATMAP" },
    { id: "t2-p3", title: "DOC LIBRARY" },
  ],
  t3: [
    { id: "t3-p1", title: "PIPELINE VIEW" },
    { id: "t3-p2", title: "KPI SNAPSHOT" },
    { id: "t3-p3", title: "ASSET BROWSER" },
  ],
  t4: [
    { id: "t4-p1", title: "QA REPORTS" },
    { id: "t4-p2", title: "DEFECT TRENDS" },
    { id: "t4-p3", title: "TEST FILES" },
  ],
  t5: [
    { id: "t5-p1", title: "MILESTONE GANTT" },
    { id: "t5-p2", title: "RISK MATRIX" },
    { id: "t5-p3", title: "EXPORTS" },
  ],
  t6: [
    { id: "t6-p1", title: "RELEASE NOTES" },
    { id: "t6-p2", title: "USAGE ANALYTICS" },
    { id: "t6-p3", title: "FILE SYNC" },
  ],
};

const TaskItem: React.FC<{
  task: Task;
  active: boolean;
  onClick: () => void;
}> = ({ task, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left rounded-xl px-3 py-3 transition flex gap-3 ${
      active ? "bg-white" : "hover:bg-white/60"
    }`}
  >
    <div className="mt-1 text-neutral-700">{task.icon ?? "•"}</div>
    <div>
      <div className="font-semibold text-neutral-800">{task.title}</div>
      <p className="text-sm text-neutral-600">{task.description}</p>
    </div>
  </button>
);

const PanelCard: React.FC<{ title: string }> = ({ title }) => (
  <div className="space-y-3">
    <div className="text-sm font-semibold tracking-wide text-[#616161]">{title}</div>
    <div className="h-72 w-full rounded-md bg-neutral-200/80" />
  </div>
);

const TaskDashboard: React.FC = () => {
  const [selectedTaskId, setSelectedTaskId] = React.useState<string>(tasks[0].id);

  const currentPanels = panelsByTask[selectedTaskId] ?? [];

  return (
    <section className="px-4 md:px-8 py-6">
      <div className="mx-auto max-w-7xl rounded-xl bg-[#fff2d0]">
        <div className="grid grid-cols-12 overflow-hidden rounded-3xl">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3 bg-[#ffefca] px-8 py-6">
            <div className="text-lg font-semibold tracking-wide text-neutral-800 leading-tight">
              TASK
              <br />
              MANAGEMENT
            </div>

            {/* Scrollable list */}
            <div className="mt-4 h-[280px] overflow-y-auto pr-2">
              <div className="space-y-2">
                {tasks.map((t) => (
                  <TaskItem
                    key={t.id}
                    task={t}
                    active={t.id === selectedTaskId}
                    onClick={() => setSelectedTaskId(t.id)}
                  />
                ))}
              </div>
              {/* Optional: slim scrollbar */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 6px;
                }
                div::-webkit-scrollbar-thumb {
                  background: #c7c7c7;
                  border-radius: 8px;
                }
                div::-webkit-scrollbar-track {
                  background: transparent;
                }
              `}</style>
            </div>
          </aside>

          {/* Main gradient area */}
          <main className="col-span-12 md:col-span-9">
            <div className="h-full w-full rounded-r-3xl bg-[radial-gradient(60%_120%_at_15%_20%,#19c7c0_0%,#69dfdd_40%,#fff0c1_85%)] px-6 py-6">
              {/* Exactly three panels for the selected task */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentPanels.map((p) => (
                  <PanelCard key={p.id} title={p.title} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default TaskDashboard;