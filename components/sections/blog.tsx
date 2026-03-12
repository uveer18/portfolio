"use client";

import { FadeIn, ViewportFadeSection } from "@/components/ui/motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

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

type AnimatedPost = (typeof posts)[number] & { key: string };

function BlogCard({ post }: { post: AnimatedPost }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
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
        <p className="text-sm leading-relaxed text-muted-foreground">{post.description}</p>
      </div>
      <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.article>
  );
}

export function Blog() {
  const [queue, setQueue] = useState<AnimatedPost[]>(() =>
    posts.map((post, index) => ({ ...post, key: `${post.title}-${index}` }))
  );
  const seedRef = useRef(posts.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prev) => {
        const [first, ...rest] = prev;
        if (!first) return prev;

        const sourceIndex = posts.findIndex((post) => post.title === first.title);
        const nextIndex = (sourceIndex + 1) % posts.length;
        const nextPost = posts[nextIndex];
        const key = `${nextPost.title}-${seedRef.current}`;
        seedRef.current += 1;

        return [...rest, { ...nextPost, key }];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeIndex = useMemo(() => posts.findIndex((post) => post.title === queue[0]?.title), [queue]);

  return (
    <ViewportFadeSection id="blog" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Blog</h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            Thoughts and explorations at the intersection of AI, machine learning, and photography.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card p-2">
            <div className="absolute right-4 top-4 flex gap-1">
              {posts.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ backgroundColor: i === activeIndex ? "var(--color-accent)" : "var(--color-border)" }}
                  className="h-1.5 w-1.5 rounded-full"
                />
              ))}
            </div>

            <AnimatePresence initial={false} mode="popLayout">
              {queue.map((post) => (
                <BlogCard key={post.key} post={post} />
              ))}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </ViewportFadeSection>
  );
}
