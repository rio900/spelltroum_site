import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';

interface FooterProps {
  lang: Locale;
  t: Record<string, string>;
}

export default function Footer({ lang, t }: FooterProps) {
  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/">
              <Image
                src="/spelltroum-main.png"
                alt="Spelltroum"
                width={140}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/50 text-sm">{t.tagline}</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2 text-sm">
            <Link href={`/${lang}/wiki`} className="text-white/60 hover:text-white transition">Wiki</Link>
            <Link href={`/${lang}/faq`} className="text-white/60 hover:text-white transition">FAQ</Link>
            <Link href={`/${lang}/articles`} className="text-white/60 hover:text-white transition">Articles</Link>
            <Link href="/terms-of-service-and-privacy-policy" className="text-white/60 hover:text-white transition">
              {t.terms}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/30 text-xs">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
