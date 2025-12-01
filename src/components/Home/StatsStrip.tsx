import React from 'react';

const stats = [
  { value: '45', suffix: '+', label: 'States covered', helper: 'Real-time nexus tracking' },
  { value: '99.7', suffix: '%', label: 'On-time filings', helper: 'SLA-backed submissions' },
  { value: '12', suffix: 'h', label: 'Expert response', helper: 'Average support turnaround' },
  { value: '$4.8', suffix: 'M', label: 'Penalties avoided', helper: 'Last twelve months' },
];

const StatsStrip: React.FC = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-gray-200/70 bg-white px-7 py-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-4xl font-semibold text-gray-900">
              {stat.value}
              <span className="text-cyan-500">{stat.suffix}</span>
            </p>
            <p className="mt-4 text-lg font-medium text-gray-800">{stat.label}</p>
            <p className="mt-2 text-sm text-gray-600">{stat.helper}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsStrip;
