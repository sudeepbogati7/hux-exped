import {
  Mountain,
  MountainSnow,
  Camera,
  Compass,
  Tent,
  Route,
  MapPin,
  Users,
  ShieldCheck,
  Star,
  Heart,
  BookOpen,
  Images,
  LifeBuoy,
  Phone,
  type LucideIcon,
} from "lucide-react";

/** Map the `icon` string on nav children (lib/data.ts) to a lucide icon. */
export const childIcon: Record<string, LucideIcon> = {
  tent: Tent,
  route: Route,
  mappin: MapPin,
  compass: Compass,
  mountain: Mountain,
  peak: MountainSnow,
  users: Users,
  shield: ShieldCheck,
  star: Star,
  heart: Heart,
  camera: Camera,
};

/** Top-level nav label → lucide icon. */
export const topIcon: Record<string, LucideIcon> = {
  Treks: Compass,
  Mountaineering: MountainSnow,
  Photography: Camera,
  About: Users,
  Explore: BookOpen,
  Contact: Phone,
};

export { Images, LifeBuoy };
