import Link from "next/link";
import { useState } from "react";

import style from "./Register.module.scss";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: any) => {
    setIsLoading(true)
    setError("")
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      fullname: event.target.fullname.value,
      password: event.target.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      event.target.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(result.status === 400 ? "Email already exists" : "");
    }
  };

  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Register</h1>
      {error && <p className={style.register__error}>{error}</p>}
      <div className={style.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.register__form__item}>
            <label
              htmlFor="fullname"
              className={style.register__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="fullname"
              className={style.register__form__item__input}
            />
          </div>
          <div className={style.register__form__item}>
            <label
              htmlFor="email"
              className={style.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className={style.register__form__item__input}
            />
          </div>
          <div className={style.register__form__item}>
            <label
              htmlFor="password"
              className={style.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className={style.register__form__item__input}
            />
          </div>
          <button type="submit" className={style.register__form__item__button} disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={style.register__link}>
        Have an account? <Link href={"/auth/login"}>Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
