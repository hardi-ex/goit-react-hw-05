import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export const Layout = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
