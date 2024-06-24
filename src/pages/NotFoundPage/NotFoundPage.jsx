import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <div className={css.div}>
      <h1>Page Not Found</h1>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};
export default NotFoundPage;
