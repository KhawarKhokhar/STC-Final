"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import InnovationHero from "@/components/reusable/blog/InnovationHero";
import ArticleWithTOC, {
  Section as TocSection,
  TocItem,
} from "@/components/BlogDetails/ArticleWithTOC";
import BlogDetail from "@/components/BlogDetails/BlogDetailHeader";
import RelatedPosts from "@/components/BlogDetails/RelatedPosts";
import CommonQuestion from "@/components/reusable/common/CommonQuestion";
import { Blog, getBlog, listBlogs } from "@/lib/blogs";

function BlogDetailsPage() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        const [detail, all] = await Promise.all([
          getBlog(id),
          listBlogs(false),
        ]);

        if (!mounted) return;

        if (!detail) {
          setError("Blog not found.");
        } else {
          setBlog(detail);
        }

        setRelated(all.filter((b) => b.id !== id).slice(0, 3));
      } catch (err) {
        console.error(err);
        if (mounted) setError("Unable to load blog details.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const formatDate = (ms?: number) =>
    ms
      ? new Date(ms).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";

  const readTime = useMemo(() => {
    if (!blog) return "";
    const words =
      blog.content?.reduce((acc, s) => {
        const body = (s as any)?.body || (s as any)?.description || "";
        const text = body.replace(/<[^>]+>/g, " ");
        return acc + (text.split(/\s+/)?.filter(Boolean).length || 0);
      }, 0) ?? 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }, [blog]);

  const tocItems: TocItem[] = useMemo(() => {
    if (!blog?.content?.length) return [];
    return blog.content.map((s, idx) => ({
      id: `section-${idx + 1}`,
      title: s.heading || `Section ${idx + 1}`,
    }));
  }, [blog]);

  const sections: TocSection[] = useMemo(() => {
    if (!blog?.content?.length) return [];
    return blog.content.map((s, idx) => ({
      id: `section-${idx + 1}`,
      title: s.heading || `Section ${idx + 1}`,
      description: (s as any)?.body || (s as any)?.description || "",
      imageUrl: (s as any)?.imageUrl,
    }));
  }, [blog]);

  if (!id) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-lg text-slate-600">Missing blog id.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="h-9 w-32 rounded-full bg-slate-200 animate-pulse" />
        <div className="mt-4 h-10 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
        <div className="mt-3 h-6 w-2/4 rounded-lg bg-slate-200 animate-pulse" />
        <div className="mt-8 h-80 w-full rounded-2xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-lg text-slate-600">{error || "Blog not found."}</p>
      </div>
    );
  }

  return (
    <>
      <BlogDetail
        title={blog.title}
        subtitle={blog.excerpt}
        author={blog.author}
        date={formatDate(blog.createdAt)}
        readTime={blog.readTime || readTime}
        coverUrl={blog.coverImageUrl}
      />
      {sections.length ? (
        <ArticleWithTOC tocItems={tocItems} sections={sections} />
      ) : null}
      <RelatedPosts
        posts={related.map((r) => ({
          id: r.id,
          title: r.title,
          summary: r.excerpt,
          href: `/blog-details/${r.id}`,
          imageUrl: r.coverImageUrl,
        }))}
      />
      <CommonQuestion />
      <InnovationHero />
    </>
  );
}

export default BlogDetailsPage;
