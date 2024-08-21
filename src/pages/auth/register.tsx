import Link from "next/link";

import style from "./Login.module.scss"

const RegisterPage = () => {
  return (
    <div className={style.login} >
      <h1>Register Page</h1>
      <p>Sudah punya akun? masuk <Link href={"/auth/login"}>disini</Link></p>
    </div>
  )
};

export default RegisterPage
