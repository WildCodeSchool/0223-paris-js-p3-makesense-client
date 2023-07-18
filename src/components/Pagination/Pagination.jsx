import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import ArrowPrev from "../../assets/pagination_arrow_prev.svg";
import ArrowNext from "../../assets/pagination_arrow_next.svg";

export default function PaginatedItems(props) {
  const { data, setCurrentItems } = props;
  const [pageCount, setPageCOunt] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCOunt(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      marginPagesDisplayed={1}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      renderOnZeroPageCount={null}
      previousLabel={<img alt="arrow" src={ArrowPrev} />}
      nextLabel={<img alt="arrow" src={ArrowNext} />}
      breakLabel="..."
      containerClassName="pagination c-blue"
      activeClassName="item active"
      breakClassName="item"
      pageClassName="item"
      previousClassName="item previous"
      nextClassName="item next "
    />
  );
}

PaginatedItems.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setCurrentItems: PropTypes.func.isRequired,
};
