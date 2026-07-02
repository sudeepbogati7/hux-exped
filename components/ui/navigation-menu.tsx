"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * NavigationMenu — shadcn/ui pattern adapted to the HUX EXPED theme
 * (Radix navigation-menu 1.2.x). Viewport-less: each dropdown panel is anchored
 * directly under its own trigger (sits close to the parent nav item). Plain-CSS
 * fade/slide-down animation (see globals.css: nm-drop) — no extra deps.
 */
function NavigationMenu({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      // no viewport — content is positioned per-item
      className={cn("relative flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    />
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1 xl:gap-2", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />;
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-coral focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-coral xl:text-[0.78rem] xl:tracking-[0.12em]",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDown
        className="relative top-px size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  align = "center",
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content> & { align?: "start" | "center" | "end" }) {
  const pos =
    align === "start"
      ? "left-0"
      : align === "end"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        // anchored just under this item's trigger
        "absolute top-full z-50 mt-2 rounded-2xl border border-white/10 bg-ink p-2 text-cream shadow-[0_30px_60px_-25px_rgba(0,0,0,0.75)]",
        pos,
        "data-[state=open]:[animation:nm-drop_.18s_ease] data-[state=closed]:[animation:nm-lift_.14s_ease]",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "group/mi flex gap-3 rounded-xl p-3 text-sm no-underline outline-none transition-all hover:translate-x-0.5 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
};
