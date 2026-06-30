"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * NavigationMenu — shadcn/ui pattern adapted to the HUX EXPED lime/ink theme
 * (Radix navigation-menu 1.2.x). Dark dropdown panels with a shared animated
 * viewport. Animations are plain CSS (see globals.css: nm-* keyframes) so no
 * tailwindcss-animate dependency is needed.
 */
function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn("relative flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
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
  "group inline-flex h-9 w-max items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-[#6b8e1f] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-[#6b8e1f] xl:text-[0.78rem] xl:tracking-[0.12em]",
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
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        // slide between sibling menus + fade the whole panel
        "left-0 top-0 w-full p-3 md:absolute md:w-auto",
        "[&[data-motion=from-start]]:[animation:nm-from-left_.25s_ease] [&[data-motion=from-end]]:[animation:nm-from-right_.25s_ease]",
        "[&[data-motion=to-start]]:[animation:nm-to-left_.25s_ease] [&[data-motion=to-end]]:[animation:nm-to-right_.25s_ease]",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute left-1/2 top-full isolate z-50 flex -translate-x-1/2 justify-center pt-1.5">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-2xl border border-white/10 bg-ink text-cream shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]",
          "transition-[width,height] duration-300 ease-out",
          "data-[state=open]:[animation:nm-enter_.22s_ease] data-[state=closed]:[animation:nm-exit_.18s_ease]",
          className,
        )}
        {...props}
      />
    </div>
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
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
