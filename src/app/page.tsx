import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Story } from "@/components/Story";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative grain">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Work />
      <Story />
      <Skills />
      <Education />
      <Footer />
    </main>
  );
}
