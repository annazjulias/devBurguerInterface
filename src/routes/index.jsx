import { createBrowserRouter } from "react-router-dom";
import { Login } from "../containers/Login";
import { Register } from "../containers/Register";
import { Home } from "../containers/home";
import { Menu } from "../containers/Menu";

export const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/cadastro',
    element: < Register />
  },
  {
    path: '/',
    element: < Home />
  },
  {
    path: '/Cardapio',
    element: < Menu />
  }
])