import { useIsMobile } from "@/hooks/use-mobile";
import ClientMobileShell from "./ClientMobileShell";
import DesktopLayout from "./DesktopLayout";

interface AppLayoutProps {
  children: React.ReactNode;
  mobileContent?: React.ReactNode;
  hideNav?: boolean;
}

/**
 * Responsive layout wrapper that shows:
 * - Native app shell on mobile (< 768px)
 * - Traditional web layout on desktop (>= 768px)
 */
const AppLayout = ({ children, mobileContent, hideNav }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  
  // Show loading state briefly to prevent flash
  if (isMobile === undefined) {
    return null;
  }
  
  return (
    <>
      {/* Desktop Layout */}
      <DesktopLayout>{children}</DesktopLayout>
      
      {/* Mobile Layout */}
      <ClientMobileShell hideNav={hideNav}>
        {mobileContent || children}
      </ClientMobileShell>
    </>
  );
};

export default AppLayout;
