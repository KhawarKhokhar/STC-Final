import Hero from '@/components/Home/Hero';
import { TaxProcessSection } from '@/components/Home/TaxProcessSection';
import TrustedBy from '@/components/Home/TrustedBy';
import FeaturesSection from '@/components/Home/FeaturesSection';
import CrmSection from '@/components/Home/CrmSection';
import PricingSection from '@/components/Home/PricingSection';
import CommonQuestion from '@/components/reusable/common/CommonQuestion';
import Reviews from '@/components/reusable/common/Reviews';
import SolutionForEach from '@/components/Home/SolutionForEach';
import { IntegrationsDashboard } from '@/components/Home/IntegrationsDashboard';
import { SeamlessInternetSection } from '@/components/Home/SeamlessInternetSection';
import DashboardSection from '@/components/Home/DashboardSection';
import CarbonJourneyPopup from '@/components/reusable/common/CarbonJourneyPopup';

export default function Home() {
  return (
    <main className="bg-[#f5f4ed]">
      <Hero />
      <TaxProcessSection/>
      <DashboardSection/>
      <IntegrationsDashboard/>
      <SeamlessInternetSection/>
      <SolutionForEach/>
      <TrustedBy/>
      <FeaturesSection/>
      <CrmSection/>
      <PricingSection/>
      <CommonQuestion/>
      <Reviews/>
    </main>
  );
}

