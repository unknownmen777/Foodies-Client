import React, { useContext } from "react";
import Menubar from "./components/Menubar/Menubar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import ExploreFood from "./pages/ExploreFood/ExploreFood";
import FoodDetails from "./components/FoodDetails/FoodDetails";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login";
import Resgister from "./pages/Register/Resgister";
import MyOrder from "./components/MyOrder/MyOrder";
import { StoreContext } from "./context/StoreContext";

function App() {
  const { token } = useContext(StoreContext);
  return (
    <div>
      <Menubar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={token ? <PlaceOrder /> : <Login />} />
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/register" element={token ? <Home /> : <Resgister />} />
        <Route path="/myorder" element={token ? <MyOrder /> : <Login />} />
      </Routes>
     
    </div>
  );
}

export default App;
