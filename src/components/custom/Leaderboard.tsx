'use client';

import Image from 'next/image';

export type LeaderboardPlayer = {
    rank: number;
    name: string;
    rating: number;
    avatar?: string;   // опционально: путь к картинке аватара
};

export default function Leaderboard({ players }: { players: LeaderboardPlayer[] }) {
    return (
        <section
            className="
        w-full max-w-3xl mx-auto
        rounded-2xl p-4 sm:p-6
        text-white
        shadow-[0_0_25px_rgba(175,85,255,0.35)]
        bg-gradient-to-b from-[#2B124C] to-[#1A0829]
      "
            aria-label="Leaderboard"
        >
            {/* заголовок */}
            <h2 className="
        font-lilita text-2xl sm:text-3xl text-[#FFD43A]
        text-center drop-shadow-[0_0_8px_rgba(255,212,58,0.8)]
        mb-4 sm:mb-6
      ">
                Leaderboard
            </h2>

            {/* таблица */}
            <div className="overflow-hidden rounded-xl bg-[#341A47]">
                {/* header (липкий на мобиле при скролле) */}
                <div
                    className="
            grid grid-cols-[44px_1fr_auto]
            sm:grid-cols-[64px_minmax(200px,1fr)_140px]
            items-center gap-3 sm:gap-4
            px-3 sm:px-4 py-2 sm:py-3
            text-xs sm:text-sm font-semibold uppercase tracking-wide
            bg-[#44235E] text-[#FFD43A]
            sticky top-0 z-10
          "
                >
                    <span>#</span>
                    <span>Player</span>
                    <span className="justify-self-end">Wins</span>
                </div>

                {/* rows */}
                <ul className="divide-y divide-[#44235E]">
                    {players.map((p) => (
                        <li
                            key={p.rank}
                            className={`
                grid grid-cols-[44px_1fr_auto]
                sm:grid-cols-[64px_minmax(200px,1fr)_140px]
                items-center gap-3 sm:gap-4
                px-3 sm:px-4 py-2.5 sm:py-3.5
                text-base sm:text-lg
                hover:bg-[#4B1E64]/60 transition
                ${p.rank === 1 ? 'bg-[rgba(255,215,0,0.08)]' : ''}
                ${p.rank === 2 ? 'bg-[rgba(255,215,0,0.05)]' : ''}
                ${p.rank === 3 ? 'bg-[rgba(255,215,0,0.03)]' : ''}
              `}
                        >
                            {/* rank + медалька */}
                            <div className="relative flex items-center justify-center">
                                <span className="font-bold">{p.rank}</span>
                                {p.rank <= 3 && (
                                    <span
                                        className="
                      absolute -z-10 inset-0
                      rounded-full blur-[10px]
                      bg-[radial-gradient(circle,rgba(255,212,58,0.65),rgba(255,212,58,0)_70%)]
                    "
                                        aria-hidden
                                    />
                                )}
                            </div>

                            {/* avatar + name */}
                            <div className="flex items-center gap-3 min-w-0">
                                {p.avatar ? (
                                    <Image
                                        src={p.avatar}
                                        alt={`${p.name} avatar`}
                                        width={36}
                                        height={36}
                                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 flex-shrink-0" />
                                )}
                                <span className="font-medium truncate">{p.name}</span>
                            </div>

                            {/* rating */}
                            <div className="justify-self-end font-semibold">
                                <span className="inline-flex items-center gap-2">
                                    <span>{p.rating.toLocaleString()}</span>
                                    <span className="text-[#FFD43A]">🏆</span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}