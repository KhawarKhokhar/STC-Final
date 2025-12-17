"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  Plus,
  ImageUp,
  PencilLine,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { uploadImageUnsigned } from "@/lib/cloudinary";
import { AdminProfile, upsertAdminProfile } from "@/lib/admins";
import { onValue, ref } from "firebase/database";
import { rdb } from "@/lib/firebase";

type NewAdminForm = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  role: string;
  location: string;
  avatarFile: File | null;
  avatarPreview: string;
  avatarPublicId?: string;
};

export default function AdminProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<AdminProfile>({
    id: "",
    name: "",
    email: "",
    title: "",
    phone: "",
    location: "",
    role: "Admin",
    avatarUrl: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState("");

  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [newAdmin, setNewAdmin] = useState<NewAdminForm>({
    id: undefined,
    name: "",
    email: "",
    phone: "",
    title: "",
    role: "Admin",
    location: "",
    avatarFile: null,
    avatarPreview: "",
    avatarPublicId: "",
  });
  const [savingNewAdmin, setSavingNewAdmin] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const initials = useMemo(
    () =>
      (profile.name || "Admin")
        .split(" ")
        .map((p) => p.charAt(0).toUpperCase())
        .slice(0, 2)
        .join(""),
    [profile.name]
  );

  // Seed form with existing admin profile
  useEffect(() => {
    if (!user) return;
    setProfile((prev) => ({
      ...prev,
      id: user.uid,
      uid: user.uid,
      email: prev.email || user.email || "",
      name: prev.name || user.displayName || "Admin",
    }));
    const adminsRef = ref(rdb, "admins");
    const unsub = onValue(adminsRef, (snap) => {
      const val = snap.val() as Record<string, AdminProfile> | null;
      if (!val) {
        setAdmins([]);
        return;
      }
      const rows = Object.entries(val).map(([id, item]) => ({
        ...item,
        id,
      }));
      setAdmins(rows);

      const mine = rows.find(
        (a) => a.id === user.uid || a.uid === user.uid
      );
      if (mine) {
        setProfile((prev) => ({ ...prev, ...mine, id: user.uid }));
        setAvatarPreview(mine.avatarUrl || "");
      }
    });
    return () => unsub();
  }, [user]);

  function onPickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSaveProfile() {
    if (!user) return;
    setSavingProfile(true);
    setError("");
    try {
      let avatarUrl = profile.avatarUrl || "";
      let avatarPublicId = profile.avatarPublicId || "";

      if (avatarFile) {
        const up = await uploadImageUnsigned(avatarFile);
        avatarUrl = up.secure_url;
        avatarPublicId = up.public_id;
      }

      const payload = await upsertAdminProfile({
        ...profile,
        id: user.uid,
        uid: user.uid,
        email: profile.email || user.email || "",
        avatarUrl,
        avatarPublicId,
      });
      setProfile(payload);
      setAvatarFile(null);
      setAvatarPreview(payload.avatarUrl || avatarPreview);
    } catch (err: any) {
      setError(err?.message || "Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  function onPickNewAdminAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewAdmin((p) => ({
      ...p,
      avatarFile: file,
      avatarPreview: URL.createObjectURL(file),
    }));
  }

  async function handleSaveAdmin() {
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) {
      setError("Name and email are required to add or update an admin.");
      return;
    }
    setSavingNewAdmin(true);
    setError("");
    try {
      let avatarUrl = newAdmin.avatarPreview || "";
      let avatarPublicId = newAdmin.avatarPublicId || "";
      if (newAdmin.avatarFile) {
        const up = await uploadImageUnsigned(newAdmin.avatarFile);
        avatarUrl = up.secure_url;
        avatarPublicId = up.public_id;
      }

      await upsertAdminProfile({
        id: newAdmin.id,
        name: newAdmin.name.trim(),
        email: newAdmin.email.trim(),
        phone: newAdmin.phone.trim(),
        title: newAdmin.title.trim(),
        role: newAdmin.role.trim() || "Admin",
        location: newAdmin.location.trim(),
        avatarUrl,
        avatarPublicId,
      });

      setNewAdmin({
        id: undefined,
        name: "",
        email: "",
        phone: "",
        title: "",
        role: "Admin",
        location: "",
        avatarFile: null,
        avatarPreview: "",
        avatarPublicId: "",
      });
      setAdminModalOpen(false);
    } catch (err: any) {
      setError(err?.message || "Failed to save admin.");
    } finally {
      setSavingNewAdmin(false);
    }
  }

  function openCreateAdminModal() {
    setNewAdmin({
      id: undefined,
      name: "",
      email: "",
      phone: "",
      title: "",
      role: "Admin",
      location: "",
      avatarFile: null,
      avatarPreview: "",
      avatarPublicId: "",
    });
    setAdminModalOpen(true);
  }

  function openEditAdmin(admin: AdminProfile) {
    setNewAdmin({
      id: admin.id,
      name: admin.name || "",
      email: admin.email || "",
      phone: admin.phone || "",
      title: admin.title || "",
      role: admin.role || "Admin",
      location: admin.location || "",
      avatarFile: null,
      avatarPreview: admin.avatarUrl || "",
      avatarPublicId: admin.avatarPublicId || "",
    });
    setAdminModalOpen(true);
  }

  return (
    <main className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full px-6 py-8 space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 flex items-center gap-2">
              <User className="h-4 w-4" /> Admin Profile
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              Your profile & access
            </h1>
            <p className="text-sm text-slate-500">
              Update your details, avatar, and manage additional admins.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openCreateAdminModal}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" /> Add admin
            </button>
            <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
              <Upload className="h-4 w-4" /> Upload avatar
              <input type="file" accept="image/*" onChange={onPickAvatar} className="hidden" />
            </label>
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
            >
              <Save className="h-4 w-4" /> {savingProfile ? "Saving..." : "Save"}
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          {/* Profile form */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Personal info</h2>
              <p className="text-sm text-slate-500 mb-4">
                This information appears in the header and notifications.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name">
                  <input
                    className="input"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Admin User"
                  />
                </Field>
                <Field label="Job title">
                  <input
                    className="input"
                    value={profile.title || ""}
                    onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Administrator"
                  />
                </Field>
                <Field label="Email">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      className="input pl-9"
                      value={profile.email}
                      onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                      placeholder="admin@example.com"
                    />
                  </div>
                </Field>
                <Field label="Phone">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      className="input pl-9"
                      value={profile.phone || ""}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+1 555 0100"
                    />
                  </div>
                </Field>
                <Field label="Location" className="sm:col-span-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      className="input pl-9"
                      value={profile.location || ""}
                      onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                      placeholder="Remote, US"
                    />
                  </div>
                </Field>
                <Field label="Role">
                  <input
                    className="input"
                    value={profile.role || ""}
                    onChange={(e) => setProfile((p) => ({ ...p, role: e.target.value }))}
                    placeholder="Admin"
                  />
                </Field>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Team admins</h2>
                <p className="text-sm text-slate-500">
                  Add or edit admins (avatars stored in Cloudinary).
                </p>
              </div>
              <button
                onClick={openCreateAdminModal}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4" /> New admin
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="mx-auto h-24 w-24 rounded-full object-cover border border-slate-100"
                />
              ) : (
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-white grid place-items-center text-2xl font-semibold">
                  {initials || "AU"}
                </div>
              )}
              <p className="mt-3 text-sm font-semibold text-slate-900">
                {profile.name || "Admin User"}
              </p>
              <p className="text-xs text-slate-500">{profile.title || "Administrator - full access"}</p>
              <div className="mt-4 space-y-2 text-xs text-left">
                <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span>Role</span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-800">
                    {profile.role || "Admin"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <span>Email</span>
                  <span className="text-[11px] text-slate-600 truncate max-w-[140px] text-right">
                    {profile.email || "--"}
                  </span>
                </div>
                {profile.phone && (
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                    <span>Phone</span>
                    <span className="text-[11px] text-slate-600 truncate max-w-[140px] text-right">
                      {profile.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <User className="h-4 w-4" /> Admins on file ({admins.length})
              </h3>
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {admins.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    {a.avatarUrl ? (
                      <img
                        src={a.avatarUrl}
                        alt={a.name}
                        className="h-10 w-10 rounded-full object-cover border border-slate-100"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-slate-200 grid place-items-center text-xs font-semibold text-slate-700">
                        {(a.name || "A")
                          .split(" ")
                          .map((p) => p.charAt(0).toUpperCase())
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {a.name || "Untitled"}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{a.email}</p>
                    </div>
                    <button
                      onClick={() => openEditAdmin(a)}
                      className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white"
                      aria-label="Edit admin"
                    >
                      <PencilLine className="h-4 w-4" />
                    </button>
                    <span className="text-[11px] rounded-full bg-white px-2 py-1 border border-slate-200 text-slate-700">
                      {a.role || "Admin"}
                    </span>
                  </div>
                ))}

                {admins.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs text-slate-500">
                    No admins added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">
                {newAdmin.id ? "Edit admin" : "Add new admin"}
              </h3>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center"
                aria-label="Close admin modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  className="input"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Teammate name"
                />
              </Field>
              <Field label="Email">
                <input
                  className="input"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin((p) => ({ ...p, email: e.target.value }))}
                  placeholder="email@company.com"
                />
              </Field>
              <Field label="Phone">
                <input
                  className="input"
                  value={newAdmin.phone}
                  onChange={(e) => setNewAdmin((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+1 555 0100"
                />
              </Field>
              <Field label="Job title">
                <input
                  className="input"
                  value={newAdmin.title}
                  onChange={(e) => setNewAdmin((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Operations"
                />
              </Field>
              <Field label="Role">
                <input
                  className="input"
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin((p) => ({ ...p, role: e.target.value }))}
                  placeholder="Admin / Manager"
                />
              </Field>
              <Field label="Location">
                <input
                  className="input"
                  value={newAdmin.location}
                  onChange={(e) => setNewAdmin((p) => ({ ...p, location: e.target.value }))}
                  placeholder="City, Country"
                />
              </Field>
              <Field label="Profile image" className="sm:col-span-2">
                <label className="flex items-center justify-between rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 cursor-pointer hover:border-slate-300">
                  <span className="flex items-center gap-2">
                    <ImageUp className="h-4 w-4 text-slate-500" />
                    {newAdmin.avatarPreview ? "Change image" : "Upload image"}
                  </span>
                  <input type="file" accept="image/*" onChange={onPickNewAdminAvatar} className="hidden" />
                  {newAdmin.avatarPreview ? (
                    <span className="text-xs text-emerald-700">Ready to upload</span>
                  ) : (
                    <span className="text-xs text-slate-400">Cloudinary unsigned preset</span>
                  )}
                </label>
                {newAdmin.avatarPreview && (
                  <img
                    src={newAdmin.avatarPreview}
                    alt="new admin preview"
                    className="mt-2 h-28 w-full rounded-xl object-cover border border-slate-100"
                  />
                )}
              </Field>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setAdminModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSaveAdmin().catch((e) => console.error(e));
                }}
                disabled={savingNewAdmin}
                className="px-4 py-2 rounded-xl text-sm bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
              >
                {savingNewAdmin ? "Saving..." : newAdmin.id ? "Save changes" : "Add admin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1 text-xs font-semibold text-slate-600 ${className || ""}`}>
      {label}
      {children}
    </label>
  );
}


