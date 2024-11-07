import { createContext, useState } from "react";

export const SearchTextContext = createContext({
  searchText: "",
  setSearchText: () => {},
  searchCategory: "",
  setSearchCategory: () => {},
});

export function SearchTextContextProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  return (
    <SearchTextContext.Provider
      value={{ searchText, setSearchText, searchCategory, setSearchCategory }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
