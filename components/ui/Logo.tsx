import Image from "next/image";

/** HUX EXPED brand lockup (public/logo.png). `invert` for dark backgrounds. */
export default function Logo({
  className = "",
  invert = false,
  priority = false,
}: {
  className?: string;
  invert?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="HUX EXPED"
      width={975}
      height={293}
      priority={priority}
      sizes="240px"
      className={`${invert ? "invert" : ""} w-auto ${className}`}
    />
  );
}
