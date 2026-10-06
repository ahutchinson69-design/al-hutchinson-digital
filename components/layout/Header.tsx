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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full pr-2 pl-5 backdrop-blur-xl transition-[background-color,box-shadow] duration-500",
            scrolled
              ? "bg-canvas/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_20px_50px_-20px_rgba(0,0,0,0.8)]"
              : "bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
          )}
        >
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-sm transition-colors duration-300",
                        active
                          ? "bg-white/[0.08] font-medium text-accent"
                          : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {link.label}
                      {/* Shape marker so the active state is not colour-only */}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-4 bottom-2 h-px bg-accent"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Display lives on the wrapper: Button's base sets inline-flex. */}
            <span className="hidden sm:inline-flex">
              <Button href="/projects" size="sm" withArrow>
                View My Work
              </Button>
            </span>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="inline-flex size-11 items-center justify-center rounded-full bg-white/[0.06] text-ink-muted transition-colors hover:text-accent lg:hidden"
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
