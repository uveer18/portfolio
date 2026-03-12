"use client";

import { FadeIn } from "@/components/ui/motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHero } from "@/components/hero-context";

const heroName = "Udayveer Singh";
const predictionChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const rotatingItems = [
  { kind: "text", text: "NITJ" },
  { kind: "link", text: "Read blog", href: "#blog" },
] as const;

function usePredictionText(targetText: string, duration = 1000) {
  const [displayText, setDisplayText] = useState(targetText);

  useEffect(() => {
    const steps = 12;
    const stepDuration = Math.floor(duration / steps);
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep >= steps) {
        setDisplayText(targetText);
        clearInterval(interval);
        return;
      }

      const revealCount = Math.floor((currentStep / steps) * targetText.length);
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealCount) return char;
          return predictionChars[Math.floor(Math.random() * predictionChars.length)];
        })
        .join("");

      setDisplayText(scrambled);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [duration, targetText]);

  return displayText;
}

export function Hero() {
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [projectsHovered, setProjectsHovered] = useState(false);
  const { setIsHeroVisible } = useHero();
  const predictedName = usePredictionText(heroName, 1000);

  useEffect(() => {
    const updateHeroVisibility = () => {
      const heroSection = document.getElementById("home");
      if (!heroSection) return;
      const rect = heroSection.getBoundingClientRect();
      setIsHeroVisible(rect.bottom > 90);
    };

    updateHeroVisibility();
    window.addEventListener("scroll", updateHeroVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateHeroVisibility);
  }, [setIsHeroVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentRotatingItem = useMemo(() => rotatingItems[rotatingIndex], [rotatingIndex]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeIn>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            IT&apos;28 Student at{" "}
            <span className="relative inline-flex min-w-24 overflow-hidden align-bottom text-accent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRotatingItem.text}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  {currentRotatingItem.kind === "link" ? (
                    <a
                      href={currentRotatingItem.href}
                      onClick={(event) => {
                        event.preventDefault();
                        document
                          .getElementById(currentRotatingItem.href.substring(1))
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="underline-offset-4 hover:underline"
                    >
                      {currentRotatingItem.text}
                    </a>
                  ) : (
                    currentRotatingItem.text
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Aspiring Machine Learning Engineer
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-6 text-balance text-5xl font-mono font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            <motion.span layoutId="hero-name">{predictedName}</motion.span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto mb-10 max-w-2xl">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Building intelligent AI tools that transform how we understand and create visual content.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              onHoverStart={() => setProjectsHovered(true)}
              onHoverEnd={() => setProjectsHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative h-12 overflow-hidden rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:bg-accent hover:shadow-md"
            >
              <span className="relative z-10 flex items-center gap-2">
                View{" "}
                <span className="relative inline-block min-w-[70px]">
                  <AnimatePresence mode="wait">
                    {projectsHovered ? (
                      <motion.span
                        key="animated"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex"
                      >
                        {"Projects".split("").map((char, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="static"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Projects
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document
                  .getElementById("photography")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-12 rounded-lg border border-border bg-secondary px-8 text-base font-medium text-secondary-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-muted hover:shadow-md"
            >
              View Photography
            </motion.button>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.5} className="absolute bottom-8">
        <button
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </FadeIn>
    </section>
  );
}
