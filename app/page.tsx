import Divider from "@/components/Divider";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import FinalCtaModal from "@/components/FinalCtaModal";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LossCalculator from "@/components/LossCalculator";
import Nav from "@/components/Nav";
import ReportCarousel from "@/components/ReportCarousel";
import ServicesMarquee from "@/components/ServicesMarquee";
import Steps from "@/components/Steps";
import StickyCta from "@/components/StickyCta";
import Testimonials from "@/components/Testimonials";
import Trust from "@/components/Trust";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ServicesMarquee />
        <LossCalculator />
        <Divider />
        <ReportCarousel />
        <Steps />
        <Testimonials />
        <Trust />
        <Divider flip />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <FinalCtaModal />
    </>
  );
}
