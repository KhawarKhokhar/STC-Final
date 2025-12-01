import CentralCtaBanner from '@/components/About/CentralCtaBanner'
import GrowthHero from '@/components/About/GrowthHero'
import MissionSection from '@/components/About/MissionSection'
import TeamSection from '@/components/About/TeamSection'
import WhereWeFeature from '@/components/About/WhereWeFeature'
import CommonQuestion from '@/components/reusable/common/CommonQuestion'
import Reviews from '@/components/reusable/common/Reviews'
import React from 'react'

function page() {
  return (
    <>
    <GrowthHero/>
    <MissionSection/>
    <TeamSection/>
    <WhereWeFeature/>
    <div className='pb-30'>
    <CommonQuestion/>
    </div>
    <CentralCtaBanner/>
    <Reviews/>
    </>
  )
}

export default page
