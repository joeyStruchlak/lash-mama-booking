import AppLayout from "@/components/layout/AppLayout";
import Hero from "@/components/home/Hero";
import NavigationButtons from "@/components/home/NavigationButtons";
import WaitingList from "@/components/home/WaitingList";
import ShopPreview from "@/components/home/ShopPreview";
import Testimonials from "@/components/home/Testimonials";
import BookingCTA from "@/components/home/BookingCTA";
import VIPProgressBanner from "@/components/home/VIPProgressBanner";
import { useUserRole } from "@/contexts/UserRoleContext";

const Index = () => {
  const { currentRole } = useUserRole();

  // Mock data based on user role
  const userBookings = {
    guest: 0,
    regular: 7,
    vip: 15,
    admin: 0,
  };

  const content = (
    <>
      <Hero />
      <NavigationButtons />
      {/* VIP Progress - shows for non-VIP users (regular users) */}
      {(currentRole === "regular" || currentRole === "guest") && (
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <VIPProgressBanner 
              currentBookings={userBookings[currentRole]} 
              requiredBookings={10} 
            />
          </div>
        </section>
      )}
      <WaitingList />
      <ShopPreview />
      <Testimonials />
      <BookingCTA />
    </>
  );

  return <AppLayout>{content}</AppLayout>;
};

export default Index;
