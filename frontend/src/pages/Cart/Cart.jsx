import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }
  }, [token, navigate]);

  const handleProceedToCheckout = () => {
    if (getTotalCartAmount() === 0) {
      toast.error("Select at least one item");
    } else {
      navigate('/order');
    }
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className='cart-items-title cart-items-item'>
                <img src={item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.price}.00</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs. {item.price * cartItems[item._id]}</p>
                  <p><i className='fa-solid fa-xmark' onClick={() => removeFromCart(item._id)}></i></p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>Rs. {getTotalCartAmount() === 0 ? 0 : 30}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30}</b>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>Proceed to checkout</button>
        </div>
        
      </div>
    </div>
  );
};

export default Cart;
