export function ProductCard({ product }) {
  const dateObj = new Date(product.createdAt);
  const date = `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
  console.log(product.img);
  // converting "string"
  let imgArr = product.img.replace(/[\[\]"]*/g, "").split(",");
  imgArr = imgArr.map((element) => element.trim());
  return (
    <div className="flex flex-col w-[20%] content-center p-4 border">
      <img src={imgArr[0]} className="" />
      <div className="text-xl font-bold">₹ {product.price}</div>
      <div>{product.description}</div>
      <div className="text-[12px] flex">
        <div>{product.location}</div>
        <div className="ms-auto">{date}</div>
      </div>
    </div>
  );
}

// Picture
// Price
// Description
// Location   Date
