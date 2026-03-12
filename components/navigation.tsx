"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { useHero } from "./hero-context";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Photography", href: "#photography" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isHeroVisible } = useHero();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const maxScroll = 200;
      const opacity = Math.max(0.6, 1 - (window.scrollY / maxScroll) * 0.4);
      setScrollOpacity(opacity);

      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(href.substring(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-40 transition-all duration-300",
          isScrolled
            ? "border-b border-border bg-background/80 backdrop-blur-lg"
            : "bg-transparent"
        )}
      >
        <motion.nav
          animate={{ opacity: scrollOpacity }}
          transition={{ duration: 0.2 }}
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        >
          <button
            onClick={() => handleNavClick("#home")}
            className="relative overflow-hidden text-lg font-semibold text-foreground transition-colors hover:text-muted-foreground"
          >
            <AnimatePresence mode="wait">
              {isHeroVisible ? (
                <motion.span
                  key="us"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  US
                </motion.span>
              ) : (
                <motion.span
                  key="fullname"
                  layoutId="hero-name"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  Udayveer Singh
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            <li>
              <button
                onClick={toggleTheme}
                className="mr-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </li>
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm transition-colors",
                    activeSection === link.href.substring(1)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-x-2 -bottom-px h-px bg-foreground"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 border-b border-border bg-background/95 backdrop-blur-lg md:hidden"
          >
            <nav className="mx-auto max-w-6xl px-6 py-4">
              <ul className="flex flex-col gap-1">
                <li>
                  <button
                    onClick={toggleTheme}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                </li>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "w-full rounded-lg px-4 py-3 text-left text-sm transition-colors",
                        activeSection === link.href.substring(1)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
