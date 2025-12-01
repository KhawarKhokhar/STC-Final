import InnovationHero from "@/components/reusable/blog/InnovationHero";
import ArticleWithTOC from "@/components/BlogDetails/ArticleWithTOC";
import BlogDetail from "@/components/BlogDetails/BlogDetailHeader";
import RelatedPosts from "@/components/BlogDetails/RelatedPosts";
import CommonQuestion from "@/components/reusable/common/CommonQuestion";

  const toc = [
    { id: "intro", title: "Property Investment Guide, A Beginner's Path to Success" },
    { id: "why-invest", title: "Why Invest in Property?" },
    { id: "choosing", title: "Choosing the Right Property" },
    { id: "long-term", title: "Long-term Strategy in Property Investment" },
  ];

  const sections = [
    {
      id: "intro",
      title: "Property Investment Guide, A Beginner's Path to Success",
      description:
        "Investing in property can be a lucrative way to build wealth, but it can also be overwhelming for beginners. Whether you're looking to buy your first home or venture into real estate investment, understanding the basics is crucial. This guide will help you navigate the key steps to make informed decisions and succeed in the world of property investment.",
    },
    {
      id: "why-invest",
      title: "Why Invest in Property?",
      description:
        "Property investment has long been considered one of the most reliable and profitable ways to grow wealth. Unlike stocks or bonds, real estate provides both short-term rental income and long-term appreciation. It also offers tangible ownership and the potential for tax benefits. With the right strategy, property can be a steady source of income and financial security.",
    },
    {
      id: "choosing",
      title: "Choosing the Right Property",
      description:
        "Choose the property type that fits your investment goals. Common choices include:",
      bullets: [
        "Residential Property: A house or apartment that is rented out to tenants.",
        "Commercial Property: Buildings that are leased to businesses, such as offices or shop houses.",
        "Industrial Property: Warehouses and production facilities leased for industrial activities.",
      ],
    },
    {
      id: "long-term",
      title: "Long-term Strategy in Property Investment",
      description:
        "Property investment is a long-term game. Focus on purchasing properties with good growth potential and make repairs or renovations to increase their value. Diversify your property portfolio to reduce risk and maintain financial stability in the long run.",
    },
  ];

  const posts = [
    {
      id: "1",
      title: "Tips for Quick Property Sales",
      summary:
        "Check out these effective strategies that will help you attract potential buyers and accelerate sales.",
    },
    {
      id: "2",
      title: "Tips for Quick Property Sales",
      summary:
        "Learn about common overlooked fees and taxes when buying or selling property.",
    },
    {
      id: "3",
      title: "Renovate to Boost Property Value",
      summary:
        "Want to boost your property's value? Explore remodeling ideas to increase appeal and price.",
    },
  ];

function page() {
  return (
    <>
      <BlogDetail
        title="Property Investment Guide"
        subtitle="Begin your investment journey with guidelines for new property investors."
        author="James Smith"
        date="12 Nov 2024"
        readTime="8 min Read"
        // coverUrl="/cover.jpg"
      />
      <ArticleWithTOC tocItems={toc} sections={sections} />
      <RelatedPosts posts={posts} />
      <CommonQuestion/>
      <InnovationHero/>
    </>
  );
}

export default page;

