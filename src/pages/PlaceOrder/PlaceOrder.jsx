import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtil";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { foodList, quantities, token } = useContext(StoreContext);

  // Filter items with quantity greater than 0
  const cartItem = foodList.filter((food) => quantities[food.id]);
  const { subTotal, shipping, tax, total } = calculateCartTotals(
    cartItem,
    quantities
  );

  const [formData, setFormData] = useState({
    amount: "0",
    tax_amount: "0",
    total_amount: "0",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "https://online-foods-delivary.vercel.app/myorder",
    failure_url: "https://online-foods-delivary.vercel.app/order",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    district: "",
    zip: "",
  });

  // Function to generate eSewa signature
  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  // Update the signature whenever total changes
  useEffect(() => {
    const updatedAmount = total.toFixed(2);
    const updatedFormData = {
      ...formData,
      amount: updatedAmount,
      total_amount: updatedAmount,
    };
    const { total_amount, transaction_uuid, product_code, secret } =
      updatedFormData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );

    setFormData({
      ...updatedFormData,
      signature: hashedSignature,
    });
  }, [total]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Handle order submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderData = {
      userAddress: `${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.city}, ${formData.district}, ${formData.zip}`,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      orderItems: cartItem.map((item) => ({
        foodId: item.id, // Adjusted: use item.id instead of item.foodId
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: total.toFixed(2),

      paymentStatus: "Paid",
      paymentReferenceId: formData.transaction_uuid,
      orderStatus: "Preparing",
    };

    try {
      const response = await axios.post(
        "https://fooddies.up.railway.app/api/orders/create",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        // Success - initiate payment
        initiateEsewaPayment(formData); // Pass formData for eSewa
      } else {
        toast.error("Unable to place order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to place order. Please try again.");
    }
  };

  // Function to redirect to eSewa payment page
  const initiateEsewaPayment = (formData) => {
    const form = document.createElement("form");
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    form.method = "POST";

    Object.keys(formData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = formData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit(); // Submit form to eSewa
  };

  return (
    <div className="container mt-3 vh-100">
      <div className="text-center">
        <img
          className="d-block mx-auto mb-2"
          src={assets.logo}
          alt=""
          width={110}
          height={140}
        />
      </div>

      <div className="row g-5">
        {/* Cart Items */}
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">
              {cartItem.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cartItem.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between lh-sm"
              >
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">
                    Qty: {quantities[item.id]}
                  </small>
                </div>
                <span className="text-muted">
                  Rs.{item.price * quantities[item.id]}
                </span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <span>Shipping</span>
              </div>
              <span className="text-body-secondary">
                {subTotal === 0 ? 0.0 : shipping.toFixed(2)}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <span>Tax (10%)</span>
              </div>
              <span className="text-body-secondary">{tax.toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (Rs.)</span>
              <strong>Rs.{total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>

        {/* Billing Form */}
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            {/* Hidden fields */}
            <input
              type="hidden"
              name="tax_amount"
              value={formData.tax_amount}
              required
            />
            <input
              type="hidden"
              name="total_amount"
              value={formData.total_amount}
              required
            />
            <input
              type="hidden"
              name="transaction_uuid"
              value={formData.transaction_uuid}
              required
            />
            <input
              type="hidden"
              name="product_code"
              value={formData.product_code}
              required
            />
            <input
              type="hidden"
              name="product_service_charge"
              value={formData.product_service_charge}
              required
            />
            <input
              type="hidden"
              name="product_delivery_charge"
              value={formData.product_delivery_charge}
              required
            />
            <input
              type="hidden"
              name="success_url"
              value={formData.success_url}
              required
            />
            <input
              type="hidden"
              name="failure_url"
              value={formData.failure_url}
              required
            />
            <input
              type="hidden"
              name="signed_field_names"
              value={formData.signed_field_names}
              required
            />
            <input
              type="hidden"
              name="signature"
              value={formData.signature}
              required
            />

            {/* User Info */}
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="John"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Doe"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group has-validation">
                  <span className="input-group-text">@</span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    name="email"
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="98xxxxxxxx"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  value={formData.address}
                  name="address"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="district" className="form-label">
                  District
                </label>
                <select
                  className="form-select"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={onChangeHandler}
                  required
                >
                  <option value="">Choose...</option>
                  <option>Rupandehi</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <select
                  className="form-select"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={onChangeHandler}
                  required
                >
                  <option value="">Choose...</option>
                  <option>Butwal</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>

            <hr className="my-4" />
            <button
              className="w-100 btn btn-success btn-lg"
              type="submit"
              disabled={cartItem.length === 0}
            >
              Pay via E-Sewa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
