import CommonQuestion from '@/components/reusable/common/CommonQuestion'
import Reviews from '@/components/reusable/common/Reviews'
import SalesGraphCard from '@/components/Home/SubComponents/SalesGraphCard'
import AdditionalAddOns from '@/components/Pricing/AdditionalAddOns'
import ComparisonPanel from '@/components/Pricing/ComparisonGraph'
import DiscoverBanner from '@/components/Pricing/DiscoverBanner'
import SalesTaxPricingPlans from '@/components/Pricing/SalesTaxPricingPlans'
import SimplePricing from '@/components/Pricing/SimplePricing'
import ComparisonSections from '@/components/reusable/pricing-old/ComparisonSections'
import React from 'react'

function page() {
  return (
    <>
    <SimplePricing/>
    <DiscoverBanner/>
    <SalesTaxPricingPlans/>
    <AdditionalAddOns/>
    <ComparisonPanel/>
    <ComparisonSections/>
    <CommonQuestion/>
    <Reviews/>
    </>
  )
}

export default page
