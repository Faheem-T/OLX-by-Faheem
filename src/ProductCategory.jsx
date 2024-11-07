import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { supabase } from "./utils/supabaseClient";

export function ProductCategory() {
  return (
    <div className="flex gap-4">
      {Products.map((product) => (
        <Link
          className="flex flex-col w-[20%] h-60 content-center p-4 border"
          to={`/product/${product.id}`}
          key={product.id}
          state={{ product }}
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}

let { data: Products, error } = await supabase.from("OLX Product").select("*");
