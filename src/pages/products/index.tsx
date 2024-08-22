import { useEffect, useState } from "react";

type productType = {
  id: number;
  name: string;
  price: number;
  size: string;
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
    <div>
      <h1 className="text-xl">Products</h1>
      {products.map((product: productType) => (
        <div key={product.id}>{product.name} </div>
      ))}
    </div>
  );
};

export default Products;
