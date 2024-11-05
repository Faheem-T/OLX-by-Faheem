import { useEffect, useState } from "react";
import { Header } from "./Header";
import { supabase } from "./utils/supabaseClient";
import { ProductCard } from "./ProductCard";
import { SubHeader } from "./SubHeader";

function App() {
  // const [images, setImages] = useState(null);

  // useEffect(() => {
  //   getImages();
  // }, []);

  // async function getImages() {
  //   const images = await supabase.storage.from("OLX Product Images").list();
  //   // console.log(images);
  //   setImages(images);
  // }

  return (
    <>
      <Header />
      <SubHeader />
      <ProductCard product={sampleProduct} />
      <ProductCard product={sampleProduct} />
      <ProductCard product={sampleProduct} />
      <ProductCard product={sampleProduct} />
    </>
  );
}

const sampleProduct = {
  img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Porsche/911/11757/1717680690776/front-left-side-47.jpg?tr=w-664",
  price: 20000,
  description: "Porche 911",
  location: "Kundannoor",
  uploadDate: "05/11/2024",
};

export default App;
