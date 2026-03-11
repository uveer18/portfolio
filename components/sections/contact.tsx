"use client";

import { FadeIn } from "@/components/ui/motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  {
    name: "GitHub",
    href: "https://github.com/uveer18",
    icon: Github,
    label: "@uveer18",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/uveer18",
    icon: Linkedin,
    label: "Udayveer Singh",
  },
  {
    name: "Email",
    href: "mailto:uday.work@gmail.com",
    icon: Mail,
    label: "uday.work@gmail.com",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/udayveer.singh06",
    icon: Instagram,
    label: "@udayveer.singh06",
  },
  {
    name: "Photography",
    href: "https://instagram.com/soltragrv",
    icon: Instagram,
    label: "@soltragrv",
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Contact
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="text-center">
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Interested in collaborating or just want to say hello?
            </p>
            <p className="mb-12 text-2xl font-medium text-foreground md:text-3xl">
              {"Let's connect."}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                whileHover={{ y: -2 }}
                className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon className="h-5 w-5" />
                <span className="text-sm">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
