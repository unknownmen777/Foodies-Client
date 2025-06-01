import axios from "axios";
import { fetchFoodList } from "../service/FoodService";
import { createContext, useEffect, useState } from "react";
import Cart from "./../pages/Cart/Cart";
import { addToCart, getCartData } from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState();

  // Helper function to update cart in localStorage
  const updateLocalStorage = (newQuantities) => {
    localStorage.setItem("cart", JSON.stringify(newQuantities));
  };

  const increaseQty = async (foodId) => {
    const updatedQuantities = { 
      ...quantities, 
      [foodId]: (quantities[foodId] || 0) + 1 
    };
    setQuantities(updatedQuantities);
    updateLocalStorage(updatedQuantities); // Persist to localStorage
    await addToCart(foodId, token);
  };

  const decreaseQty = async (foodId) => {
    if (quantities[foodId] > 1) {
      const updatedQuantities = { 
        ...quantities, 
        [foodId]: quantities[foodId] - 1 
      };
      setQuantities(updatedQuantities);
      updateLocalStorage(updatedQuantities); // Persist to localStorage
    } else {
      // If quantity is 1 or less, remove the item from cart
      removeFromCart(foodId);
    }

    await removeFromCart(foodId, token); // Remove item from backend if necessary
  };

  const removeFromCart = (foodId) => {
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[foodId];
    setQuantities(updatedQuantities);
    updateLocalStorage(updatedQuantities); // Persist to localStorage
  };

  const loadCartData = (token) => {
    // Check if cart data exists in localStorage, if so, load it
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setQuantities(JSON.parse(storedCart));
    } else {
      // Load from backend if necessary
      getCartData(token).then((items) => {
        setQuantities(items);
        updateLocalStorage(items); // Persist fetched data to localStorage
      });
    }
  };

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodList(data);

      if (localStorage.getItem("token")) {
        const savedToken = localStorage.getItem("token");
        setToken(savedToken);
        loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
