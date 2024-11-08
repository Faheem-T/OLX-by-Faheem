import { Link, redirect, useNavigate } from "react-router-dom";
import { UppyComponent } from "./UppyComponent";
import { useState, useEffect, useContext } from "react";
import { ImagePreview } from "./ImagePreview";
import { UserContext } from "./contexts/userContext";
import { supabase } from "./utils/supabaseClient";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { validate } from "uuid";

export function SellPage() {
  const navigate = useNavigate();
  const [imgUrls, setImgUrls] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const { user } = useContext(UserContext);

  const form = useForm();
  const { register, control, handleSubmit, formState, reset, setValue } = form;
  const { errors, isSubmitSuccessful } = formState;

  // Changing images field value when imgUrls array changes
  useEffect(() => {
    setValue("img", [...imgUrls]);
  }, [imgUrls]);

  // resetting form on successful submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

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
    const { data, error } = await supabase
      .from("OLX Product")
      .insert([
        { categories, price, description, details, img, location, seller },
      ])
      .select();
    console.log(data);
    console.error(error);
    navigate("/");
  };
  const onSubmit = async (data) => {
    console.log("form submitted", data);
    const seller = { name: user.displayName, email: user.email };
    const { response, error } = await supabase
      .from("OLX Product")
      .insert([{ ...data, seller, categories: data.categories.split(" ") }]) // overwriting categories since it has to be split first
      .select();
    console.log(response);
    console.error(error);
    navigate("/");
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
          // onSubmit={handleFormSubmit}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="w-full flex flex-col">
            <label htmlFor="categories">PRODUCT DESCRIPTION</label>
            <input
              placeholder="Product description"
              className="border rounded p-2"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
                validate: {
                  notAlphanumeric: (fieldValues) =>
                    /^(?![\s#!@]+$)[a-zA-Z0-9\s'"()]+$/i.test(fieldValues) ||
                    "Only enter alphanumeric characters",
                },
              })}
            />
            <div className="text-red-600 text-sm">
              {errors.description?.message}
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="categories">CATEGORIES</label>
            <input
              placeholder="Enter categories separated by spaces"
              className="border rounded p-2"
              {...register("categories", {
                required: {
                  value: true,
                  message: "Categories is required",
                },
              })}
            />
            <div className="text-red-600 text-sm">
              {errors.categories?.message}
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="details">INCLUDE SOME DETAILS</label>
            <textarea
              placeholder="Details..."
              className="border rounded p-2"
              {...register("details")}
            />
            <div className="text-red-600 text-sm">
              {errors.details?.message}
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="price">SET A PRICE</label>
            <div className="flex items-center">
              <span className="mr-2">₹</span>
              <input
                className="w-1/3 border rounded p-2"
                placeholder="Price"
                type="number"
                required
                {...register("price", {
                  required: {
                    value: true,
                    message: "Price is required",
                  },
                  validate: (fieldValues) =>
                    /[0-9]/.test(fieldValues) || "Invalid price",
                })}
              />
            </div>
            <div className="text-red-600 text-sm">{errors.price?.message}</div>
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="location">LOCATION</label>
            <textarea
              placeholder="Enter your location information"
              className="border rounded p-2"
              required
              {...register("location", {
                required: {
                  value: true,
                  message: "Location information is required",
                },
              })}
            />
            <div className="text-red-600 text-sm">
              {errors.location?.message}
            </div>
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
            <input
              type="hidden"
              {...register("img", {
                validate: (fieldValues) =>
                  fieldValues.length || "Upload atleast 1 image",
              })}
            />
            <div className="text-red-600 text-sm">{errors.img?.message}</div>
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            POST AD
          </button>
          <DevTool control={control} />
        </form>
      </div>
    </>
  );
}
