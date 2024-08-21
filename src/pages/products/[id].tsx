import { useRouter } from "next/router";
const DetailProduct = () => {
  const { query } = useRouter()
  return (
    <div>
      <h1>Detail Product</h1>
      <p>Products: {query.id}</p>
    </div>
  )
};

export default DetailProduct
