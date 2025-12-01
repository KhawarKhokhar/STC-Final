import CenteredBlogCarousel from '@/components/Blog-Post/CenteredBlogCarousel'
import FeedWithSidebar from '@/components/Blog-Post/FeedWithSidebar'
import WorthyBlogs from '@/components/Blog-Post/WorthyBlogs'
import FeaturedCategory from '@/components/reusable/blog/FeaturedCategory'
import InnovationHero from '@/components/reusable/blog/InnovationHero'
import CommonQuestion from '@/components/reusable/common/CommonQuestion'
import React from 'react'

function page() {
  return (
    <>
    <WorthyBlogs/>
    <CenteredBlogCarousel/>
    <FeedWithSidebar/>
    <FeaturedCategory/>
    <CommonQuestion/>
    <InnovationHero/>
    </>
  )
}

export default page
