"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins exactly once on the client.
if (typeof window !== "undefined" && !(gsap as unknown as { _huxReg?: boolean })._huxReg) {
  gsap.registerPlugin(ScrollTrigger);
  (gsap as unknown as { _huxReg?: boolean })._huxReg = true;
}

export { gsap, ScrollTrigger };
