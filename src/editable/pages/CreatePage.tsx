'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, Send } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'
const DEFAULT_TASK = (SITE_CONFIG.tasks.find((task) => task.key === 'article')?.key || SITE_CONFIG.tasks[0]?.key || 'article') as TaskKey

const fieldClass =
  'rounded-2xl border border-white/10 bg-white px-5 py-4 text-sm font-bold text-[#120021] outline-none transition placeholder:text-[#120021]/35 focus:border-pink-300 focus:ring-4 focus:ring-pink-300/15'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const task = DEFAULT_TASK
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--editable-page-bg)] px-4 py-16 text-white sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.05] shadow-[0_30px_100px_rgba(0,0,0,.35)] backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex min-h-72 items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(246,107,180,.32),transparent_34%),#15051f]">
              <Lock className="h-20 w-20 text-pink-200/85" />
            </div>
            <div className="p-8 md:p-12">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-pink-300">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/60">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-6 py-3 text-sm font-black text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-6 py-3 text-sm font-black text-white">Register</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen overflow-hidden bg-[var(--editable-page-bg)] text-white">
        <section className="relative mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="relative grid gap-8 rounded-[2.8rem] border border-white/10 bg-white/[.05] p-6 shadow-[0_30px_100px_rgba(0,0,0,.38)] backdrop-blur lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
            <aside className="flex flex-col justify-center rounded-[2.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,255,255,.03))] p-8">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-pink-300">Publishing workspace</p>
              <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl lg:text-7xl">Create content with a cleaner flow.</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/60">Add the title, category, links, image, summary, and body content in one focused editor. No extra cards, no clutter.</p>
            </aside>

            <form onSubmit={submit} className="rounded-[2.2rem] border border-white/10 bg-[#080011] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-pink-300">Create post</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.06em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#120021]">{session.name}</span>
              </div>

              <div className="mt-7 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-28 resize-y`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-52 resize-y`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-emerald-100">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-100/75">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--editable-cta-bg)] px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(246,107,180,.25)]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
