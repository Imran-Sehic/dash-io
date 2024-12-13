import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
  username: string | null;
  setUsername: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const handleSetUsername = (name: string) => {
    localStorage.setItem("username", name);
    setUsername(name);
  };

  return (
    <UserContext.Provider value={{ username, setUsername: handleSetUsername }}>
      {children}
    </UserContext.Provider>
  );
};
