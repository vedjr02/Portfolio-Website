import { CommandProvider } from "@/components/CommandProvider";
import { SettingsProvider } from "@/components/desktop/settings";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastProvider } from "@/components/Toast";
import { Wallpaper } from "@/components/desktop/Wallpaper";
import { MenuBar } from "@/components/desktop/MenuBar";
import { Dock } from "@/components/desktop/Dock";
import { Hero } from "@/components/desktop/Hero";
import { HoldMyCode } from "@/components/desktop/HoldMyCode";
import { Cases } from "@/components/desktop/Cases";
import { Finder } from "@/components/desktop/Finder";
import { About } from "@/components/desktop/About";
import { Contact } from "@/components/desktop/Contact";

export default function Home() {
  return (
    <SettingsProvider>
    <CommandProvider>
      <ToastProvider>
        <Wallpaper />
        <MenuBar />
        <main>
          <Hero />
          <HoldMyCode />
          <Cases />
          <Finder />
          <About />
          <Contact />
        </main>
        <Dock />
        <CommandPalette />
      </ToastProvider>
    </CommandProvider>
    </SettingsProvider>
  );
}
