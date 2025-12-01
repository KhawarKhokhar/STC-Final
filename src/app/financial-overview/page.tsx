import CountryTaxServices from '@/components/FinancialOverviews/CountryTaxServices'
import DigitalIncorporation from '@/components/FinancialOverviews/DigitalIncorporation'
import HeroSection from '@/components/FinancialOverviews/HeroSection'
import LogisticsDashboard from '@/components/FinancialOverviews/LogisticsDashboard'
import StatsStrip from '@/components/FinancialOverviews/StatsStrip'
import CommonQuestion from '@/components/reusable/common/CommonQuestion'
import Reviews from '@/components/reusable/common/Reviews'


function page() {
  return (
    <>
    <div
    className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat"
    >
    <HeroSection/>
    <DigitalIncorporation/>
    </div>
    <StatsStrip/>
    <CountryTaxServices/>
    <LogisticsDashboard/>
    <CommonQuestion/>-
    <Reviews/>
    </>
  )
}

export default page
