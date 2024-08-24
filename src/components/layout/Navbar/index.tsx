import { signIn, signOut, useSession } from "next-auth/react";
import style from "./Navbar.module.css"

const Navbar = () => {
  const { data } = useSession()

  return (
    <div className={style.navbar}>
      <h1>Navbar</h1>
      <div className="flex">
      <p className="me-5">{data && data.user?.email}</p>
      {data ? 
      <button onClick={()=>signOut()}>Sign Out</button>
      :
      <button onClick={()=>signIn()}>Sign In</button>
      }
      </div>
    </div>
  )
};

export default Navbar
