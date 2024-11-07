export function ProductCard({ product }) {
  const dateObj = new Date(product.createdAt);
  const date = `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
  return (
    <>
      <div className="w-full h-2/3 overflow-hidden">
        <img src={product.img[0]} className="max-w-full" />
      </div>
      <div className="text-xl font-bold">₹ {product.price}</div>
      <div>{product.description}</div>
      <div className="text-[12px] flex">
        <div>{product.location}</div>
        <div className="ms-auto">{date}</div>
      </div>
    </>
  );
}

// Picture
// Price
// Description
// Location   Date
