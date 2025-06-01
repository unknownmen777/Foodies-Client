import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrder.css";

const MyOrder = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          {data.length === 0 ? (
            <div className="text-center py-5">
              <h4>No orders found.</h4>
            </div>
          ) : (
            <table className="table table-responsive">
              <tbody>
                {data?.map((order, index) => (
                  <tr key={index}>
                    <td>
                      {/* First item image as thumbnail */}
                      {order.orderItems?.length > 0 && (
                        <img
                          src={order.orderItems[0].imageUrl || ""}
                          alt={order.orderItems[0].name || "item"}
                          height={48}
                          width={48}
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                      )}
                    </td>
                    <td>
                      {order.orderItems?.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x{item.quantity}
                          {idx !== order.orderItems.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td>Rs.{order.amount}</td>
                    <td>Items: {order.orderItems?.length || 0}</td>
                    <td className="fw-bold text-capitalize">
                      <span className="text-success">&#x25cf;</span> {order.orderStatus}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-warning" onClick={fetchOrders}>
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
