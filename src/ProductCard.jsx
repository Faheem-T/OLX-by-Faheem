export function ProductCard({ product }) {
  return (
    <div className="flex flex-col w-[20%] content-center p-4 border">
      <img src={product.img} className="" />
      <div className="text-xl font-bold">₹ {product.price}</div>
      <div>{product.description}</div>
      <div className="text-[12px] flex">
        <div>{product.location}</div>
        <div className="ms-auto">{product.uploadDate}</div>
      </div>
    </div>
  );
}

// Picture
// Price
// Description
// Location   Date
