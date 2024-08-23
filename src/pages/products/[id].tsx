import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type productType = {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
};

const DetailProduct = ({products} : { products: productType}) => {
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
    <div>
      <h1>Detail Product</h1>
      <p>Products: {data?.name}</p>
      <p>Products: {products.name}</p>
    </div>
  );
};

export default DetailProduct;

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const response = await res.json();
  return {
    props: {
      products: response.data,
    },
  };
};

// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:3000/api/products");
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
//   const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
//   const response = await res.json();
//   return {
//     props: {
//       products: response.data,
//     },
//   };
// };
