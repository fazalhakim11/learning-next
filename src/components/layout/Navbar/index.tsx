import { signIn, signOut, useSession } from "next-auth/react";
import style from "./Navbar.module.css";

const Navbar = () => {
  const { data }: any = useSession();

  return (
    <div className={style.navbar}>
      <h1>Navbar</h1>
      <div className="flex content-center">
        {data?.user?.image ? (
          <img
            className={style.image}
            src={data.user.image}
            alt=""
          />
        ) : (
          ""
        )}
        <p className="me-5">{data ? data.user.fullname : ""}</p>
        {data ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
