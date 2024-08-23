import Link from "next/link";
import { useEffect, useState } from "react";

type productType = {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
};

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  return (
    <div className="">
      <h1 className="text-xl font-bold text-center">Products</h1>
      <div className="flex justify-center">
        {products.map((product: productType) => (
          <Link href={`/products/${product.id}`} key={product.id} className="basis-[20%]">
            <img src={product.image} alt="" />
            <h1 className="font-bold">{product.name}</h1>
            <p className="text-[#515151]">{product.category}</p>
            <p className="font-bold">
              {product.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
