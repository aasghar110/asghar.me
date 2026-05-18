"use client";

import { useEffect, useState } from "react";
import Splash from "@/components/Splash";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useMotion } from "@/hooks/useMotion";
import { useLenis } from "@/hooks/useLenis";

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  useLenis();
  useMotion();

  return (
    <>
      <Splash gone={loaded} />
      <Cursor />
      <Nav />
      <ThemeToggle />
      <main>
        <Hero />
        <About />
        <Services />
        <TechStack />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
