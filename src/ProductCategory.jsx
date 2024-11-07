import { ProductCard } from "./ProductCard";
import { supabase } from "./utils/supabaseClient";

export function ProductCategory() {
  return (
    <div className="flex gap-4">
      {Products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

let { data: Products, error } = await supabase.from("OLX Product").select("*");
