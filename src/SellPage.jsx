import { Link } from "react-router-dom";
import { UppyComponent } from "./UppyComponent";
import { useState, useEffect, useContext } from "react";
import { ImagePreview } from "./ImagePreview";
import { UserContext } from "./contexts/userContext";
import { supabase } from "./utils/supabaseClient";

export function SellPage() {
  const [imgUrls, setImgUrls] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const { user } = useContext(UserContext);
  // Track loading progress
  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  // Function to generate thumbnail URL
  const getThumbnailUrl = (url) => {
    return url + "?width=160&height=160&resize=contain";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { target: form } = e;
    const description = form.description.value;
    const categories = form.categories.value.split(" ");
    const details = form.details.value;
    const price = form.price.value;
    const location = form.location.value;
    const seller = { name: user.displayName, email: user.email };
    const img = imgUrls;
    //const formData = { description, categories, details, price, location, imgUrls };
    //console.log(formData);

    const { data, error } = await supabase
      .from("OLX Product")
      .insert([
        { categories, price, description, details, img, location, seller },
      ])
      .select();
    console.log(data);
    console.error(error);

    // const { categories } = new FormData(e.target);
    // console.log(categories);
    //  const formData = new FormData(e.target);
    //for (let item of formData) console.log(item);
  };

  return (
    <>
      <div className="h-16 bg-gray-100 flex items-center p-4">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center text-primary text-xl">
        <div className="font-bold text-2xl">POST YOUR AD</div>
        <form
          className="border p-4 w-4/6 flex flex-col gap-4"
          onSubmit={handleFormSubmit}
        >
          <div className="w-full flex flex-col">
            <label htmlFor="categories">DESCRIPTION</label>
            <input
              name="description"
              placeholder="Product description"
              className="border rounded p-2"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="categories">CATEGORIES</label>
            <input
              name="categories"
              placeholder="Enter categories separated by spaces"
              className="border rounded p-2"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="details">INCLUDE SOME DETAILS</label>
            <textarea
              name="details"
              placeholder="Details..."
              className="border rounded p-2"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="price">SET A PRICE</label>
            <div className="flex items-center">
              <span className="mr-2">₹</span>
              <input
                className="w-1/3 border rounded p-2"
                name="price"
                placeholder="Price"
                type="number"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="location">LOCATION</label>
            <textarea
              name="location"
              placeholder="Enter your location information"
              className="border rounded p-2"
            />
          </div>
          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center">
              <div>UPLOAD PHOTOS</div>
              {imgUrls.length > 0 && (
                <div className="text-sm text-gray-500">
                  {loadedImages} / {imgUrls.length} loaded
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 p-4">
              {imgUrls.map((url, i) => (
                <ImagePreview
                  key={i}
                  url={getThumbnailUrl(url)}
                  onClick={() => console.log(url.slice(url.lastIndexOf("/")))}
                  onLoad={handleImageLoad}
                />
              ))}
            </div>
            <UppyComponent setImgUrls={setImgUrls} />
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            POST AD
          </button>
        </form>
      </div>
    </>
  );
}
