import Link from "next/link";
import { profile } from "@/content/profile";

const links = [
  { href: "/#flagship", label: "Work" },
  { href: "/#index", label: "Index" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/** Fixed top bar. The one button that is always there: the recruiter fast lane. */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgb(12_11_16/0.86)] to-[rgb(12_11_16/0)]"
      />
      <nav aria-label="Primary" className="wrap relative flex h-[var(--nav-h)] items-center gap-2">
        <Link href="/" className="mr-auto flex items-center gap-2.5 py-2 text-[15px] font-medium tracking-[-0.01em]">
          <span aria-hidden className="dot bg-signal" />
          {profile.name}
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-[14px] text-paper-2 transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div id="nav-slot" className="flex items-center" />
        <Link href="/cv" className="btn btn-signal !min-h-9 !px-4 !text-[14px]">
          60-second version
        </Link>
      </nav>
    </header>
  );
}
