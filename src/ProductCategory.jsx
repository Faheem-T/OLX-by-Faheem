import { ProductCard } from "./ProductCard";
import { supabase } from "./utils/supabaseClient";

export function ProductCategory() {
  return (
    <div className="flex gap-4">
      <ProductCard product={sampleProduct} />
      <ProductCard product={sampleProduct} />
      <ProductCard product={sampleProduct} />
      <ProductCard product={sampleProduct} />
    </div>
  );
}

let { data: Product, error } = await supabase
  .from("OLX Product")
  .select("*")
  .eq("description", "Porche 911");
console.log(Product[0]);
const sampleProduct = Product[0];
// const sampleProduct = {
//   img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Porsche/911/11757/1717680690776/front-left-side-47.jpg?tr=w-664",
//   price: 20000,
//   description: "Porche 911",
//   location: "Kundannoor",
//   uploadDate: "05/11/2024",
// };
