import Divider from "@/components/Divider";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import FinalCtaModal from "@/components/FinalCtaModal";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LossCalculator from "@/components/LossCalculator";
import Nav from "@/components/Nav";
import ServicesMarquee from "@/components/ServicesMarquee";
import StickyCta from "@/components/StickyCta";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ServicesMarquee />
        <LossCalculator />
        <Divider />
        <Testimonials />
        <Divider flip />
        <Faq />
        <Divider />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <FinalCtaModal />
    </>
  );
}
