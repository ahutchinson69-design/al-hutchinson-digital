/**
 * Home — eleven sections, in order.
 * Every section is a server component except the hero, which animates on load.
 */

import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { Introduction } from "@/components/home/Introduction";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HealthcareAIFeature } from "@/components/home/HealthcareAIFeature";
import { CareerTimeline } from "@/components/home/CareerTimeline";
import { CurrentlyExploring } from "@/components/home/CurrentlyExploring";
import { BlogPreview } from "@/components/home/BlogPreview";
import { MediaFeature } from "@/components/home/MediaFeature";
import { BookingSection } from "@/components/home/BookingSection";
import { CallToAction } from "@/components/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Introduction />
      <FeaturedProjects />
      <HealthcareAIFeature />
      <CareerTimeline />
      <CurrentlyExploring />
      <BlogPreview />
      <BookingSection />
      <MediaFeature />
      <CallToAction />
    </>
  );
}
