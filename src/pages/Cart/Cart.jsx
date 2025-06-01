import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { calculateCartTotals } from '../../util/cartUtil';

const Cart = () => {
    const navigate = useNavigate();
    const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } = useContext(StoreContext);
    
    // Filter the cart items where quantities are greater than 0
    const cartItem = foodList.filter(food => quantities[food.id] > 0);
    
    // Calculate the cart totals
    const { subTotal, shipping, tax, total } = calculateCartTotals(cartItem, quantities);

    return (
        <div className="container py-5">
            <h1 className="mb-5">Your Shopping Cart</h1>
            <div className="row">
                <div className="col-lg-8">
                    {cartItem.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="card mb-4">
                            <div className="card-body">
                                {cartItem.map((food) => (
                                    <div key={food.id} className="row cart-item mb-3">
                                        <div className="col-md-3">
                                            <img
                                                src={food.imageUrl}
                                                alt={food.name}
                                                className="img-fluid rounded"
                                                width={100}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <h5 className="card-title">{food.name}</h5>
                                            <p className="text-muted">Category: {food.category}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    type="button"
                                                    onClick={() => decreaseQty(food.id)} // Decrease button
                                                    disabled={quantities[food.id] <= 0} // Disable if quantity is 0 or less
                                                >
                                                    -
                                                </button>
                                                <input
                                                    style={{ maxWidth: '100px' }}
                                                    type="text"
                                                    className="form-control form-control-sm text-center quantity-input"
                                                    value={quantities[food.id]}
                                                    readOnly
                                                />
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    type="button"
                                                    onClick={() => increaseQty(food.id)} // Increase button
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-end">
                                            <p className="fw-bold">
                                                Rs.{(food.price * quantities[food.id]).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => removeFromCart(food.id)} // Remove button
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <Link to={`/`} className="text-start mb-4">
                        <button className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                        </button>
                    </Link>
                </div>
                <div className="col-lg-4">
                    <div className="card cart-summary">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>Rs.{subTotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span>Rs.{subTotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax</span>
                                <span>Rs.{tax.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total</strong>
                                <strong>Rs.{subTotal === 0 ? 0.0 : total.toFixed(2)}</strong>
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                disabled={cartItem.length === 0}
                                onClick={() => navigate('/order')}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
