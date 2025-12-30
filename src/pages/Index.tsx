import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import NavigationButtons from "@/components/home/NavigationButtons";
import WaitingList from "@/components/home/WaitingList";
import ShopPreview from "@/components/home/ShopPreview";
import Testimonials from "@/components/home/Testimonials";
import BookingCTA from "@/components/home/BookingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <NavigationButtons />
        <WaitingList />
        <ShopPreview />
        <Testimonials />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
