import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Portfolio } from "../components/Portfolio";
import { About } from "../components/About";
import { Reviews } from "../components/Reviews";
import { CTA } from "../components/CTA";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Reviews />
      <CTA />
    </>
  );
}
