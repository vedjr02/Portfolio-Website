"use client";

import { useSettings } from "@/components/desktop/settings";

/**
 * The desktop picture, fixed behind every window. Golden Gate (the dark version,
 * used in both appearances) is the default; Kildare is the
 * hand-drawn hills picture, offered as the alternative in Control Center.
 */
export function Wallpaper() {
  const { wallpaper, dim } = useSettings();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-sky">
      {wallpaper === "golden-gate" ? (
        // eslint-disable-next-line @next/next/no-img-element -- full-bleed fixed backdrop, srcset chosen by hand
        <img
          src="/wallpapers/golden-gate-dark-1920.webp"
          srcSet="/wallpapers/golden-gate-dark-1920.webp 1920w, /wallpapers/golden-gate-dark-3200.webp 3200w"
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Kildare />
      )}
      <div className="absolute inset-0 bg-black transition-opacity duration-300" style={{ opacity: dim / 100 }} />
    </div>
  );
}

/** Rolling hills west of Maynooth under a haze-blue sky, in five ridges. Drawn for this site. */
export function Kildare({ night = true }: { night?: boolean }) {
  return (
    <>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wp-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#adc6d2" />
            <stop offset="0.45" stopColor="#cddbdf" />
            <stop offset="0.72" stopColor="#e6e8e1" />
            <stop offset="1" stopColor="#e9e4d6" />
          </linearGradient>
          <radialGradient id="wp-sun" cx="0.72" cy="0.6" r="0.35">
            <stop offset="0" stopColor="#fbf3df" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fbf3df" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wp-mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9ece6" stopOpacity="0" />
            <stop offset="1" stopColor="#e9ece6" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect width="1600" height="1000" fill="url(#wp-sky)" />
        <rect width="1600" height="1000" fill="url(#wp-sun)" />
        <path d="M0 610 C 120 585 210 560 330 572 C 450 584 520 540 640 548 C 760 556 830 590 960 578 C 1090 566 1180 528 1300 536 C 1420 544 1510 575 1600 566 L1600 1000 L0 1000 Z" fill="#aabfb6" />
        <rect y="540" width="1600" height="120" fill="url(#wp-mist)" />
        <path d="M0 668 C 150 640 260 626 390 640 C 520 654 600 690 740 676 C 880 662 980 618 1120 626 C 1260 634 1360 676 1480 670 C 1540 667 1575 660 1600 656 L1600 1000 L0 1000 Z" fill="#85a595" />
        <path d="M0 742 C 140 718 280 700 420 712 C 560 724 650 762 800 756 C 950 750 1060 704 1210 700 C 1360 696 1480 730 1600 724 L1600 1000 L0 1000 Z" fill="#638b77" />
        <path d="M0 826 C 170 796 330 790 480 806 C 630 822 720 860 880 858 C 1040 856 1150 812 1300 806 C 1430 801 1530 824 1600 820 L1600 1000 L0 1000 Z" fill="#426d5a" />
        <path d="M0 900 C 200 872 360 870 540 884 C 720 898 820 930 1000 924 C 1180 918 1320 880 1480 878 C 1540 877 1580 882 1600 884 L1600 1000 L0 1000 Z" fill="#274a3d" />
      </svg>
      {/* night over Kildare in dark appearance */}
      {night && <div className="wp-dark absolute inset-0 bg-[#0c1320]/70 mix-blend-multiply" />}
    </>
  );
}
