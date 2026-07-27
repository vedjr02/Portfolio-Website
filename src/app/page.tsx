import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Story } from "@/components/Story";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { CommandProvider } from "@/components/CommandProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { SideRail } from "@/components/SideRail";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ToastProvider } from "@/components/Toast";

export default function Home() {
  return (
    <CommandProvider>
      <ToastProvider>
        <SmoothScroll>
          <BackgroundLayer />

          <main className="relative overflow-x-hidden pb-10">
            <ScrollProgress />
            <Nav />
            <SideRail />
            <Hero />
            <Story />
            <Showcase />
            <ProjectIndex />
            <Skills />
            <Education />
            <Footer />
          </main>

          <CommandPalette />
        </SmoothScroll>
      </ToastProvider>
    </CommandProvider>
  );
}
