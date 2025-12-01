import InnovationHero from '@/components/reusable/blog/InnovationHero'
import BlogLanding from '@/components/reusable/blog/BlogLanding'
import BlogPageHeader from '@/components/reusable/blog/BlogPageHeader'
import CommonQuestion from '@/components/reusable/common/CommonQuestion'


function page() {
  return (
    <>
    <BlogPageHeader/>
    <BlogLanding/>
    <CommonQuestion/>
    <InnovationHero/>
    </>
  )
}

export default page
