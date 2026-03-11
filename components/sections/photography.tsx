"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

const photos = [
  {
    src: "/images/gallery/photo-1.jpg",
    alt: "Morning dew on leaf - Macro photography",
    title: "Morning Dew",
  },
  {
    src: "/images/gallery/photo-2.jpg",
    alt: "Misty mountains at sunset - Landscape photography",
    title: "Mountain Mist",
  },
  {
    src: "/images/gallery/photo-3.jpg",
    alt: "Butterfly wing detail - Macro photography",
    title: "Wings of Color",
  },
  {
    src: "/images/gallery/photo-4.jpg",
    alt: "Sunbeams through forest - Nature photography",
    title: "Forest Light",
  },
  {
    src: "/images/gallery/photo-5.jpg",
    alt: "Delicate flower with dew - Botanical photography",
    title: "Petal Drops",
  },
  {
    src: "/images/gallery/photo-6.jpg",
    alt: "Ocean waves at sunset - Seascape photography",
    title: "Coastal Dreams",
  },
];

function Lightbox({
  photo,
  onClose,
}: {
  photo: (typeof photos)[number];
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={1200}
          height={800}
          className="h-auto max-h-[85vh] w-auto rounded-lg object-contain"
        />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {photo.title}
        </p>
      </motion.div>
    </motion.div>
  );
}

function PhotoCard({
  photo,
  onClick,
}: {
  photo: (typeof photos)[number];
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm font-medium text-foreground">{photo.title}</p>
      </div>
    </motion.button>
  );
}

export function Photography() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(null);

  const handleClose = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  return (
    <section id="photography" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Photography
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <FadeIn>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            A curated collection of nature and macro photography capturing the
            beauty and intricacy of the natural world.
          </p>
        </FadeIn>

        <FadeInStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <FadeInStaggerItem key={photo.src}>
              <PhotoCard photo={photo} onClick={() => setSelectedPhoto(photo)} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox photo={selectedPhoto} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
