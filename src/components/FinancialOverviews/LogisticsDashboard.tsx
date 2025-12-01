// app/components/LogisticsDashboard.tsx
"use client";

import React from "react";
import {
  MapPin,
  Package2,
  Truck,
  MessageSquareMore,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";

/* ------------------------- types & data ------------------------- */
type Shipment = {
  id: string;
  tag: string;
  category: string;
  weight: string;
  from: string;
  to: string;
  shipper: string;
};

const shipments: Shipment[] = [
  {
    id: "ID_JKT_234986",
    tag: "Chair Furniture",
    category: "Chair Furniture",
    weight: "10kg",
    from: "Jl. Jendral Sudirman, Kuningan, DKI Jakarta",
    to: "Cengkareng, Jakarta Barat, DKI Jakarta , Indonesia",
    shipper: "Marvin McKinney",
  },
  {
    id: "ID_JKT_123456",
    tag: "Computer",
    category: "Computer",
    weight: "5kg",
    from: "Setiabudi, Jakarta Selatan, DKI Jakarta",
    to: "Menteng, Jakarta Pusat, DKI Jakarta",
    shipper: "Darlene Robertson",
  },
  {
    id: "ID_JKT_908763",
    tag: "Bicycle",
    category: "Bicycle",
    weight: "4kg",
    from: "Kebon Jeruk, Jakarta Barat, DKI Jakarta",
    to: "Palmerah, Jakarta Barat, DKI Jakarta",
    shipper: "Cameron Williamson",
  },
  {
    id: "ID_JKT_654748",
    tag: "Chair Furniture",
    category: "Chair Furniture",
    weight: "10kg",
    from: "Cipete, Jakarta Selatan, DKI Jakarta",
    to: "Cawang, Jakarta Timur, DKI Jakarta",
    shipper: "Eleanor Pena",
  },
];

const timeline = [
  {
    title: "Confirmed arrived",
    address: "Cengkareng, Jakarta Barat, DKI Jakarta , Indonesia",
    date: "28 Nov 2023",
  },
  {
    title: "Arrived",
    address: "Cengkareng, Jakarta Barat, DKI Jakarta , Indonesia",
    date: "27 Nov 2023",
  },
  {
    title: "In delivery",
    address: "Tanah Abang",
    date: "25 Nov 2023",
  },
];

/* --------------------------- helpers --------------------------- */
const cn = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

/* ------------------------- components -------------------------- */
const ShipmentCompact: React.FC<{
  s: Shipment;
  active?: boolean;
  onClick?: () => void;
}> = ({ s, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full rounded-2xl border p-4 text-left transition",
      active
        ? "border-transparent bg-teal-50/70 ring-1 ring-teal-200"
        : "border-slate-200 bg-white hover:bg-slate-50"
    )}
  >
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-white">
        <Package2 className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <div className="font-semibold text-slate-900">#{s.id}</div>
        <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
          {s.category} — <span className="font-medium">{s.weight}</span>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </div>
    {!active && (
      <div className="mt-3 text-xs text-slate-500 underline">More details</div>
    )}
  </button>
);

const ExpandedShipment: React.FC<{ s: Shipment }> = ({ s }) => (
  <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-4">
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white">
        <Truck className="h-4 w-4" />
      </span>
      <div className="font-semibold text-slate-900">#{s.id}</div>
    </div>

    <div className="mt-3 text-xs text-teal-700 inline-flex items-center gap-1">
      Chair Furniture • {s.weight}
    </div>

    <button className="mt-2 text-xs text-slate-500 underline">More less</button>

    <div className="mt-4 space-y-4 rounded-xl bg-white/60 p-3">
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
        <div>
          <div className="text-xs font-medium text-slate-900">Departure</div>
          <div className="text-sm text-slate-700">{s.from}</div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-4 w-4 text-teal-500" />
        <div>
          <div className="text-xs font-medium text-slate-900">Arrival</div>
          <div className="text-sm text-slate-700">{s.to}</div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md bg-white p-2">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-white">
            <Package2 className="h-4 w-4" />
          </span>
          <div>
            <div className="text-xs font-medium text-slate-900">Shipper</div>
            <div className="text-sm text-slate-700">{s.shipper}</div>
          </div>
        </div>
        <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
          <MessageSquareMore className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

/* --------------------------- main UI -------------------------- */
const LogisticsDashboard: React.FC = () => {
  const [activeId, setActiveId] = React.useState(shipments[0].id);
  const active = shipments.find((s) => s.id === activeId)!;

  return (
    <section className="px-4 md:px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-5">
          {/* Left column – shipments */}
          <aside className="col-span-12 bg-white p-5 rounded-2xl ring-1 ring-slate-200 md:col-span-4 space-y-4">
            <ExpandedShipment s={active} />
            {shipments.slice(1).map((s) => (
              <ShipmentCompact
                key={s.id}
                s={s}
                active={s.id === activeId}
                onClick={() => setActiveId(s.id)}
              />
            ))}
          </aside>

          {/* Center top – world map placeholder */}
          <div className="col-span-12 md:col-span-8 rounded-2xl ring-1 ring-slate-200 p-3">
            {/* Map Section */}
            <div className="rounded-xl bg-gray-500 h-90 md:h-[380px] grid place-items-center">
              <div className="text-slate-700/70 text-sm">
                World Map (placeholder)
              </div>
            </div>

            {/* Bottom cards in grid */}
            <div className="grid grid-cols-12 gap-4 mt-6">
              {/* Delivery Status (8 cols) */}
              <div className="col-span-12 p-10 md:col-span-8 rounded-2xl bg-white ring-1 ring-slate-200">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-900">
                    Delivery Status
                  </div>
                  <button className="text-sm text-slate-500">Details</button>
                </div>

                <div className="mt-3">
                  <div className="h-3 w-full rounded-full bg-slate-100">
                    <div className="h-3 w-[82%] rounded-full bg-emerald-500" />
                  </div>
                  <div className="mt-1 text-right text-xs text-slate-500">
                    82%
                  </div>
                </div>

                <div className="mt-4 space-y-5">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">
                          {t.title}
                        </div>
                        <div className="text-sm text-slate-700">
                          {t.address}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        {t.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Card (4 cols) */}
              <div className="col-span-12 md:col-span-4 rounded-2xl ring-1 ring-slate-200 p-4 bg-[radial-gradient(160%_140%_at_10%_10%,#eafaf8_0%,#f5fffe_40%,#edf6ff_85%)]">
                <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
                  Premium
                </span>

                <h3 className="mt-3 text-slate-900 font-semibold">
                  Premium Dashboard Service
                  <br /> For Maximum Satisfaction
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  +20 Update features
                </p>

                <button className="mt-5 inline-flex items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900">
                  Try Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsDashboard;
