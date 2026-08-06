"use client";

/**
 * Header — sticky navigation.
 *
 * Becomes translucent with a hairline border once the page scrolls, marks the
 * active route with aria-current plus a visible underline (never colour
 * alone), and hands mobile navigation to the drawer component.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { primaryNav } from "@/data/site";
import { Wordmark } from "@/components/layout/Wordmark";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes — including on browser
  // back/forward, which does not go through a link's onClick handler.
  // Adjusting state during render (rather than in an effect) avoids the
  // cascading re-render an effect-based reset would cause.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled
            ? "border-b border-hairline bg-canvas/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-18 items-center justify-between gap-4">
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center rounded-full px-3.5 text-sm transition-colors",
                        active
                          ? "font-medium text-accent"
                          : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {link.label}
                      {/* Shape marker so the active state is not colour-only */}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3.5 bottom-2 h-px bg-accent"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/*
              The responsive display lives on this wrapper, not on the Button.
              Button's own base class sets `inline-flex`, and Tailwind emits
              both display utilities in the same layer — so a `hidden` passed
              through className loses to it and the button never hides. On a
              narrow screen that pushed the menu trigger off the edge.
            */}
            <span className="hidden sm:inline-flex">
              <Button href="/projects" size="sm">
                View My Work
              </Button>
            </span>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="inline-flex size-11 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:border-accent/40 hover:text-accent lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Open navigation menu</span>
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
        triggerRef={triggerRef}
      />
    </>
  );
}
