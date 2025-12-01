// app/components/FeedWithSidebar.tsx
"use client";

import React from "react";
import {
  Heart,
  Share2,
  MessageSquare,
  Eye,
  Calendar,
  MoreHorizontal,
  UserPlus,
  Check,
} from "lucide-react";

/* ----------------------------- Types ----------------------------- */
type Post = {
  id: number;
  author: string;
  badge: string; // Following / Music etc.
  title: string;
  date: string;
  views: string;
  comments: string;
  likes: string;
};

type MiniItem = {
  id: number | string;
  author: string;
  category: string;
  title: string;
  thumb?: string;
};

type Recommendation = {
  id: number | string;
  name: string;
  role: string;
  following?: boolean;
};

/* ----------------------------- Data ----------------------------- */
const POSTS: Post[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  author: i % 2 ? "Ronald Richards" : "Steven Gambardella",
  badge: i % 2 ? "Music" : "Following",
  title:
    i % 2
      ? "Stop Listening to Music – A Life-Changing Decision That Will Transform Your Mind and Productivity"
      : "Can You Solve This Apple vs. Orange Puzzle? A Tricky Interview Question from Apple!",
  date: i % 2 ? "Jan 31 – 03:30 PM" : "Feb 01 – 10:15 AM",
  views: i % 2 ? "1.5K" : "2.3K",
  comments: i % 2 ? "74" : "54",
  likes: i % 2 ? "114" : "224",
}));

const LATEST_NEWS: MiniItem[] = [
  {
    id: 1,
    author: "Robert Pattinson",
    category: "Game",
    title: "E-Sports Revolution: The Future of Competitive Gaming",
  },
  {
    id: 2,
    author: "Lucas White",
    category: "Food",
    title:
      "The Zesty World of Oranges: Benefits, Varieties, and Fun Facts!",
  },
  {
    id: 3,
    author: "Budiono Siregar",
    category: "Motivation",
    title: "Chasing Dreams: Turning Your Cita-Cita into Reality",
  },
];

const RECOMMENDS: Recommendation[] = [
  { id: 1, name: "William Stronghold", role: "Blogger, Podcaster" },
  { id: 2, name: "Budiono Siregar", role: "Blogger, Motivator", following: true },
];

const TRENDING: MiniItem[] = [
  ...LATEST_NEWS,
];

/* ---------------------------- Utilities ---------------------------- */
const cn = (...a: Array<string | false | null | undefined>) =>
  a.filter(Boolean).join(" ");

/* --------------------------- Subcomponents --------------------------- */

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <article className="rounded-xl border border-slate-200 bg-white shadow-sm p-2">
    {/* image placeholder + action */}
    <div className="relative h-44 rounded-t-xl bg-[#C4C4C4]">
      <button className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-slate-600 shadow hover:bg-white">
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {/* share floating on right middle */}
      <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow hover:bg-white">
        <Share2 className="h-4 w-4" />
      </button>
    </div>

    {/* meta strip */}
    <div className="flex items-center gap-2 px-3 pt-3 text-sm text-slate-500">
      <span className="inline-block h-5 w-5 rounded-full bg-slate-200" />
      <span className="text-slate-700 font-medium">{post.author}</span>
      <span className="text-slate-400">– {post.badge}</span>
    </div>

    {/* title */}
    <h3 className="px-3 pt-4 text-[16px] font-semibold text-slate-900 leading-snug">
      {post.title}
    </h3>

    {/* bottom meta */}
    <div className="mt-6 flex items-center justify-between border-t px-3 py-2 text-sm text-slate-500">
      <div className="flex items-center gap-2">
        <Calendar className="h-3.5 w-3.5" />
        <span>{post.date}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="inline-flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          {post.views}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageSquare className="h-3.5 w-3.5" />
          {post.comments}
        </span>
        <span className="inline-flex items-center gap-1">
          <Heart className="h-3.5 w-3.5" />
          {post.likes}
        </span>
      </div>
    </div>
  </article>
);

const WidgetHeader: React.FC<{ title: string; onSee?: () => void }> = ({
  title,
  onSee,
}) => (
  <div className="mb-3 flex items-center justify-between">
    <h4 className="text-[13px] font-semibold text-slate-700">{title}</h4>
    <button
      onClick={onSee}
      className="text-[11px] font-medium text-slate-500 hover:text-slate-700"
    >
      See more
    </button>
  </div>
);

const MiniListItem: React.FC<{ item: MiniItem }> = ({ item }) => (
  <li className="rounded-lg bg-white ring-1 ring-slate-200 p-3">
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-200" />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-slate-500">
          <span className="font-medium text-slate-700">{item.author}</span>
          <span className="mx-1">—</span>
          <span>{item.category}</span>
        </div>
        <div className="mt-0.5 line-clamp-2 text-[12px] font-semibold text-slate-900">
          {item.title}
        </div>
      </div>
      <div className="h-12 w-14 shrink-0 rounded-md bg-slate-200 ring-1 ring-slate-200" />
    </div>
  </li>
);

const FollowRow: React.FC<{ rec: Recommendation }> = ({ rec }) => (
  <li className="flex items-center justify-between rounded-lg bg-white p-3">
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-300 text-white">
        <UserPlus className="h-4 w-4" />
      </span>
      <div>
        <div className="text-[13px] font-medium text-slate-900">{rec.name}</div>
        <div className="text-[11px] text-slate-500">{rec.role}</div>
      </div>
    </div>
    <button
      className={cn(
        "rounded-md px-3 py-1 text-[11px] font-semibold",
        rec.following
          ? "bg-slate-800 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      )}
    >
      {rec.following ? (
        <span className="inline-flex items-center gap-1">
          <Check className="h-3.5 w-3.5" /> Unfollow
        </span>
      ) : (
        "Follow"
      )}
    </button>
  </li>
);

/* ----------------------------- Layout ----------------------------- */

const FeedWithSidebar: React.FC = () => {
  return (
    <section className="px-4 py-6 mb-20 md:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-5">
        {/* Left: feed */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {POSTS.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        {/* Right: sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-5">
          {/* Latest news */}
          <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <WidgetHeader title="Latest Tax Related News" />
            <ul className="space-y-3">
              {LATEST_NEWS.map((n) => (
                <MiniListItem key={n.id} item={n} />
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <WidgetHeader title="Recommendations to follow" />
            <ul className="space-y-3">
              {RECOMMENDS.map((r) => (
                <FollowRow key={r.id} rec={r} />
              ))}
            </ul>
          </div>

          {/* Trending */}
          <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <WidgetHeader title="Top Trending Articles" />
            <ul className="space-y-3">
              {TRENDING.map((t) => (
                <MiniListItem key={t.id} item={t} />
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FeedWithSidebar;
