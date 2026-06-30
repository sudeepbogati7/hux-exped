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
export const ClockIcon = stroke("ClockIcon", "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M12 7.5V12l3 2");
export const CalendarIcon = stroke("CalendarIcon", "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z|M8 3v4|M16 3v4|M4 10h16");
export const TentIcon = stroke("TentIcon", "M3 20h18|M12 4 4 20|M12 4l8 16|M12 10 7.5 20|M12 10 16.5 20");
export const UtensilsIcon = stroke("UtensilsIcon", "M6 3v6a2 2 0 0 0 4 0V3|M8 11v10|M16 3c-1.4 0-2.4 1.6-2.4 4.2 0 2.2 1 3.4 2.4 3.8V21");
export const CheckIcon = stroke("CheckIcon", "M5 12.5l4.5 4.5L19 6.5");
export const LockIcon = stroke("LockIcon", "M6 10V8a6 6 0 0 1 12 0v2|M5 10h14v10H5z|M12 14v3");
export const CreditCardIcon = stroke("CreditCardIcon", "M3 6h18v12H3z|M3 10h18");
export const ShareIcon = stroke("ShareIcon", "M8.6 13.4l6.8 3.9|M15.4 6.7l-6.8 3.9|M7 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0|M22 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0|M22 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0");
export const StarIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.2l2.95 6.4 6.85.7-5.1 4.6 1.45 6.9L12 17.9 5.85 21.8l1.45-6.9-5.1-4.6 6.85-.7z" />
  </svg>
);
export const BadgeCheckIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 1.5l2.3 1.9 3-.2.9 2.9 2.5 1.6-1 2.8 1 2.8-2.5 1.6-.9 2.9-3-.2L12 22.5l-2.3-1.9-3 .2-.9-2.9L3.3 16l1-2.8-1-2.8 2.5-1.6.9-2.9 3 .2z" />
    <path d="M8.5 12l2.2 2.2 4.8-4.8" fill="none" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const MapPinIcon = stroke("MapPinIcon", "M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z|M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z");
export const GaugeIcon = stroke("GaugeIcon", "M4 18a8 8 0 1 1 16 0|M12 18l4-5");
export const RouteIcon = stroke("RouteIcon", "M6.5 20a2.5 2.5 0 1 0 0-5h11a2.5 2.5 0 1 0 0-5h-11a2.5 2.5 0 1 1 0-5|M6.5 4.5v0|M17.5 19.5v0");
export const FlagIcon = stroke("FlagIcon", "M5 21V4|M5 4h11l-2 3 2 3H5");
export const MountainIcon = stroke("MountainIcon", "M3 20h18|M4 20l6-13 4 7|M12.5 11l2.5-4 5 13");

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

export const WhatsappIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.043zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);
export const XIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.53 3h3.2l-7 8 8.23 11h-6.44l-5.05-6.6L4.6 22H1.4l7.49-8.56L1 3h6.6l4.56 6.03zm-1.12 17.1h1.77L7.07 4.8H5.17z" />
  </svg>
);
export const MailIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7.5l8 5.5 8-5.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const GoogleIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
    <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.29 9.14 5.36 12 5.36z" />
  </svg>
);
export const TripadvisorIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 7.5c-2.43 0-4.7.63-6.55 1.72H1.5l1.36 1.48a4.04 4.04 0 1 0 5.5 5.9L12 20l1.64-3.4a4.04 4.04 0 1 0 5.5-5.9L20.5 9.22h-3.95A12.9 12.9 0 0 0 12 7.5zm-5.04 9.2a2.66 2.66 0 1 1 0-5.32 2.66 2.66 0 0 1 0 5.32zm0-4.18a1.52 1.52 0 1 0 0 3.04 1.52 1.52 0 0 0 0-3.04zm10.08 4.18a2.66 2.66 0 1 1 0-5.32 2.66 2.66 0 0 1 0 5.32zm0-4.18a1.52 1.52 0 1 0 0 3.04 1.52 1.52 0 0 0 0-3.04z" />
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
