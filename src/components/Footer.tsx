import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-rule bg-bg">
      <div className="wrap flex flex-col gap-4 py-8 text-[13px] text-paper-3 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}. Every pixel on the home page is a data point.
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:ml-auto">
          <li>
            <Link href="/colophon" className="link text-paper-2">
              Colophon: this site&rsquo;s requirements doc
            </Link>
          </li>
          <li>
            <Link href="/cv" className="link text-paper-2">
              CV
            </Link>
          </li>
          <li id="footer-slot" />
        </ul>
      </div>
    </footer>
  );
}
