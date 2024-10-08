import { useRouter } from "next/router";
const ShopPage = () => {
  const { query } = useRouter()
  return (
    <div>
      <h1>Shop</h1>
      <p>Products: {`${query.slug ? query.slug[0]:""} - ${query.slug ? query.slug[1]: ""}`}</p>
    </div>
  )
};

export default ShopPage
