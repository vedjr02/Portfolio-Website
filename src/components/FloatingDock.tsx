"use client";

import { BriefcaseBusiness, Mail, Search, UserRound } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import { useCommand } from "@/components/CommandProvider";
import { profile } from "@/lib/data";

export function FloatingDock() {
  const { toggle } = useCommand();

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
      <div className="pointer-events-auto">
        <Dock iconSize={40} iconMagnification={54}>
          <DockIcon
            role="button"
            tabIndex={0}
            onClick={() => jump("showcase")}
            onKeyDown={(e) => e.key === "Enter" && jump("showcase")}
            aria-label="Work"
            title="Work"
          >
            <BriefcaseBusiness className="h-5 w-5 text-ink" />
          </DockIcon>
          <DockIcon
            role="button"
            tabIndex={0}
            onClick={() => jump("story")}
            onKeyDown={(e) => e.key === "Enter" && jump("story")}
            aria-label="About"
            title="About"
          >
            <UserRound className="h-5 w-5 text-ink" />
          </DockIcon>
          <DockIcon
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={(e) => e.key === "Enter" && toggle()}
            aria-label="Open command palette"
            title="Command (⌘K)"
            className="bg-accent/10"
          >
            <Search className="h-5 w-5 text-accent" />
          </DockIcon>
          <DockIcon
            role="link"
            tabIndex={0}
            onClick={() => {
              window.location.href = profile.socials.email;
            }}
            aria-label="Email"
            title="Email"
          >
            <Mail className="h-5 w-5 text-ink" />
          </DockIcon>
          <DockIcon
            role="link"
            tabIndex={0}
            onClick={() =>
              window.open(profile.socials.linkedin, "_blank", "noopener,noreferrer")
            }
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </DockIcon>
          <DockIcon
            role="link"
            tabIndex={0}
            onClick={() =>
              window.open(profile.socials.github, "_blank", "noopener,noreferrer")
            }
            aria-label="GitHub"
            title="GitHub"
          >
            <GitHubIcon />
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-ink" aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-ink" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.48V23h-4V8.5z" />
    </svg>
  );
}
