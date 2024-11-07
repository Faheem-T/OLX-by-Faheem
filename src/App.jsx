import { Header } from "./Header";
import { SubHeader } from "./SubHeader";
import { ProductCategory } from "./ProductCategory";
import { UppyComponent } from "./UppyComponent";
import { useContext, useState } from "react";
import { signIn } from "../auth/auth_google_provider_create";
import { UserContext } from "./contexts/userContext";

function App() {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <>
      <Header />
      <SubHeader />
      <ProductCategory />
      <button onClick={signIn}>Sign in!</button>
      {/* <UppyComponent /> */}
    </>
  );
}

export default App;
