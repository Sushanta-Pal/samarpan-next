"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo"; // Import the Logo component

// Navigation items are defined here for easy management
const navItems = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Team", href: "/team" },
  { name: "Alumni", href: "/alumni" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right Side: All Navigation and Actions */}
        <div className="flex items-center gap-6">
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Separator and Donate Button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="h-6 w-px bg-border" />
            <Link href="/donate" passHref>
              <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-opacity">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="mb-8">
                <Logo />
              </div>
              <div className="flex flex-col space-y-5">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-lg transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/donate" passHref>
                  <Button
                    size="lg"
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Donate Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
