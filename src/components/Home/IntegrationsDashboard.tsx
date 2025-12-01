// components/IntegrationsDashboard.tsx

import React from 'react';
import { Sidebar } from '@/components/Home/IntegrationDashboard/Sidebar';
import { FeaturedSection } from '@/components/Home/IntegrationDashboard/FeaturedSection';
import { IntegrationList } from '@/components/Home/IntegrationDashboard/IntegrationList';

export const IntegrationsDashboard: React.FC = () => {
  return (
    <section className="bg-[#F5F1ED] px-6 py-12 font-sans sm:px-8 lg:px-12">
      {/* Header */}
      <header className="mx-auto mb-10 flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl">Integrations</h1>
          <p className="text-gray-600">Connect with your favorite tools and services to streamline workflows.</p>
        </div>
        <a href="#" className="text-sm font-medium text-black hover:text-purple-700">
          Missing an integrations? <span className="text-[#7B67CB]">Let us know</span> -&gt;
        </a>
      </header>

      {/* Main Layout (Sidebar + Content) */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-64">
          <Sidebar />
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 space-y-10">
          <FeaturedSection />
          <IntegrationList />
        </main>
      </div>
    </section>
  );
};
