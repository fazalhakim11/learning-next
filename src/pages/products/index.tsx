import Image from "next/image";
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
    <div className="w-[85%] mx-auto">
      <h1 className="text-xl font-bold text-center">Products</h1>
      <div className="flex flex-wrap gap-[4%] md:gap-0">
        {products.map((product: productType) => (
          <Link href={`/products/${product.id}`} key={product.id} className="basis-[48%] md:basis-[25%] mb-[15px]">
            {/* <img src={product.image} alt={product.name} /> */}
            <Image src={product.image} alt={product.name} width={500} height={500}/>
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
