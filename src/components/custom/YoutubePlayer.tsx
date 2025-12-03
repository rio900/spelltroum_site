import { useState } from "react";

export default function YoutubePlayer() {
    const [play, setPlay] = useState(false);

    return (
        <div className="relative max-w-4xl aspect-video rounded-2xl overflow-hidden">
            {!play && (
                <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => setPlay(true)}
                >
                    <img
                        src="/custom-thumbnail.jpeg"   // твоя картинка
                        alt="Video preview"
                        className="w-full h-full object-cover"
                    />

                    {/* Кнопка Play */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center shadow-xl">
                            <svg
                                className="w-12 h-12 text-black ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <polygon points="5,3 19,12 5,21" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            {play && (
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/qypwzIG4Hsg?autoplay=1"
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
}