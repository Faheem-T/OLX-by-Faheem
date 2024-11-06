import { Link } from "react-router-dom";
import { UppyComponent } from "./UppyComponent";

export function SellPage() {
  return (
    <>
      <div className="h-16 bg-gray-100 flex items-center p-4">
        {/*Left arrow */}
        <Link to="/">
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
            <label htmlFor="categories">SELECT CATEGORIES</label>
            <input
              name="categories"
              placeholder="Enter categories separated by spaces"
              className="border"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="details">INCLUDE SOME DETAILS</label>
            <textarea
              name="details"
              placeholder="Details..."
              className="border"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="price">SET A PRICE</label>
            <div>
              <span>₹ </span>
              <input
                className="w-1/3 border"
                name="price"
                placeholder="Price"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="location">LOCATION</label>
            <textarea
              name="location"
              placeholder="Enter your location information"
              className="border"
            />
          </div>
          <div className="w-full flex flex-col">
            <div>UPLOAD PHOTOS</div>
            <UppyComponent />
          </div>
          <button type="submit">POST AD</button>
        </form>
      </div>
    </>
  );
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  // const { categories } = new FormData(e.target);
  // console.log(categories);
  const formData = new FormData(e.target);
  for (let item of formData) console.log(item);
};
