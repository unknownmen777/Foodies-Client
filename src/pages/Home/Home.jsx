import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodItem from '../../components/FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';
import PaginationComponent from '../../components/Pagination/PaginationComponent';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { foodList } = useContext(StoreContext);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const filteredFoods = foodList.filter(
    (food) => category === 'All' || food.category === category
  );

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredFoods.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    <main className="container">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />

      <div className="container">
        <div className="row">
          {currentItems.length > 0 ? (
            currentItems.map((food, index) => (
              <FoodItem
                key={index}
                id={food.id}
                name={food.name}
                description={food.description}
                imageUrl={food.imageUrl}
                price={food.price}
              />
            ))
          ) : (
            <div className="text-center mt-4">
              <h1>No food found.</h1>
            </div>
          )}
        </div>

        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Home;
