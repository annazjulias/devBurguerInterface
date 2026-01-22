import { useContext, createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

const CartContext = createContext({});

export const CardProvider = ({ children }) => {
  const [cartProduts, setCartProducts] = useState([]);

  const putProductInCart = (product) => {
    const cartIndex = cartProduts.findIndex((prd) => prd.id === product.id);
    let newProducts = [];
    if (cartIndex >= 0) {
      newProducts = cartProduts;
      newProducts[cartIndex].quantity += 1;

      setCartProducts(newProducts);
    } else {
      product.quantity = 1;
      newProducts = [...cartProduts, product];
      setCartProducts(newProducts);

    }
    updateLocalStorage(newProducts);
  }

  const clearCart = () => {

    setCartProducts([]);
    updateLocalStorage([]);
   }

  const deleteProductFromCart = (productId) => {
    const newCart = cartProduts.filter((prd) => prd.id !== productId);
    setCartProducts(newCart);
    updateLocalStorage(newCart);
  }

  const incrementProductQuantity = (productId) => {
    const newCart = cartProduts.map((prd) => {
      return prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd;
    });

    setCartProducts(newCart);
    updateLocalStorage(newCart);
  }
  const decrementProductQuantity = (productId) => {
    const cartIndex = cartProduts.findIndex((prd) => prd.id === productId);

    if (cartProduts[cartIndex].quantity > 1) {
      const cartIndex = cartProduts.map((prd) => {
        return prd.id === productId ? { ...prd, quantity: prd.quantity - 1 } : prd;
      });
      setCartProducts(cartIndex);
      updateLocalStorage(cartIndex);
    } else {
      deleteProductFromCart(productId);
    }
  }
  const updateLocalStorage = (products) => {
    localStorage.setItem("cart", JSON.stringify(products));
  };


  useEffect(() => {
    const clientCartData = localStorage.getItem("cart");

    if (clientCartData) {
      setCartProducts(JSON.parse(clientCartData));
    }
  }, []);


  return (
    <CartContext.Provider value={{ cartProduts, putProductInCart, clearCart, deleteProductFromCart, incrementProductQuantity, decrementProductQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}