/** Minimal stroke/solid icons used across the site. */
import type { ReactElement } from "react";

type P = { className?: string };

export const PlayIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

export const CameraIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

export const HeartIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2 5 5.3 5c2 0 3.4 1.2 4.2 2.4C10.3 6.2 11.7 5 13.7 5 17 5 18.6 8.3 17 11.7 14.5 16.4 12 21 12 21z" />
  </svg>
);

export const ArrowIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeft = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRight = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDown = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SearchIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.9}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
  </svg>
);

export const PlusMinus = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M5 12h14" strokeLinecap="round" />
  </svg>
);

const stroke = (name: string, d: string) => {
  const C = ({ className = "h-6 w-6" }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {d.split("|").map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
  C.displayName = name;
  return C;
};

export const CompassIcon = stroke("CompassIcon", "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M15.5 8.5l-2 5-5 2 2-5 5-2z");
export const UsersIcon = stroke("UsersIcon", "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1|M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6|M17 19v-1a4 4 0 0 0-3-3.9|M15 4.1a3 3 0 0 1 0 5.8");
export const ShieldIcon = stroke("ShieldIcon", "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z|M9 12l2 2 4-4");
export const PeakIcon = stroke("PeakIcon", "M3 20h18|M5 20l5-11 3 5 2-3 4 9");

export const InstagramIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
export const YoutubeIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
  </svg>
);
export const FacebookIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M14 8.5h2.5V5.5H14c-2 0-3.3 1.3-3.3 3.4v1.6H8.5v3h2.2V21h3v-7.5h2.3l.5-3h-2.8V9.2c0-.5.3-.7.8-.7z" />
  </svg>
);
export const StravaIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M10.5 3l5.5 11h-3.2L10.5 9.2 8.2 14H5z" />
    <path d="M14 14l1.6 3 1.6-3H21l-3.4 7-3.4-7z" opacity="0.6" />
  </svg>
);

export const socialIcon: Record<string, (p: P) => ReactElement> = {
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
  Strava: StravaIcon,
};

/** Map a feature icon key to its component. */
export const featureIcon: Record<string, (p: P) => ReactElement> = {
  compass: CompassIcon,
  users: UsersIcon,
  shield: ShieldIcon,
  peak: PeakIcon,
  camera: CameraIcon,
  heart: HeartIcon,
};
