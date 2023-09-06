import styled from "styled-components";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page) => (
        <PaginationButton
          key={page}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: currentPage === page ? "bold" : "normal" }}
        >
          {page}
        </PaginationButton>
      ))}
    </div>
  );
};

const PaginationButton = styled.button`
  border-radius: 10%;
  padding: 10px;
  margin: 5px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ff2559;
  }
`;

export default Pagination;
