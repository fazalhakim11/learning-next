import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type productType = {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
};

const DetailProduct = ({ products }: { products: productType }) => {
  const { query } = useRouter();
  const [data, setData] = useState<productType>();

  useEffect(() => {
    if (query.id) {
      fetch(`/api/products/${query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
        });
    }
  }, [query.id]);

  return (
    <div className="flex justify-center gap-5 mt-5">
      <div className="basis-[20%]">
        <h1>Detail Product CSR</h1>
        <img src={data?.image} alt="" />
        <h1 className="font-bold">{data?.name}</h1>
        <p className="text-[#515151]">{data?.category}</p>
        <p className="font-bold">
          {data?.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </div>
      <div className="basis-[20%]">
        <h1>Detail Product SSR/SSG</h1>
        <img src={products.image} alt="" />
        <h1 className="font-bold">{products.name}</h1>
        <p className="text-[#515151]">{products.category}</p>
        <p className="font-bold">
          {products.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </div>
    </div>
  );
};

export default DetailProduct;

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(`${process.env.URL}/api/products/${params.id}`);
  const response = await res.json();
  return {
    props: {
      products: response.data,
    },
  };
};

// export const getStaticPaths = async () => {
//   const res = await fetch(`${process.env.URL}/api/products/`);
//   const response = await res.json();

//   const paths = response.data.map((product: productType) => ({
//     params: {
//       id: product.id,
//     }
//   }));

//   return { paths, fallback: false}
// };

// export const getStaticProps = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   const res = await fetch(`${process.env.URL}/api/products/${params.id}`);
//   const response = await res.json();
//   return {
//     props: {
//       products: response.data,
//     },
//   };
// };
