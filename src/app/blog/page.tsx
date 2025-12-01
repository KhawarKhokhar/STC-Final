import ArticlesGallery from '@/components/Blog/ArticlesGallery'
import FeaturedCategory from '@/components/reusable/blog/FeaturedCategory'
import HeroSection from '@/components/Blog/HeroSection'
import InnovationHero from '@/components/reusable/blog/InnovationHero'
import InsightIntro from '@/components/Blog/InsightIntro'
import CommonQuestion from '@/components/reusable/common/CommonQuestion'
import React from 'react'

function page() {
  return (
    <>
    <HeroSection/>
    <InsightIntro/>
    <ArticlesGallery/>
    <FeaturedCategory/>
    <CommonQuestion/>
    <InnovationHero/>
    </>
  )
}

export default page
