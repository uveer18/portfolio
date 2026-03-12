"use client";

import { FadeIn } from "@/components/ui/motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHero } from "@/components/hero-context";

// Rotating info items for the subtitle area
const infoItems = [
  { type: "info", text: "IT'28 @ NITJ" },
  { type: "project", text: "LensIQ", href: "#projects" },
  { type: "blog", text: "Deep Learning in Photography", href: "#blog" },
  { type: "project", text: "PhotoCompAI", href: "#projects" },
];

// Text prediction animation - scrambles text before revealing
function useTextPrediction(targetText: string, isActive: boolean, duration: number = 1500) {
  const [displayText, setDisplayText] = useState(targetText);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  
  useEffect(() => {
    if (!isActive) {
      setDisplayText(targetText);
      return;
    }
    
    const steps = 8;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayText(targetText);
        clearInterval(interval);
        return;
      }
      
      // Calculate how many characters should be revealed
      const revealedCount = Math.floor((currentStep / steps) * targetText.length);
      
      // Build scrambled text
      let result = "";
      for (let i = 0; i < targetText.length; i++) {
        if (i < revealedCount) {
          result += targetText[i];
        } else if (targetText[i] === " ") {
          result += " ";
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayText(result);
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, [targetText, isActive, duration]);
  
  return displayText;
}

export function Hero() {
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nameAnimationActive, setNameAnimationActive] = useState(true);
  const [projectsHovered, setProjectsHovered] = useState(false);
  const [photographyHovered, setPhotographyHovered] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const { setIsHeroVisible, setHeroNamePosition } = useHero();
  
  const displayedName = useTextPrediction("Udayveer Singh", nameAnimationActive, 2000);

  // Update hero visibility and name position for navigation animation
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.bottom > 100;
        setIsHeroVisible(isVisible);
      }
      
      if (nameRef.current) {
        const rect = nameRef.current.getBoundingClientRect();
        setHeroNamePosition({ x: rect.left, y: rect.top });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsHeroVisible, setHeroNamePosition]);

  // Disable name animation after initial load
  useEffect(() => {
    const timer = setTimeout(() => setNameAnimationActive(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Rotate through info items every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentInfoIndex((prev) => (prev + 1) % infoItems.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentInfo = infoItems[currentInfoIndex];

  const handleInfoClick = () => {
    if (currentInfo.href) {
      document.getElementById(currentInfo.href.substring(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeIn>
          {/* Rotating info badge */}
          <div className="mb-4 flex items-center justify-center">
            <div className="relative h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.button
                  key={currentInfoIndex}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onClick={handleInfoClick}
                  className={`text-sm font-medium uppercase tracking-widest ${
                    currentInfo.href 
                      ? "cursor-pointer text-accent hover:text-accent/80" 
                      : "text-muted-foreground"
                  }`}
                >
                  {currentInfo.text}
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
          
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Aspiring Machine Learning Engineer & Photographer
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 
            ref={nameRef}
            className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl font-mono"
          >
            {displayedName}
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
            {/* View Projects Button */}
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

            {/* View Photography Button */}
            <motion.button
              onHoverStart={() => setPhotographyHovered(true)}
              onHoverEnd={() => setPhotographyHovered(false)}
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

      {/* Scroll indicator */}
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
