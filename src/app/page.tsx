import { Hero } from "@/components/chapters/Hero";
import { Method } from "@/components/chapters/Method";
import { Flagship } from "@/components/chapters/Flagship";
import { AdflexRoom, NvidiaRoom } from "@/components/chapters/Rooms";
import { Meridian } from "@/components/chapters/Meridian";
import { Index } from "@/components/chapters/Index";
import { About } from "@/components/chapters/About";
import { Contact } from "@/components/chapters/Contact";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <Method />
      <Flagship />
      <NvidiaRoom />
      <AdflexRoom />
      <Meridian />
      <Index />
      <About />
      <Contact />
    </main>
  );
}
