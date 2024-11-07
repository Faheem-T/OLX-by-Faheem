import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { supabase } from "./utils/supabaseClient";
import { useContext } from "react";
import { SearchTextContext } from "./contexts/SearchTextContext";

export function ProductCategory() {
  const { searchText, searchCategory } = useContext(SearchTextContext);
  // Regular expression for searchBar

  const searchRegex = new RegExp(`.*${searchText.trim()}.*`, "gi");
  let searchCategoryRegex = "";
  if (searchCategory) {
    searchCategoryRegex = new RegExp(`.*${searchCategory.trim()}.*`, "gi");
  }
  console.log(typeof searchCategory);
  return (
    <div className="flex gap-4 flex-wrap p-4 ml-auto">
      {Products.map((product) => {
        // ignoring product if not matching search
        if (
          !(
            // comparing search text
            (
              product.description.match(searchRegex) ||
              product.details.match(searchRegex)
            )
          )
        )
          return;
        // ignoring product if not matching category
        if (
          !product.categories.includes(searchCategory?.toLowerCase()) &&
          searchCategory // making sure searchCategory is not null
        )
          return;
        return (
          <Link
            className="flex flex-col w-[20%] h-60 content-center p-4 border"
            to={`/product/${product.id}`}
            key={product.id}
            state={{ product }}
          >
            <ProductCard product={product} />
          </Link>
        );
      })}
    </div>
  );
}

let { data: Products, error } = await supabase.from("OLX Product").select("*");
