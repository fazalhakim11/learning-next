import style from "@/styles/404.module.scss"

const index = () => {
  return (
    <div className={style.error}>
        <h1>Oops!!</h1>
        <p>Not Found</p>
    </div>
  )
};

export default index
