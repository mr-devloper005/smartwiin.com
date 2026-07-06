import Link from 'next/link'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function poolOf(posts: SitePost[], sections: HomeTimeSection[]) {
  const seen = new Set<string>()
  return [...posts, ...sections.flatMap((section) => section.posts)].filter((post) => {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function safeTitle(post?: SitePost) {
  return post?.title?.trim() || 'A new story is taking shape'
}

function StoryImage({ post, className = '' }: { post?: SitePost; className?: string }) {
  return <img src={getEditablePostImage(post)} alt={safeTitle(post)} className={`h-full w-full object-cover ${className}`} />
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections)
  const lead = pool[0]
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#120021]">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute left-[42%] top-[18%] h-80 w-80 rounded-full bg-violet-500/15 blur-[100px]" />
      <div className={`${container} grid min-h-[650px] items-stretch lg:grid-cols-[1.05fr_.95fr]`}>
        <div className="relative z-10 flex flex-col justify-center py-20 lg:pr-16">
          <span className="w-fit rounded-full border border-pink-400/70 px-4 py-1.5 text-xs font-bold tracking-[.08em] text-pink-100">Stories with ideas worth sharing</span>
          <h1 className="mt-7 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-.06em] text-white sm:text-6xl lg:text-7xl">
            Read deeply. <span className="bg-[linear-gradient(100deg,#c776ff,#ff72bb,#ffad82)] bg-clip-text text-transparent">Write boldly.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">A lively home for useful articles, thoughtful profiles, and the people creating work that moves conversations forward.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,#b968f2,#f76db3,#ff9c7c)] px-7 py-3.5 text-sm font-extrabold uppercase tracking-[.12em] text-white shadow-[0_12px_38px_rgba(236,93,181,.24)]">Explore stories <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/create" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-extrabold uppercase tracking-[.12em] text-white hover:bg-white/10">Start writing</Link>
          </div>
          <form action="/search" className="mt-10 flex max-w-xl items-center rounded-2xl border border-white/15 bg-white/[.07] p-2 backdrop-blur-xl">
            <Search className="ml-3 h-5 w-5 text-pink-300" />
            <input name="q" placeholder="Search ideas, writers and topics" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40" />
            <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#180322]">Search</button>
          </form>
        </div>
        <div className="relative min-h-[480px] overflow-hidden rounded-b-[44px] border-x border-b border-white/15 lg:min-h-full lg:rounded-b-[54px]">
          <StoryImage post={lead} className="opacity-65 transition duration-1000 hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,0,34,.15),rgba(23,2,40,.85))]" />
          <div className="absolute inset-x-8 bottom-8 rounded-[28px] border border-white/25 bg-[#180827]/75 p-6 backdrop-blur-xl sm:inset-x-10">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-pink-300">Featured now</p>
            <h2 className="mt-3 line-clamp-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">{safeTitle(lead)}</h2>
            {lead ? <Link href={postHref(primaryTask, lead, primaryRoute)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">Read the story <ArrowRight className="h-4 w-4 text-pink-300" /></Link> : null}
          </div>
          <span className="absolute right-8 top-8 h-20 w-20 animate-pulse rounded-full border border-pink-300/40 bg-pink-400/10" />
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = poolOf(posts, timeSections).slice(0, 10)
  if (!items.length) return null
  const loop = [...items, ...items]
  return (
    <section className="overflow-hidden border-b border-white/10 py-14">
      <div className={`${container} mb-7 flex items-end justify-between gap-6`}>
        <div><p className="text-xs font-bold uppercase tracking-[.22em] text-pink-400">Fresh perspectives</p><h2 className="mt-2 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Stories in motion</h2></div>
        <Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-bold text-pink-300 sm:flex">View all <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="home-marquee flex w-max gap-5 px-5">
        {loop.map((post, index) => (
          <Link key={`${post.id || post.slug}-${index}`} href={postHref(primaryTask, post, primaryRoute)} className="group w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/[.06] sm:w-[340px]">
            <div className="h-48 overflow-hidden"><StoryImage post={post} className="transition duration-700 group-hover:scale-110" /></div>
            <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-pink-300">{getEditableCategory(post)}</p><h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug">{safeTitle(post)}</h3></div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections)
  const feature = pool[1] || pool[0]
  const compact = pool.slice(2, 6)
  if (!feature) return null
  return (
    <section className="relative py-20 sm:py-24">
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      <div className={`${container} relative`}>
        <div className="mb-10 text-center"><p className="text-sm font-semibold text-pink-400">Editor’s selection</p><h2 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">Ideas, expertise and voices that deserve your attention.</h2></div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <Link href={postHref(primaryTask, feature, primaryRoute)} className="group relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/15">
            <StoryImage post={feature} className="absolute inset-0 transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(9,0,20,.95))]" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10"><span className="rounded-full bg-pink-400 px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-[#17041f]">Featured read</span><h3 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">{safeTitle(feature)}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-white/65">{getEditableExcerpt(feature, 180) || 'Open this story and discover a new perspective from our growing community.'}</p></div>
          </Link>
          <div className="grid gap-4">
            {compact.map((post, index) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid grid-cols-[105px_1fr] items-center gap-5 rounded-2xl border border-white/15 bg-[#1a0d25] p-3 hover:border-pink-400/50"><div className="h-28 overflow-hidden rounded-xl"><StoryImage post={post} className="transition duration-500 group-hover:scale-110" /></div><div className="min-w-0 pr-3"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-pink-300">0{index + 1} · {getEditableCategory(post)}</p><h3 className="mt-2 line-clamp-3 text-lg font-bold leading-snug">{safeTitle(post)}</h3></div></Link>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections).slice(6, 15)
  if (!pool.length) return null
  return (
    <section className="border-y border-white/10 bg-[#12061d] py-20">
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start"><p className="text-sm font-semibold text-pink-400">Explore the community</p><h2 className="mt-3 text-4xl font-extrabold tracking-[-.05em]">Discover more than a feed.</h2><p className="mt-5 leading-8 text-white/60">Follow ideas across articles and profiles, meet the people behind the work, and find something useful every time you visit.</p></div>
          <div className="grid gap-5 sm:grid-cols-2">
            {pool.map((post, index) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`group overflow-hidden rounded-2xl border border-white/15 bg-[#21142b] ${index === 0 || index === 5 ? 'sm:col-span-2 sm:grid sm:grid-cols-[.9fr_1.1fr]' : ''}`}><div className={`${index === 0 || index === 5 ? 'h-64 sm:h-full' : 'h-48'} overflow-hidden`}><StoryImage post={post} className="transition duration-700 group-hover:scale-105" /></div><div className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-pink-300">{getEditableCategory(post)}</p><h3 className="mt-3 text-2xl font-extrabold leading-tight">{safeTitle(post)}</h3><p className="mt-3 line-clamp-3 text-sm leading-7 text-white/55">{getEditableExcerpt(post, 150)}</p></div></Link>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="py-20 sm:py-24">
      <div className={container}>
        <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-[linear-gradient(125deg,#24102f,#190924)] px-6 py-16 text-center sm:px-12">
          <div className="absolute inset-0 home-grid opacity-35" /><Sparkles className="relative mx-auto h-8 w-8 text-pink-300" /><h2 className="relative mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">Have a perspective worth publishing?</h2><p className="relative mx-auto mt-5 max-w-2xl leading-8 text-white/60">Create your profile, share an article, and become part of a community built around useful ideas.</p><div className="relative mt-8 flex flex-wrap justify-center gap-4"><Link href="/create" className="rounded-full bg-[linear-gradient(100deg,#b968f2,#f76db3,#ff9c7c)] px-7 py-3.5 text-sm font-extrabold uppercase tracking-[.12em]">Create a post</Link></div>
        </div>
      </div>
    </section>
  )
}
