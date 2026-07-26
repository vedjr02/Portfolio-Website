import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Spotlight } from "@/components/Spotlight";
import { Workbench } from "@/components/Workbench";
import { Story } from "@/components/Story";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { CommandProvider } from "@/components/CommandProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { FloatingDock } from "@/components/FloatingDock";
import { SideRail } from "@/components/SideRail";

export default function Home() {
  return (
    <CommandProvider>
      <BackgroundLayer />

      <main className="relative grain overflow-x-hidden pb-28">
        <ScrollProgress />
        <Nav />
        <SideRail />
        <Hero />
        <Spotlight />
        <Workbench />
        <Story />
        <Skills />
        <Education />
        <Footer />
      </main>

      <FloatingDock />
      <CommandPalette />
    </CommandProvider>
  );
}
