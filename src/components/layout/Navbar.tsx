'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeLabels, localeFlags, Locale } from '@/i18n/config';

interface NavbarProps {
  lang: Locale;
  t: Record<string, string>;
}

export default function Navbar({ lang, t }: NavbarProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function switchLanguage(newLang: Locale) {
    setLangOpen(false);
    // Replace current lang segment in path
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/'));
  }

  const navLinks = [
    { href: `/${lang}/wiki`, label: t.wiki },
    { href: `/${lang}/faq`, label: t.faq },
    { href: `/${lang}/articles`, label: t.articles },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center shrink-0">
          <Image
            src="/spelltroum-main.png"
            alt="Spelltroum"
            width={140}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#FFD43A]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side: lang + play */}
        <div className="hidden md:flex items-center gap-3">

          {/* Language dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm text-white font-medium"
            >
              <span>{localeFlags[lang]}</span>
              <span>{lang.toUpperCase()}</span>
              <svg
                className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLanguage(l)}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                      l === lang
                        ? 'bg-[#FFD43A]/20 text-[#FFD43A] font-semibold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{localeFlags[l]}</span>
                    <span>{localeLabels[l]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Play button */}
          <a
            href="https://orvjl.app.link/reddit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl font-lilita text-base text-[#4B3200] transition-all shadow-md hover:shadow-yellow-500/30"
            style={{
              background: 'linear-gradient(to bottom, #FFD43A, #EBA500)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'linear-gradient(to bottom, #FFE15B, #F2A900)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'linear-gradient(to bottom, #FFD43A, #EBA500)';
            }}
          >
            {t.play}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/90 font-semibold text-base py-2 border-b border-white/10"
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher mobile */}
          <div className="flex flex-wrap gap-2 pt-1">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => { switchLanguage(l); setMobileOpen(false); }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  l === lang
                    ? 'bg-[#FFD43A]/20 text-[#FFD43A] border border-[#FFD43A]/40'
                    : 'bg-white/10 text-white/80 border border-white/10'
                }`}
              >
                <span>{localeFlags[l]}</span>
                <span>{l.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <a
            href="https://orvjl.app.link/reddit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-center px-5 py-3 rounded-xl font-lilita text-lg text-[#4B3200]"
            style={{ background: 'linear-gradient(to bottom, #FFD43A, #EBA500)' }}
          >
            {t.play}
          </a>
        </div>
      )}
    </nav>
  );
}
