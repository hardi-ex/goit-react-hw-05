import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import image from "../../img/popcorn.svg";

const buildNavClass = ({ isActive }) => {
  return clsx(isActive && css.activeNavLink);
};

export const Navigation = () => {
  return (
    <header className={css.header}>
      <div className={css.mainInfo}>
        <img src={image} alt="" width="50" height="50" />
        <p className={css.title}>FilmArea</p>
      </div>

      <nav>
        <ul className={css.list}>
          <li>
            <NavLink className={buildNavClass} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={buildNavClass} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
