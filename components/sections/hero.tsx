"use client";

import { FadeIn } from "@/components/ui/motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Dynamic subtitle phrases that will rotate
const subtitlePhrases = [
  "Building intelligent AI tools",
  "Creating visual experiences",
  "Exploring deep learning",
  "Capturing artistic moments",
  "Bridging AI and art",
];

export function Hero() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(subtitlePhrases[0]);
  const [displayText, setDisplayText] = useState(subtitlePhrases[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(-1);
  const lastScrollY = useRef(0);
  const phraseIndex = useRef(0);

  // Glitch effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      // Trigger glitch when scroll delta exceeds threshold
      if (scrollDelta > 30 && !isGlitching) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isGlitching]);

  // Typewriter effect for dynamic text
  useEffect(() => {
    const interval = setInterval(() => {
      // Move to next phrase
      phraseIndex.current = (phraseIndex.current + 1) % subtitlePhrases.length;
      const newPhrase = subtitlePhrases[phraseIndex.current];
      
      setIsTyping(true);
      
      // Find where the phrases differ
      let diffStart = 0;
      while (diffStart < currentPhrase.length && diffStart < newPhrase.length && currentPhrase[diffStart] === newPhrase[diffStart]) {
        diffStart++;
      }
      
      // Erase from end to diffStart, then type new content
      let charIndex = currentPhrase.length;
      
      // Erase phase
      const eraseInterval = setInterval(() => {
        if (charIndex > diffStart) {
          charIndex--;
          setCursorPosition(charIndex);
          setDisplayText(currentPhrase.slice(0, charIndex));
        } else {
          clearInterval(eraseInterval);
          
          // Type phase
          let typeIndex = diffStart;
          const typeInterval = setInterval(() => {
            if (typeIndex < newPhrase.length) {
              typeIndex++;
              setCursorPosition(typeIndex);
              setDisplayText(newPhrase.slice(0, typeIndex));
            } else {
              clearInterval(typeInterval);
              setCurrentPhrase(newPhrase);
              setCursorPosition(-1);
              setIsTyping(false);
            }
          }, 50);
        }
      }, 30);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentPhrase]);

  const [projectsHovered, setProjectsHovered] = useState(false);
  const [photographyHovered, setPhotographyHovered] = useState(false);

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
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Machine Learning Engineer & Photographer
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 
            className={`mb-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl ${isGlitching ? 'glitch-active' : ''}`}
          >
            Udayveer Singh
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/* Dynamic text with highlight box */}
          <div className="mx-auto mb-10 max-w-2xl">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              <span 
                className="inline-flex items-center rounded-md px-2 py-1 transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--color-highlight)',
                  border: '1px solid var(--color-highlight-border)'
                }}
              >
                {displayText}
                {isTyping && (
                  <span 
                    className="cursor-blink ml-0.5 inline-block h-5 w-0.5 bg-foreground md:h-6"
                  />
                )}
              </span>
              {" "}that transform how we understand and create visual content.
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
                <span className="relative">
                  <span className={`transition-all duration-300 ${projectsHovered ? 'opacity-0' : 'opacity-100'}`}>
                    Projects
                  </span>
                  {/* Text predict animation */}
                  {projectsHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 text-accent-foreground"
                    >
                      <span className="inline-flex">
                        {"Projects".split("").map((char, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    </motion.span>
                  )}
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
              className="h-12 rounded-lg border border-border bg-secondary px-8 text-base font-medium text-secondary-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-muted hover:shadow-md"
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
