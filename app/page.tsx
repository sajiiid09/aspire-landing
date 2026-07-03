import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { Destinations } from "@/components/sections/destinations";
import { CourseFinderCta } from "@/components/sections/course-finder-cta";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Destinations />
        <CourseFinderCta />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
      <ThemeSwitcher />
    </>
  );
}
