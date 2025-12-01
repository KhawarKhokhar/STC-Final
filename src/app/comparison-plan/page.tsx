import CommonQuestion from '@/components/reusable/common/CommonQuestion'
import Reviews from '@/components/reusable/common/Reviews'
import ComparisonPanel from '@/components/reusable/pricing-old/ComparisonPanel'
import ComparisonSections from '@/components/reusable/pricing-old/ComparisonSections'
import DealsBanner from '@/components/reusable/pricing-old/DealsBanner'
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
