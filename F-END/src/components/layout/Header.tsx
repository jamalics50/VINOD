"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import clsx from "clsx";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { IconButton } from "@/components/ui/IconButton";

const NAV_LINKS = [
  { name: "Shop", href: "/shop" },
  { name: "Mangoes", href: "/category/mangoes" },
  { name: "Pantry", href: "/category/pantry" },
  { name: "Our Story", href: "/about" },
  { name: "Corporate Orders", href: "/corporate-orders" },
];

export function Header() {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const openCart = useCartStore((state) => state.openCart);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-40 w-full transition-all duration-250 ease-out",
          scrolled || mobileOpen
            ? "glass-panel-dark shadow-glass-sm text-husk border-b-0"
            : "bg-orchard text-husk border-b-transparent" // solid background
        )}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex-shrink-0 relative z-50">
            <Link 
              href="/" 
              className="flex items-center gap-2 font-display text-xl sm:text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-80"
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-mango">Food Basket</span> Farm
            </Link>
          </div>

          {/* Navigation - Center (desktop) */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-sm font-medium tracking-wide text-husk/80 transition-colors duration-200",
                      "hover:text-mango focus-visible:text-mango focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2 focus-visible:ring-offset-orchard"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 relative z-50">
            {/* Cart button */}
            <IconButton
              icon={ShoppingBag}
              size="md"
              onClick={openCart}
              badge={mounted ? getTotalItems() : undefined}
              aria-label="Open cart"
              className="text-husk hover:text-mango"
            />

            {/* Hamburger (mobile only) */}
            <div className="md:hidden">
              <IconButton
                icon={mobileOpen ? X : Menu}
                size="md"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                className="text-husk hover:text-mango"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-30 flex flex-col pt-24 px-6 md:hidden glass-panel-dark transition-all duration-300 ease-out",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "font-display text-3xl font-bold text-husk transition-all duration-300 ease-out hover:text-mango",
                mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: mobileOpen ? `${index * 40}ms` : "0ms" }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />
    </>
  );
}
