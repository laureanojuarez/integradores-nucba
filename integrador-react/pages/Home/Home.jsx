import React from "react";
import { Hero } from "../../src/components/Hero/Hero";
import { About } from "../../src/components/About/About";
import { CardSection } from "../../src/components/CardSection/CardSection";

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <CardSection />
    </main>
  );
};
