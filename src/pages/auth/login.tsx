import Link from "next/link";
import { useRouter } from "next/router";

import style from "./Login.module.scss"

const LoginPage = () => {
    const {push} = useRouter()

    const handleLogin = () => {
        push("/products")
    }
  return (
    <div className={style.login}>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      <p>Belum punya akun? buat <Link href={"/auth/register"}>disini</Link></p>
    </div>
  )
};

export default LoginPage
