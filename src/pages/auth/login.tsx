import Link from "next/link";
import { useState } from "react";

import style from "./Login.module.scss";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    setError("");
    event.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className={style.login}>
      <h1 className={style.login__title}>Login</h1>
      {error && <p className={style.login__error}>{error}</p>}
      <div className={style.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.login__form__item}>
            <label htmlFor="email" className={style.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className={style.login__form__item__input}
            />
          </div>
          <div className={style.login__form__item}>
            <label
              htmlFor="password"
              className={style.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className={style.login__form__item__input}
            />
          </div>
          <button
            type="submit"
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
          <button className={style.login__form__item__google} onClick={()=> signIn("google", {
            redirect: false,
            callbackUrl
          })}>Login with Google</button>
      </div>
      <p className={style.login__link}>
        Don{`'`}t have an account? <Link href={"/auth/register"}>Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
