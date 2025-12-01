import CommonQuestion from '@/components/reusable/common/CommonQuestion'
import Reviews from '@/components/reusable/common/Reviews'
import AffordablePrices from '@/components/PricingOld/AffordablePrices'
import ComparisonPanel from '@/components/reusable/pricing-old/ComparisonPanel'
import ComparisonSections from '@/components/reusable/pricing-old/ComparisonSections'
import DealsBanner from '@/components/reusable/pricing-old/DealsBanner'
import Pricing from '@/components/PricingOld/Pricing'
import Pricing2 from '@/components/PricingOld/Pricing2'

function page() {
  return (
    <>
    <Pricing/>
    <AffordablePrices/>
    <Pricing2/>
    <DealsBanner/>
    <ComparisonPanel/>
    <ComparisonSections/>
    <CommonQuestion/>
    <Reviews/>
    </>
  )
}

export default page
