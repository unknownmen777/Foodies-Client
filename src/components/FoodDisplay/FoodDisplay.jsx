import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({category, searchText}) => {
  const { foodList } = useContext(StoreContext);
  const fillterdFoods = foodList.filter(food =>
   ((category === 'All' || food.category === category) && food.name.toLowerCase().includes(searchText.toLowerCase()))
  ) ;

  return (
    <div className="container">
      <div className="row">
        {fillterdFoods.length > 0 ? (
          fillterdFoods.map((food, index) => (
            <FoodItem key={index}
                    id={food.id}
                    name={food.name}
                    description={food.description}
                    imageUrl={food.imageUrl}
                    price={food.price} />
          ))
        ) : (
          <div className="text-center mt-4">
            <h1>No food found.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
