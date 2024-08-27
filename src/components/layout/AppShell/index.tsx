import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { Roboto } from "next/font/google"

type AppShellProps = {
    children: React.ReactNode
}

const disableNavbar = ["/auth/login", "/auth/register", "/404"]

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["400","700"]
})

const AppShell = (props: AppShellProps) => {
  const { pathname } = useRouter()

  return (
    <div className={roboto.className}> 
      {!disableNavbar.includes(pathname) && <Navbar/>}
      {props.children}
    </div>
  )
};

export default AppShell
