import { Navbar } from "./components/Navbar";
import { auth } from "./lib/auth";
import { redirect } from "next/navigation";
import { Hero } from "./components/landingPageComponents/Hero";
import { Logos } from "./components/landingPageComponents/Logos";
import { Features } from "./components/landingPageComponents/Features";
import { Testimonial } from "./components/landingPageComponents/Testimonial";
import { CTA } from "./components/landingPageComponents/CTA";
import { FooterSection } from "./components/landingPageComponents/Footer";

export default async function Home() {
  const session = await auth();

  if(session?.user) {
    return redirect("/dashboard");
  }

  return (
      <>
        <Navbar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero/>
          <Logos/>
          <Features/>
          <Testimonial/>
          <CTA/>
          <FooterSection/>
        </div>
      </>
  );
}
