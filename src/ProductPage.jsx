import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { SubHeader } from "./SubHeader";
import { useRef, useState } from "react";

export function ProductPage() {
  const {
    state: { product },
  } = useLocation();
  const currentImgRef = useRef(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  function handleNextClick() {
    if (currentImgIndex < product.img.length - 1)
      setCurrentImgIndex((prev) => prev + 1);
  }

  function handlePrevClick() {
    if (currentImgIndex > 0) setCurrentImgIndex((prev) => prev - 1);
  }

  console.log(product);
  return (
    <>
      <Header />
      <SubHeader />
      <div className="p-4">
        <div className="h-full w-full flex p-2 text-primary">
          {/*Images Section*/}
          <div className="w-1/2">
            <div className="relative w-2/3 flex items-center justify-center">
              <button
                onClick={handlePrevClick}
                className="absolute inset-y-[50%] left-0"
              >
                {/*Left Chevron */}
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
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <img ref={currentImgRef} src={product.img[currentImgIndex]} />
              <button
                onClick={handleNextClick}
                className="absolute inset-y-[50%] right-0"
              >
                {/*Right Chevron */}
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
            {/*Thumbnails*/}
            <div className="h-full w-full flex p-2">
              {product.img.map((url, i) => (
                <img
                  src={url}
                  key={i}
                  className={
                    "h-20 " +
                    (i === currentImgIndex ? `border border-blue-800` : ``)
                  }
                  onClick={() => {
                    setCurrentImgIndex(i);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="border">
            {/*Price + desc section */}
            <div className="font-bold text-2xl">₹ {product.price}</div>
            <div>{product.description}</div>
            <div className="text-xs">
              <div>{product.location}</div>
              <div>{product.createdAt}</div>
            </div>
            {/*Seller section */}
            <div className="text-xs">
              Seller
              <div>{product.seller.name}</div>
              <div>{product.seller.email}</div>
            </div>
          </div>
        </div>
        {/*Details section */}
        <div className="text-primary">
          <div className="font-bold">Details</div>
          <div>{product.details}</div>
        </div>
      </div>
    </>
  );
}
