"use client";

import Link from "next/link";

import { IconButton } from "@/components/ui/IconButton";

export function Footer() {
  return (
    <footer className="bg-orchard text-husk border-t border-orchard/20">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Brand & Newsletter */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight text-mango transition-opacity hover:opacity-80">
              Food Basket Farm
            </Link>
            <p className="text-sm leading-6 text-husk/80 max-w-xs">
              Bringing the freshest Pakistani mangoes and desi pantry staples directly from our orchards to your doorstep.
            </p>
            <form className="max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="flex gap-x-2">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-husk shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-mango sm:text-sm sm:leading-6 placeholder:text-husk/40 transition-shadow"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-mango px-3.5 py-2.5 text-sm font-semibold text-bark shadow-sm hover:bg-mango/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango transition-all duration-200 active:scale-95"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-mango tracking-wider uppercase">Shop</h3>
                <ul role="list" className="mt-6 space-y-4 text-sm leading-6 text-husk/80">
                  <li><Link href="/shop" className="hover:text-mango transition-colors">All Products</Link></li>
                  <li><Link href="/category/mangoes" className="hover:text-mango transition-colors">Fresh Mangoes</Link></li>
                  <li><Link href="/category/pantry" className="hover:text-mango transition-colors">Desi Pantry</Link></li>
                  <li><Link href="/corporate-orders" className="hover:text-mango transition-colors">Corporate & Gift Crates</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-mango tracking-wider uppercase">Company</h3>
                <ul role="list" className="mt-6 space-y-4 text-sm leading-6 text-husk/80">
                  <li><Link href="/about" className="hover:text-mango transition-colors">Our Story & Farm</Link></li>
                  <li><Link href="/contact" className="hover:text-mango transition-colors">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-mango tracking-wider uppercase">Support</h3>
                <ul role="list" className="mt-6 space-y-4 text-sm leading-6 text-husk/80">
                  <li><Link href="/faq" className="hover:text-mango transition-colors">FAQ & Ripening Guide</Link></li>
                  <li><Link href="/policies" className="hover:text-mango transition-colors">Shipping & Returns</Link></li>
                  <li><Link href="/corporate-orders" className="hover:text-mango transition-colors">Bulk & Corporate Sales</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-mango tracking-wider uppercase">Follow Us</h3>
                <div className="mt-6 flex gap-x-4">
                  <IconButton href="#" size="md" className="text-husk/60 hover:text-mango" aria-label="Facebook">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </IconButton>
                  <IconButton href="#" size="md" className="text-husk/60 hover:text-mango" aria-label="Instagram">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </IconButton>
                  <IconButton href="#" size="md" className="text-husk/60 hover:text-mango" aria-label="X (Twitter)">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-husk/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-husk/60">
            &copy; {new Date().getFullYear()} Food Basket Farm. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-husk/60">
            <Link href="/policies" className="hover:text-mango transition-colors">Privacy Policy</Link>
            <Link href="/policies" className="hover:text-mango transition-colors">Terms of Service</Link>
            <Link href="/policies" className="hover:text-mango transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
