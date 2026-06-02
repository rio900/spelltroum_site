'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { items, categories, categoryColors, type ItemCategory, type ItemCategoryFilter } from '@/data/items';

const framePaths: Record<string, string> = {
  default:   '/frames/frame-default.png',
  mystic:    '/frames/frame-mystic.png',
  legendary: '/frames/frame-legendary.png',
  rare:      '/frames/frame-rare.png',
};

interface ItemsGridProps {
  lang: string;
  t: {
    filterAll: string;
  };
}

export default function ItemsGrid({ lang, t }: ItemsGridProps) {
  const [activeCategory, setActiveCategory] = useState<ItemCategoryFilter>('All');

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((i) => i.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
            activeCategory === 'All'
              ? 'bg-white/20 border-white/40 text-white'
              : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
          }`}
        >
          {t.filterAll} ({items.length})
        </button>
        {categories.map((cat) => {
          const color = categoryColors[cat];
          const count = items.filter((i) => i.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as ItemCategory)}
              className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
              style={{
                background: isActive ? `${color}33` : `${color}11`,
                borderColor: isActive ? `${color}88` : `${color}33`,
                color: isActive ? color : `${color}99`,
              }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}/wiki/items/${item.id}`}
            className="group flex flex-col items-center gap-2"
            title={item.name}
          >
            <div className="relative w-16 h-16 transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-lg">
              <Image
                src={framePaths[item.frame]}
                alt=""
                fill
                className="object-contain z-0"
              />
              <div className="absolute inset-[14%] z-10">
                <Image
                  src={`/items/${item.image}`}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-xs text-center leading-tight text-white/60 group-hover:text-white transition-colors line-clamp-2">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
