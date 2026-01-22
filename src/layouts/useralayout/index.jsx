import { Outlet } from "react-router-dom";
import { Heder, Footer } from "../../components";

export function UserLayout() {
  return (
    <>
      <Heder />
      <Outlet />
      <Footer />
    </>
  );
}
