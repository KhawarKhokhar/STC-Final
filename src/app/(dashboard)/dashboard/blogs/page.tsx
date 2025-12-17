"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  MessageCircleMore,
  Plus,
  Loader2,
} from "lucide-react";
import {
  Blog,
  BlogSection,
  createBlog,
  deleteBlog,
  listBlogs,
  setBlogPublished,
  updateBlog,
} from "@/lib/blogs";
import { uploadImageUnsigned } from "@/lib/cloudinary";

type FormState = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  sections: BlogSection[];
  coverPreview: string;
  coverFile: File | null;
  coverImagePublicId?: string;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  author: "",
  category: "General",
  readTime: "",
  published: false,
  sections: [{ heading: "", body: "" }],
  coverPreview: "",
  coverFile: null,
  coverImagePublicId: undefined,
};

function formatDate(ms?: number) {
  if (!ms) return "";
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogsDashboardPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await listBlogs(true);
      setBlogs(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  }

  const drafts = useMemo(() => blogs.filter((b) => !b.published), [blogs]);
  const publishedBlogs = useMemo(
    () => blogs.filter((b) => b.published),
    [blogs]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return blogs;
    const q = query.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        (b.author || "").toLowerCase().includes(q)
    );
  }, [blogs, query]);

  function onEdit(blog: Blog) {
    router.push(`/dashboard/blogs/${blog.id}/edit`);
  }

  function onPickCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((p) => ({
      ...p,
      coverFile: file,
      coverPreview: URL.createObjectURL(file),
    }));
  }

  function updateSection(idx: number, key: keyof BlogSection, value: string) {
    setForm((p) => {
      const next = [...p.sections];
      next[idx] = { ...next[idx], [key]: value };
      return { ...p, sections: next };
    });
  }

  function addSection() {
    setForm((p) => ({
      ...p,
      sections: [...p.sections, { heading: "", body: "" }],
    }));
  }

  function removeSection(idx: number) {
    setForm((p) => ({
      ...p,
      sections: p.sections.filter((_, i) => i !== idx),
    }));
  }

  async function saveBlog() {
    setSaving(true);
    setError(null);
    try {
      let coverImageUrl = form.coverPreview || undefined;
      let coverImagePublicId = form.coverImagePublicId;

      if (form.coverFile) {
        const uploaded = await uploadImageUnsigned(form.coverFile);
        coverImageUrl = uploaded.secure_url;
        coverImagePublicId = uploaded.public_id;
      }

      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        author: form.author,
        category: form.category,
        readTime: form.readTime,
        published: form.published,
        content: form.sections.filter((s) => s.heading.trim() || s.body.trim()),
        coverImageUrl,
        coverImagePublicId,
      };

      if (form.id) {
        await updateBlog(form.id, payload);
      } else {
        await createBlog(payload);
      }

      await refresh();
      setOpenModal(false);
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      setError("Failed to save blog.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(blogId: string) {
    if (!confirm("Delete this blog?")) return;
    await deleteBlog(blogId);
    await refresh();
  }

  async function togglePublish(blog: Blog) {
    await setBlogPublished(blog.id, !blog.published);
    await refresh();
  }

  return (
    <div className="h-full w-full bg-[#f1f5f2] overflow-y-auto">
      <div className="max-w-full  py-5 px-6">
        <div className="flex gap-6 items-start">
          {/* LEFT MAIN CONTENT COLUMN */}
          <div className="flex-1">
            {/* HERO */}
            <div className="flex gap-6">
              <section className="flex-1 px-6 py-9 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Welcome, Admin
                  </h2>
                  <p className="mt-3 text-md text-slate-500 max-w-md">
                    Manage your blogs. Publish drafts or add new posts without
                    changing the layout.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => router.push("/dashboard/blogs/add")}
                    className="
    px-6 py-3 rounded-full
    bg-[#3DD3CE] text-white text-sm font-medium
    shadow-sm
    flex items-center gap-2
    transition-all duration-300 ease-in-out
    hover:shadow-lg hover:-translate-y-0.5
    hover:bg-[#2BC1BC]
    active:translate-y-0
  "
                  >
                    <Plus className="w-4 h-4" /> Add Blog
                  </button>

                  <button
                    onClick={refresh}
                    className="
    px-6 py-3 rounded-full
    border border-[#3DD3CE]
    text-[#3DD3CE] text-sm font-medium
    bg-white
    transition-all duration-300 ease-in-out
    hover:bg-[#3DD3CE]
    hover:text-white
    hover:shadow-lg hover:-translate-y-0.5
    active:translate-y-0
  "
                  >
                    Refresh
                  </button>
                </div>
              </section>

              <section className="w-[360px] flex flex-col items-center justify-center px-6 py-6">
                <div className="w-full h-42 rounded-2xl bg-[#D9D9D9]" />
                <div className="flex items-center gap-2 mt-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                </div>
              </section>
            </div>

            {/* DRAFTS */}
            <div className="mt-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Drafts
                  </h3>
                  <span className="text-xs font-medium text-[#00B3AB]">
                    {drafts.length} items
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-70 rounded-2xl bg-[#D9D9D9] animate-pulse"
                        />
                      ))
                    : drafts.map((blog) => (
                        <div
                          key={blog.id}
                          className="group h-70 rounded-2xl bg-white border border-slate-200 overflow-hidden"
                        >
                          <div className="h-36 w-full bg-[#D9D9D9] overflow-hidden">
                            {blog.coverImageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={blog.coverImageUrl}
                                alt={blog.title}
                                className="h-full w-full object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="p-3 space-y-1">
                            <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                              {blog.title}
                            </p>
                            <p className="text-xs text-slate-400">
                              {formatDate(blog.createdAt)}
                            </p>
                            <div className="flex gap-2 text-xs">
                              <button
                                onClick={() => onEdit(blog)}
                                className="text-[#00B3AB]"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => togglePublish(blog)}
                                className="text-slate-500"
                              >
                                Publish
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </section>

              {/* ALL BLOGS */}
              <section className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  All Blogs
                </h3>

                <div className="w-100 flex items-center gap-3 mb-4">
                  <div className="flex-1 flex items-center rounded-sm bg-white border border-slate-200 px-3 py-2">
                    <Search className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      className="flex-1 bg-transparent text-xs text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                  <button className="flex items-center gap-1 rounded-sm bg-white border border-slate-200 px-4 py-2 text-xs text-slate-500">
                    Filter
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                <div className="bg-white rounded-sm shadow-sm divide-y divide-slate-100">
                  {loading ? (
                    <div className="p-4 text-sm text-slate-500">Loading...</div>
                  ) : (
                    filtered.map((blog) => (
                      <div
                        key={blog.id}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <div className="flex items-center gap-5">
                          <div className="h-10 w-10 rounded-sm bg-[#D9D9D9] overflow-hidden">
                            {blog.coverImageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={blog.coverImageUrl}
                                alt={blog.title}
                                className="h-full w-full object-cover"
                              />
                            ) : null}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {blog.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {blog.category || "General"} •{" "}
                              {blog.published ? "Published" : "Draft"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{formatDate(blog.updatedAt)}</span>
                          <button
                            onClick={() => togglePublish(blog)}
                            className="text-[#00B3AB]"
                          >
                            {blog.published ? "Unpublish" : "Publish"}
                          </button>
                          <button onClick={() => onEdit(blog)}>Edit</button>
                          <button
                            onClick={() => onDelete(blog.id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="w-[320px] flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-slate-900">Published</h3>
            <section className="px-2">
              <div className="space-y-3">
                {publishedBlogs.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl bg-white px-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-sm bg-[#D9D9D9] overflow-hidden">
                        {item.coverImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.coverImageUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[12px] text-slate-400">
                          {item.author || "Unknown"}
                        </p>
                      </div>
                    </div>
                    <button
                      className="flex items-center justify-center text-slate-400"
                      onClick={() => onEdit(item)}
                    >
                      <MessageCircleMore className="w-6 h-6" />
                    </button>
                  </div>
                ))}
                {publishedBlogs.length === 0 && (
                  <p className="text-xs text-slate-500">
                    No published blogs yet.
                  </p>
                )}
              </div>
            </section>

            <h3 className="text-lg font-semibold text-slate-900">
              Quick Drafts
            </h3>
            <section className="px-2 flex-1">
              <div className="space-y-3">
                {drafts.slice(0, 3).map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-center gap-6 rounded-2xl px-3 py-1"
                  >
                    <div className="h-24 w-16 rounded-xl bg-[#D9D9D9] shrink-0 overflow-hidden">
                      {blog.coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={blog.coverImageUrl}
                          alt={blog.title}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium text-slate-900 line-clamp-2">
                        {blog.title}
                      </p>
                      <p className="mt-1 text-[20px] text-[#14213D]">Draft</p>
                      <button
                        onClick={() => togglePublish(blog)}
                        className="px-6 py-2 rounded-full bg-[#3DD3CE] text-white text-[11px] font-medium self-start"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                ))}
                {drafts.length === 0 && (
                  <p className="text-xs text-slate-500">No drafts available.</p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">
                {form.id ? "Edit Blog" : "Add New Blog"}
              </h3>
              <button
                onClick={() => setOpenModal(false)}
                className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-600">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600">Slug</label>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, slug: e.target.value }))
                    }
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600">Excerpt</label>
                  <textarea
                    rows={3}
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, excerpt: e.target.value }))
                    }
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600">Author</label>
                    <input
                      value={form.author}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, author: e.target.value }))
                      }
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600">Category</label>
                    <input
                      value={form.category}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, category: e.target.value }))
                      }
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="text-xs text-slate-600">Read time</label>
                    <input
                      value={form.readTime}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, readTime: e.target.value }))
                      }
                      className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                    />
                  </div>
                  <label className="text-xs text-slate-600 flex items-center gap-2 mt-5">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, published: e.target.checked }))
                      }
                    />
                    Published
                  </label>
                </div>

                <div>
                  <label className="text-xs text-slate-600">Cover image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onPickCover}
                    className="mt-1 block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-medium file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {form.coverPreview && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.coverPreview}
                        alt="preview"
                        className="w-full h-36 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-900">
                    Sections
                  </label>
                  <button
                    onClick={addSection}
                    className="text-xs text-[#00B3AB] flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Section
                  </button>
                </div>

                {form.sections.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 p-3 space-y-2 bg-slate-50"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">
                        Section {idx + 1}
                      </span>
                      {form.sections.length > 1 && (
                        <button
                          onClick={() => removeSection(idx)}
                          className="text-xs text-red-500"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      value={s.heading}
                      onChange={(e) =>
                        updateSection(idx, "heading", e.target.value)
                      }
                      placeholder="Heading"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                    />
                    <textarea
                      rows={3}
                      value={s.body}
                      onChange={(e) =>
                        updateSection(idx, "body", e.target.value)
                      }
                      placeholder="Paragraph"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-xl text-sm bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  saveBlog().catch((e) => console.error(e));
                }}
                className="px-4 py-2 rounded-xl text-sm bg-slate-900 hover:bg-slate-800 text-white inline-flex items-center gap-2"
                disabled={saving}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {form.id ? "Save Changes" : "Add Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
