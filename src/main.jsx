import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SellPage } from "./SellPage.jsx";
import { UserContextProvider } from "./contexts/userContext.jsx";
import { ProductPage } from "./ProductPage.jsx";
import { SearchTextContextProvider } from "./contexts/SearchTextContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sell",
    element: <SellPage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <SearchTextContextProvider>
        <RouterProvider router={router} />
      </SearchTextContextProvider>
    </UserContextProvider>
  </StrictMode>
);
