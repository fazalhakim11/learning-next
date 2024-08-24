type productType = {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
};

const Products = (props: { products: productType[] }) => {
  const products = props.products;

  return (
    <div className="">
      <h1 className="text-xl font-bold text-center">Products</h1>
      {/* <div className="flex justify-center">
        {products.map((product: productType) => (
          <div key={product.id} className="basis-[20%]">
            <img src={product.image} alt="" />
            <h1 className="font-bold">{product.name}</h1>
            <p className="text-[#515151]">{product.category}</p>
            <p className="font-bold">
              {product.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Products;

export const getStaticProps = async () => {
  // const res = await fetch(`${process.env.URL}/api/products`);
  // const response = await res.json();
  return {
    props: {}
    //   products: response.data,
    // },
  };
};
