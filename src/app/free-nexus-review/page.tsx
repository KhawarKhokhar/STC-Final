import CountryTaxServices from '@/components/FreeNexusReview/CountryTaxServices'
import DigitalIncorporation from '@/components/FreeNexusReview/DigitalIncorporation'
import HeroSection from '@/components/FreeNexusReview/HeroSection'

import StatsStrip from '@/components/FreeNexusReview/StatsStrip'
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
    {/* <LogisticsDashboard/> */}
    <CommonQuestion/>-
    <Reviews/>
    </>
  )
}

export default page
