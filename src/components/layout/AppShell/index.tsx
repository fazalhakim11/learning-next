import Navbar from "../Navbar";

type AppShellProps = {
    children: React.ReactNode
}

const AppShell = (props: AppShellProps) => {
  return (
    <div> 
      <Navbar/>
      {props.children}
    </div>
  )
};

export default AppShell
