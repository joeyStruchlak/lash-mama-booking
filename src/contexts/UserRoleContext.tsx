import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "guest" | "regular" | "vip" | "staff" | "manager" | "admin";

interface UserRoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem("userRole");
    return (saved as UserRole) || "regular";
  });

  useEffect(() => {
    localStorage.setItem("userRole", currentRole);
  }, [currentRole]);

  return (
    <UserRoleContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};
