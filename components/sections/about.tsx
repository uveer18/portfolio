"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";
import { Brain, Camera, Code, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Specializing in deep learning models for image analysis and computer vision applications.",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capturing artistic nature and macro photography as a creative outlet.",
  },
  {
    icon: Code,
    title: "AI Development",
    description: "Building practical tools that leverage AI to enhance visual content creation.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Exploring the intersection of technology and art to create meaningful experiences.",
  },
];

export function About() {
  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              About
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="space-y-6">
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                I am a Machine Learning Engineer with a deep passion for image
                processing and computer vision. My work focuses on developing AI
                systems that understand, analyze, and enhance visual content.
              </p>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Beyond the algorithms and code, I find balance through
                photography. Capturing the intricate details of nature and the
                world around me provides a creative perspective that often
                inspires my technical work.
              </p>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                My goal is to build tools that empower creators and
                photographers to enhance their craft using AI, making advanced
                technology accessible and intuitive.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <FadeInStaggerItem key={item.title}>
                <div className="group rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted">
                  <item.icon className="mb-4 h-6 w-6 text-accent" />
                  <h3 className="mb-2 font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
