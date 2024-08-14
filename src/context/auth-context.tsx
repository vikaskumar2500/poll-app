import { createContext, ReactNode, useState } from "react";

export type User = {
  username: string;
  password: string;
};

interface AuthContext {
  Logout: () => void;
  user: User | null;
  Login: (user: User) => void;
}

export const authContext = createContext<AuthContext>({
  Logout: () => {},
  user: null,
  Login: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const Login = (user: User) => {
    setUser(user);
  };

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <authContext.Provider value={{ Logout, user, Login }}>
      {children}
    </authContext.Provider>
  );
}
