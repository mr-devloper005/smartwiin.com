'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const footerLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Search', '/search'],
]

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  const authLinks = session ? [['Create', '/create']] : [['Login', '/login'], ['Register', '/signup']]

  return (
    <footer className="border-t border-white/10 bg-[#080011] text-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-20 items-center justify-center">
              <img src="/favicon.png?v=20260706" alt="" className="h-full w-full object-contain" />
            </span>
            <span className="text-xl font-extrabold tracking-[-.04em]">{SITE_CONFIG.name}</span>
          </Link>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[.24em] text-pink-300">Links</h3>
          <div className="mt-5 grid gap-3">
            {footerLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm text-white/55 hover:text-pink-300">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[.24em] text-pink-300">Community</h3>
          <div className="mt-5 grid gap-3">
            {authLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm text-white/55 hover:text-pink-300">
                {label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="text-left text-sm text-white/55 hover:text-pink-300">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs tracking-[.12em] text-white/35">
        &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
