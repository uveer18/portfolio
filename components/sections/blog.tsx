"use client";

import { FadeIn } from "@/components/ui/motion";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const posts = [
  {
    title: "Building Better Exposure Models with Deep Learning",
    description:
      "Exploring how convolutional neural networks can predict optimal camera settings from scene analysis.",
    date: "Coming Soon",
    category: "Machine Learning",
  },
  {
    title: "The Art of Macro Photography",
    description:
      "Tips and techniques for capturing stunning close-up shots of nature's smallest details.",
    date: "Coming Soon",
    category: "Photography",
  },
  {
    title: "Understanding Neural Style Transfer",
    description:
      "A deep dive into how AI can apply artistic styles to photographs while maintaining realism.",
    date: "Coming Soon",
    category: "AI & Art",
  },
  {
    title: "Color Theory for Photographers",
    description:
      "How understanding color palettes can improve your photography and post-processing workflow.",
    date: "Coming Soon",
    category: "Photography",
  },
];

function BlogCard({ post, isHighlighted }: { post: (typeof posts)[number]; isHighlighted: boolean }) {
  return (
    <motion.article
      animate={{ 
        scale: isHighlighted ? 1.02 : 1,
        backgroundColor: isHighlighted ? "var(--color-muted)" : "transparent"
      }}
      transition={{ duration: 0.3 }}
      className="group flex items-start justify-between gap-4 border-b border-border py-6 last:border-0 rounded-lg px-4 transition-all"
    >
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-3">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
        <h3 className="mb-2 text-lg font-medium text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
      </div>
      <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.article>
  );
}

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const isInView = useInView(sectionRef, { 
    margin: "-33% 0px -33% 0px",
    amount: 0
  });
  const isContainerInView = useInView(containerRef, { amount: 0.3 });

  // Auto-scroll through blog posts when section is in view
  useEffect(() => {
    if (!isContainerInView) return;
    
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % posts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isContainerInView]);

  return (
    <motion.section 
      ref={sectionRef}
      id="blog" 
      className="px-6 py-24 md:py-32"
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 30
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Blog
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            Thoughts and explorations at the intersection of AI, machine
            learning, and photography.
          </p>
        </FadeIn>

        <FadeIn>
          <div 
            ref={containerRef}
            className="rounded-xl border border-border bg-card p-2 relative overflow-hidden"
          >
            {/* Scroll indicator */}
            <div className="absolute right-4 top-4 flex gap-1">
              {posts.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    backgroundColor: i === highlightedIndex 
                      ? "var(--color-accent)" 
                      : "var(--color-border)"
                  }}
                  className="h-1.5 w-1.5 rounded-full"
                />
              ))}
            </div>
            
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogCard post={post} isHighlighted={index === highlightedIndex} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </motion.section>
  );
}
