import { Route, Routes } from "react-router-dom";
import { Cart, Home, Login, Menu, Register } from "../containers";
import { Checkout } from "../components/checkout";
import { CompletePayment } from "../components/completePayment";
import { UserLayout } from "../layouts/useralayout";
import { AdminLayout } from "../layouts/adiminLayout";
import { NewProduts } from "../containers/admin/newProducts";
import { Products } from "../containers/admin/products";
import { Orders } from "../containers/admin/orders";
import { EditProduct} from "../containers/admin/editarProdutos";


export function Router() {
  return (
    <Routes>
    <Route path="/" element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="cardapio" element={<Menu />} />
      <Route path="carrinho" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="completePayment" element={<CompletePayment />} />
    </Route>
  
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="pedidos" element={<Orders />} />
      <Route path="novo-produto" element={<NewProduts />} />
      <Route path="editar-produto" element={<EditProduct />} />
      <Route path="produtos" element={<Products />} />
    </Route>
  
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Register />} />
  </Routes>
  
  )
}
