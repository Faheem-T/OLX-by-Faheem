import { Header } from "./Header";
import { SubHeader } from "./SubHeader";
import { ProductCategory } from "./ProductCategory";
import { useContext, useState } from "react";
import { signIn } from "../auth/auth_google_provider_create";
import { UserContext } from "./contexts/userContext";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";
import { SearchTextContextProvider } from "./contexts/SearchTextContext";

function App() {
  return (
    <>
      <Header />
      <SubHeader />
      <ProductCategory />
      <button onClick={signIn}>Sign in!</button>
      <Footer />
    </>
  );
}

export default App;
