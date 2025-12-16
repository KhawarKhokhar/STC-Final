"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { ArrowLeft, CheckCircle2, FileText, Image as ImageIcon, Loader2, Save, Upload } from "lucide-react";
import { getBlog, updateBlog } from "@/lib/blogs";
import { uploadImageUnsigned } from "@/lib/cloudinary";
import LexicalRichTextEditor from "@/components/Blog/LexicalRichTextEditor";

type Section = {
  id: string;
  heading: string;
  body: string;
  imageUrl?: string;
  imagePublicId?: string;
};

const toPlainText = (html: string) => {
  if (!html) return "";
  if (typeof document === "undefined") return html.replace(/<[^>]+>/g, " ");
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export default function EditBlogPage() {
  const params = useParams();
  const blogId = (params?.id as string) || "";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("General");
  const [readTime, setReadTime] = useState("");
  const [published, setPublished] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [coverImagePublicId, setCoverImagePublicId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!blogId) return;
    let mounted = true;
    (async () => {
      try {
        const blog = await getBlog(blogId);
        if (!mounted) return;
        if (!blog) {
          setError("Blog not found");
          return;
        }
        setTitle(blog.title);
        setSlug(blog.slug);
        setExcerpt(blog.excerpt);
        setAuthor(blog.author);
        setCategory(blog.category || "General");
        setReadTime(blog.readTime || "");
        setPublished(Boolean(blog.published));
        setSections(
          (blog.content || []).map((s) => ({
            id: uuid(),
            heading: s.heading,
            body: s.body,
            imageUrl: s.imageUrl,
            imagePublicId: s.imagePublicId,
          }))
        );
        setCoverPreview(blog.coverImageUrl || "");
        setCoverImagePublicId(blog.coverImagePublicId);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Unable to load blog.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [blogId]);

  function updateSection(idx: number, next: Partial<Section>) {
    setSections((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], ...next };
      return copy;
    });
  }

  function addSection() {
    setSections((prev) => [...prev, { id: uuid(), heading: "", body: "" }]);
  }

  function removeSection(id: string) {
    setSections((prev) => (prev.length === 1 ? prev : prev.filter((s) => s.id !== id)));
  }

  const totalWords = useMemo(
    () =>
      sections.reduce(
        (acc, s) => acc + toPlainText(s.body).split(/\s+/).filter(Boolean).length,
        0
      ),
    [sections]
  );

  async function handleSave() {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      let coverImageUrl = coverPreview || undefined;
      let nextCoverPublicId = coverImagePublicId;

      if (coverFile) {
        const uploaded = await uploadImageUnsigned(coverFile);
        coverImageUrl = uploaded.secure_url;
        nextCoverPublicId = uploaded.public_id;
      }

      const sanitizedSections = sections
        .map(({ heading, body, imageUrl, imagePublicId }) => ({
          heading: heading.trim() || title || "Untitled",
          body: body || "",
          imageUrl: imageUrl || undefined,
          imagePublicId: imagePublicId || undefined,
        }))
        .filter((s) => toPlainText(s.body).trim() || s.imageUrl);

      const autoRead = readTime?.trim()
        ? readTime
        : `${Math.max(1, Math.ceil(totalWords / 200))} min read`;

      await updateBlog(blogId, {
        title,
        slug,
        excerpt,
        author,
        category,
        readTime: autoRead,
        published,
        content: sanitizedSections.length ? sanitizedSections : [{ heading: title, body: excerpt }],
        coverImageUrl,
        coverImagePublicId: nextCoverPublicId,
      });

      setSuccess(true);
      setTimeout(() => router.push("/dashboard/blogs"), 800);
    } catch (err) {
      console.error(err);
      setError("Failed to save blog.");
    } finally {
      setSaving(false);
    }
  }

  if (!blogId) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-lg text-slate-600">Missing blog id.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f5f2] flex items-center justify-center text-slate-600">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f2] pb-20 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/blogs")}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-slate-700 shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blogs
          </button>
          {success && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              Saved!
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-700">
                <FileText className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Edit Blog</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title">
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
                </Field>
                <Field label="Slug">
                  <input value={slug} onChange={(e) => setSlug(e.target.value)} className="input" />
                </Field>
                <Field label="Author">
                  <input value={author} onChange={(e) => setAuthor(e.target.value)} className="input" />
                </Field>
                <Field label="Category">
                  <input value={category} onChange={(e) => setCategory(e.target.value)} className="input" />
                </Field>
              </div>

              <Field label="Excerpt">
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="input min-h-[80px]"
                  placeholder="Short summary"
                />
              </Field>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Content</h2>
                </div>
                <div className="text-xs text-slate-500">
                  {totalWords} words • {sections.length} section(s)
                </div>
              </div>

              {sections.map((section, idx) => (
                <div key={section.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Section {idx + 1}
                    </span>
                    {sections.length > 1 && (
                      <button onClick={() => removeSection(section.id)} className="text-xs text-red-500">
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    value={section.heading}
                    onChange={(e) => updateSection(idx, { heading: e.target.value })}
                    className="input"
                    placeholder="Section heading"
                  />
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-600">Body</span>
                      <label className="text-xs text-[#00B3AB] cursor-pointer flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        Add image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              const uploaded = await uploadImageUnsigned(file);
                              updateSection(idx, {
                                imageUrl: uploaded.secure_url,
                                imagePublicId: uploaded.public_id,
                              });
                            } catch (err) {
                              console.error(err);
                              setError("Image upload failed");
                            }
                          }}
                        />
                      </label>
                    </div>
                    {section.imageUrl ? (
                      <div className="mb-3 overflow-hidden rounded-lg border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={section.imageUrl} alt="section" className="w-full h-40 object-cover" />
                      </div>
                    ) : null}
                    <div className="rounded-xl border border-slate-200 bg-white">
                      <LexicalRichTextEditor
                        initialContent={section.body}
                        onChange={(html) => updateSection(idx, { body: html })}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3">
                <button
                  onClick={addSection}
                  className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm border border-slate-200"
                >
                  + Add section
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 space-y-3">
              <div className="flex items-center gap-2 text-slate-700">
                <ImageIcon className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Cover</h2>
              </div>
              <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500 cursor-pointer hover:bg-slate-100">
                <Upload className="w-5 h-5" />
                <span>Upload cover image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCoverFile(file);
                      setCoverPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              {coverPreview && (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverPreview} alt="preview" className="w-full h-48 object-cover" />
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Read time">
                  <input
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="input"
                    placeholder="e.g. 5 min read"
                  />
                </Field>
                <Field label="Publish">
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    />
                    <span className="text-sm text-slate-700">Published</span>
                  </div>
                </Field>
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E1A35] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0E1A35]/90 disabled:opacity-70"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          background: white;
        }
        .input:focus {
          box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.1);
        }
        .ProseMirror {
          min-height: 180px;
          padding: 12px;
          outline: none;
        }
        .ProseMirror p {
          margin: 0 0 8px 0;
          line-height: 1.6;
        }
        .ProseMirror ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin: 0 0 8px 0;
        }
        .ProseMirror blockquote {
          border-left: 4px solid rgb(226 232 240);
          padding-left: 0.75rem;
          color: #475569;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600">
      {label}
      {children}
    </label>
  );
}
