import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { SideProjects } from "@/components/SideProjects";
import { Story } from "@/components/Story";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackgroundLayer } from "@/components/BackgroundLayer";

export default function Home() {
  return (
    <>
      <BackgroundLayer />

      <main className="relative grain overflow-x-hidden">
        <ScrollProgress />
        <Nav />
        <Hero />
        <Work />
        <SideProjects />
        <Story />
        <Skills />
        <Education />
        <Footer />
      </main>
    </>
  );
}
