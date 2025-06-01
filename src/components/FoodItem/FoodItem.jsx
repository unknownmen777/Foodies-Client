import React, { useContext } from 'react'
import "./FoodItem.css"
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({name, description, id, price, imageUrl}) => {
  const {increaseQty, decreaseQty, quantities} = useContext(StoreContext);

  return (
    <div className="col-md-4 col-lg-3 col-sm-6 mb-4 d-flex justify-content-center">
    <div className="card food-card max-width-320">
    <Link to={`/food/${id}`} >
      <img
        src={imageUrl}
        className="card-img-top food-img"
        alt={name}
      />
    </Link>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="h5 mb-0">${price}.00</span>
          <div>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-half text-warning"></i>
            <small className="text-muted">(4.5)</small>
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between bg-light">
        <Link className="btn btn-primary btn-sm" to={`/food/${id}`}>View Food</Link>
       {
        quantities[id] > 0 ? (
          <div className="d-flex align-items-center gap-2">
            <button className='btn btn-danger btn-sm' onClick={() => decreaseQty(id)}>
              <i className='bi bi-cart-dash '></i>
            </button>
            <span className='fw-bold'>{quantities[id]}</span>
            <button className='btn btn-success btn-sm' onClick={()=> increaseQty(id)}><i className='bi bi-cart-plus'></i></button>
          </div>
        ) :(
          <button className='btn btn-primary btn-sm' onClick={()=> increaseQty(id)}> 
          <i className='bi bi-cart4'></i>
          </button>
        )

       }
      </div>
    </div>
  </div>
  )
}

export default FoodItem;