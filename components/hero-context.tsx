"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface HeroContextType {
  isHeroVisible: boolean;
  setIsHeroVisible: (visible: boolean) => void;
  heroNamePosition: { x: number; y: number } | null;
  setHeroNamePosition: (pos: { x: number; y: number } | null) => void;
}

const HeroContext = createContext<HeroContextType | null>(null);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [heroNamePosition, setHeroNamePosition] = useState<{ x: number; y: number } | null>(null);

  return (
    <HeroContext.Provider value={{ isHeroVisible, setIsHeroVisible, heroNamePosition, setHeroNamePosition }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHero must be used within a HeroProvider");
  }
  return context;
}
