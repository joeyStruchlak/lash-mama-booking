import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedServices from "@/components/home/FeaturedServices";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import BookingCTA from "@/components/home/BookingCTA";
import WaitingList from "@/components/home/WaitingList";
import ShopButton from "@/components/home/ShopButton";
import VIPPreview from "@/components/home/VIPPreview";
import ReferralBanner from "@/components/home/ReferralBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WaitingList />
        <FeaturedServices />
        <ShopButton />
        <VIPPreview />
        <ReferralBanner />
        <AboutPreview />
        <Testimonials />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
