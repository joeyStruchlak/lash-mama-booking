import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import NavigationButtons from "@/components/home/NavigationButtons";
import WaitingList from "@/components/home/WaitingList";
import ShopPreview from "@/components/home/ShopPreview";
import Testimonials from "@/components/home/Testimonials";
import BookingCTA from "@/components/home/BookingCTA";
import VIPProgressBanner from "@/components/home/VIPProgressBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <NavigationButtons />
        {/* VIP Progress - shows for non-VIP users */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <VIPProgressBanner currentBookings={7} requiredBookings={10} />
          </div>
        </section>
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
