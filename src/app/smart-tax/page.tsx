import CommonQuestion from '@/components/reusable/common/CommonQuestion'
import Reviews from '@/components/reusable/common/Reviews'
import ComparisonPanel from '@/components/Pricing/ComparisonPanel'
import ComparisonSections from '@/components/Pricing/ComparisonSections'
import DealsBanner from '@/components/Pricing/DealsBanner'
import PlanComparisonTable from '@/components/reusable/smart-tax/PlanComparisonTable'
import React from 'react'

function page() {
  return (
    <>
    <PlanComparisonTable/>
    <DealsBanner/>
    <ComparisonPanel/>
    <ComparisonSections/>
    <CommonQuestion/>
    <Reviews/>

    </>
  )
}

export default page
