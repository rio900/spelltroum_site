'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen ? 'border-[#FFD43A]/40 bg-[#FFD43A]/5' : 'border-white/10 bg-black/40'
            } backdrop-blur-sm`}
          >
            <button
              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={`font-semibold text-base transition-colors ${isOpen ? 'text-[#FFD43A]' : 'text-white'}`}>
                {item.q}
              </span>
              <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                isOpen ? 'bg-[#FFD43A]/20 text-[#FFD43A] rotate-45' : 'bg-white/10 text-white/50'
              }`}>
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
