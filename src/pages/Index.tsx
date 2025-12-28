import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedServices from "@/components/home/FeaturedServices";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import BookingCTA from "@/components/home/BookingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedServices />
        <AboutPreview />
        <Testimonials />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
