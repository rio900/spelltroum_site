import Image from 'next/image';
import { type ItemFrame } from '@/data/items';

interface ItemIconProps {
  image: string;       // filename, e.g. "Sword0.png"
  frame: ItemFrame;    // rarity frame (for level 1)
  level: 1 | 2 | 3 | 4;
  size?: number;       // px, default 80
}

const rarityFramePaths: Record<ItemFrame, string> = {
  default:   '/frames/frame-default.png',
  mystic:    '/frames/frame-mystic.png',
  legendary: '/frames/frame-legendary.png',
  rare:      '/frames/frame-rare.png',
};

const levelFramePaths: Record<2 | 3 | 4, string> = {
  2: '/frames/level-2.png',
  3: '/frames/level-3.png',
  4: '/frames/level-4.png',
};

const starCount: Record<1 | 2 | 3 | 4, number> = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
};

export default function ItemIcon({ image, frame, level, size = 80 }: ItemIconProps) {
  const frameSrc = level === 1 ? rarityFramePaths[frame] : levelFramePaths[level as 2 | 3 | 4];
  const stars = starCount[level];
  // inset for the item image inside the frame (~14% on each side)
  const inset = Math.round(size * 0.14);
  const starSize = Math.round(size * 0.22);
  const starsWidth = stars * starSize + (stars - 1) * Math.round(size * 0.03);

  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      {/* Icon + frame container */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Rarity / level frame — background */}
        <Image
          src={frameSrc}
          alt=""
          fill
          className="object-contain"
          style={{ zIndex: 0 }}
        />
        {/* Item icon — on top of frame */}
        <div
          className="absolute"
          style={{
            top: inset,
            left: inset,
            right: inset,
            bottom: inset,
            zIndex: 10,
          }}
        >
          <Image
            src={`/items/${image}`}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Stars — below the icon, centred */}
      {stars > 0 && (
        <div
          className="flex items-center justify-center gap-0.5 mt-1"
          style={{ gap: Math.round(size * 0.03) }}
        >
          {Array.from({ length: stars }).map((_, i) => (
            <div key={i} className="relative" style={{ width: starSize, height: starSize }}>
              <Image src="/frames/star.png" alt="★" fill className="object-contain" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
