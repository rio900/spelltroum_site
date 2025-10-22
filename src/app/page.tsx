import CustomButton from "@/components/custom/CustomButton";
import MainBlockSection from "@/components/pages-components/main-block/main-block";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_20px] min-h-screen">
      <main className="flex flex-col gap-6 justify-center">
        <MainBlockSection />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
