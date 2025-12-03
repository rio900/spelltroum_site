import CustomButton from "@/components/custom/CustomButton";
import ItemSetSection from "@/components/pages-components/item-set/item-set";
import MainPageSection from "@/components/pages-components/main-page/main-page";
import TeamUpSection from "@/components/pages-components/team-up/team-up";
import VideoSection from "@/components/pages-components/video-section/video-section";

export default function Home() {
  return (
    <div className="grid min-h-screen">
      <main className="flex flex-col justify-center">
        <MainPageSection />
        <TeamUpSection />
        <ItemSetSection />
        <VideoSection />
      </main>
      <footer className="w-full bg-[#1F1728] text-gray-200 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">

          {/* Заголовок */}
          <h2 className="font-lilita text-4xl text-[#FFD43A]">
            Be part of the core Discord community!
          </h2>

          {/* Подзаголовок */}
          <p className="max-w-2xl text-lg leading-relaxed">
            Share your strategies, give direct feedback to the devs, join content creator programs,
            learn about new features before everyone else and help us make Spelltroum even better.
            Let’s build something epic together.
          </p>

          {/* Discord Button */}
          <a
            href="https://discord.com/invite/Tk7pxkJBUq"
            target="_blank"
            className="inline-flex items-center bg-[#5965F2] hover:bg-[#4752C4] transition px-6 py-3 rounded-xl text-lg font-semibold shadow-lg"
          >
            <img src="/white-discord.png" alt="Discord" className="w-6 h-6 mr-3" />
            Join us on Discord
          </a>

          {/* Нижняя зона */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mt-10 text-sm opacity-80 gap-6 md:gap-0">

            {/* Copyright */}
            <p>2023 Spelltroum by Roman Samchuk. All rights reserved.</p>

            {/* Email */}
            <p className="flex items-center gap-2">
              <a href="mailto:spelltroum@gmail.com" className="hover:underline">
                spelltroum@gmail.com
              </a>
            </p>

            {/* Terms Link */}
            <a
              href="/terms-of-service-and-privacy-policy"
              className="underline hover:text-white transition"
            >
              Terms of Service and Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
