// src/context/CartContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import toast from "react-hot-toast";

const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {
  // STATES
  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  //
  // FETCH CART
  //
  const fetchCart =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        // NO TOKEN
        if (!token) {
          setCartItems([]);

          setLoading(false);

          return;
        }

        // FETCH
        const { data } =
          await API.get("/cart");

        setCartItems(
          data.items || []
        );
      } catch (error) {
        console.log(error);

        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

  //
  // LOAD CART
  //
  useEffect(() => {
    fetchCart();
  }, []);

  //
  // ADD TO CART
  //
  const addToCart =
    async (product) => {
      try {
        const { data } =
          await API.post(
            "/cart",
            {
              productId:
                product.id,

              title:
                product.title,

              price:
                product.price,

              image:
                product.image,

              quantity:
                product.quantity ||
                1,
            }
          );

        setCartItems(
          data.items
        );

        toast.success(
          "Added To Cart"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Add Failed"
        );
      }
    };

  //
  // REMOVE FROM CART
  //
  const removeFromCart =
    async (id) => {
      try {
        const { data } =
          await API.delete(
            `/cart/${id}`
          );

        setCartItems(
          data.items
        );

        toast.success(
          "Removed From Cart"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Remove Failed"
        );
      }
    };

  //
  // CLEAR CART
  //
  const clearCart =
    async () => {
      try {
        await API.delete(
          "/cart"
        );

        setCartItems([]);

        toast.success(
          "Cart Cleared"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Clear Failed"
        );
      }
    };

  //
  // INCREASE QUANTITY
  //
  const increaseQty =
    async (id) => {
      try {
        const updatedItems =
          cartItems.map(
            (item) =>
              item.productId ===
              id
                ? {
                    ...item,

                    quantity:
                      item.quantity +
                      1,
                  }
                : item
          );

        setCartItems(
          updatedItems
        );
      } catch (error) {
        console.log(error);
      }
    };

  //
  // DECREASE QUANTITY
  //
  const decreaseQty =
    async (id) => {
      try {
        const updatedItems =
          cartItems.map(
            (item) =>
              item.productId ===
                id &&
              item.quantity >
                1
                ? {
                    ...item,

                    quantity:
                      item.quantity -
                      1,
                  }
                : item
          );

        setCartItems(
          updatedItems
        );
      } catch (error) {
        console.log(error);
      }
    };

  //
  // TOTAL PRICE
  //
  const totalPrice =
    cartItems.reduce(
      (
        total,
        item
      ) =>
        total +
        item.price *
          item.quantity,

      0
    );

  //
  // TOTAL ITEMS
  //
  const totalItems =
    cartItems.reduce(
      (
        total,
        item
      ) =>
        total +
        item.quantity,

      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,

        loading,

        addToCart,

        removeFromCart,

        clearCart,

        increaseQty,

        decreaseQty,

        totalPrice,

        totalItems,

        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart =
  () =>
    useContext(
      CartContext
    );