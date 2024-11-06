import { createContext, useState } from "react";

export const UserContext = createContext({ user: {}, setUser: () => {} });

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
