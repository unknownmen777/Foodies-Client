import React from 'react';

const PaginationComponent = ({ totalPages, currentPage, setCurrentPage }) => {
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mt-2">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => goToPage(currentPage - 1)}>«</button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => goToPage(i + 1)}>{i + 1}</button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => goToPage(currentPage + 1)}>»</button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
