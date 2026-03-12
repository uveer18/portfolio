"use client";

import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
  ViewportFadeSection,
} from "@/components/ui/motion";
import { Brain, Camera, Code, Sparkles, GraduationCap, School } from "lucide-react";
import { motion } from "framer-motion";

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

const education = [
  {
    icon: GraduationCap,
    institution: "National Institute of Technology, Jalandhar",
    degree: "B.Tech in Information Technology",
    period: "2024 - 2028 (Expected)",
    description: "Current college: NIT Jalandhar. Focused on Machine Learning and Computer Vision.",
  },
  {
    icon: School,
    institution: "Higher Secondary School",
    degree: "Science (PCM with Computer Science)",
    period: "2022 - 2024",
    description: "School foundation built through mathematics, coding, and analytical problem solving.",
  },
];

export function About() {
  return (
    <ViewportFadeSection id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">About</h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="space-y-6">
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                I&apos;m an aspiring Machine Learning Engineer who enjoys building practical AI systems for image
                understanding and enhancement.
              </p>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                At college, I am currently an IT&apos;28 student at NIT Jalandhar, where I&apos;m exploring deep learning,
                computer vision, and real-world ML workflows.
              </p>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Outside ML, photography helps me stay creative. I&apos;m especially interested in nature and macro shots,
                and I bring that visual perspective back into my technical projects.
              </p>

              <div className="mt-8 border-t border-border pt-8">
                <h3 className="mb-6 text-lg font-semibold text-foreground">Education</h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.institution}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <edu.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{edu.institution}</h4>
                        <p className="text-sm text-accent">{edu.degree}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{edu.period}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeInStagger className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <FadeInStaggerItem key={item.title}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="group h-full rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
                >
                  <item.icon className="mb-4 h-6 w-6 text-accent" />
                  <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </motion.div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </ViewportFadeSection>
  );
}
