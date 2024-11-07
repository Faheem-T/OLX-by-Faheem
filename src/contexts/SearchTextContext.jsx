import { createContext, useState } from "react";

export const SearchTextContext = createContext({
  searchText: "",
  setSearchText: () => {},
});

export function SearchTextContextProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  return (
    <SearchTextContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchTextContext.Provider>
  );
}
