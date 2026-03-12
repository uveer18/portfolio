"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem, ViewportFadeSection } from "@/components/ui/motion";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "LensIQ",
    description:
      "AI-powered exposure prediction tool that analyzes scene lighting and recommends optimal camera settings for perfect shots.",
    tech: ["Python", "TensorFlow", "OpenCV", "FastAPI"],
    github: "https://github.com/udayveet/lensiq",
  },
  {
    title: "PhotoCompAI",
    description:
      "Composition analysis AI that evaluates framing, rule of thirds, and visual balance to help photographers improve their shots.",
    tech: ["PyTorch", "CNN", "React", "Node.js"],
    github: "https://github.com/udayveet/photocompai",
  },
  {
    title: "ColorFlow",
    description:
      "Image mood classification system that analyzes color palettes and emotional tones in photographs using deep learning.",
    tech: ["Python", "Keras", "scikit-learn", "Flask"],
    github: "https://github.com/udayveet/colorflow",
  },
  {
    title: "NoiseSense",
    description:
      "Advanced AI image denoising tool that preserves detail while removing noise from high ISO and low-light photographs.",
    tech: ["TensorFlow", "U-Net", "Python", "CUDA"],
    github: "https://github.com/udayveet/noisesense",
  },
  {
    title: "EditIQ",
    description:
      "AI photo editing assistant that suggests adjustments for exposure, contrast, and color grading based on image analysis.",
    tech: ["PyTorch", "ResNet", "Next.js", "AWS"],
    github: "https://github.com/udayveet/editiq",
  },
  {
    title: "StyleLens",
    description:
      "Neural style transfer system that applies artistic styles to photographs while maintaining photorealistic quality.",
    tech: ["Python", "GANs", "TensorFlow", "Docker"],
    github: "https://github.com/udayveet/stylelens",
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
    >
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`View ${project.title} on GitHub`}
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
      
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Hover arrow indicator */}
      <div className="absolute bottom-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <ViewportFadeSection id="projects" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Projects
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            A collection of AI-powered tools designed to help photographers and
            creators enhance their visual content.
          </p>
        </FadeIn>

        <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <FadeInStaggerItem key={project.title}>
              <ProjectCard project={project} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </ViewportFadeSection>
  );
}
