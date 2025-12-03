'use client';

export default function VideoSection() {
    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden"
            style={{ backgroundImage: "url('/Map2.png')" }}
        >
            {/* Светлячки */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
            </div>

            {/* Контент */}
            <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 py-16">
                <div className="max-w-7xl mx-auto bg-black/50 backdrop-blur-md px-4 sm:px-8 py-8 rounded-3xl shadow-2xl">

                    {/* Заголовок */}
                    <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-10 text-center">
                        Community Gameplay Videos
                    </h2>

                    {/* Сетка 2×2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* VIDEO 1 */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/qypwzIG4Hsg"
                                title="Spelltroum video 1"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* VIDEO 2 */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/pxVpJb9o1tQ"
                                title="Spelltroum video 2"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* VIDEO 3 */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/ZONNaS87LaY"
                                title="Spelltroum video 3"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* VIDEO 4 */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/ynRv0IMogDc"
                                title="Spelltroum video 4"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}