import { Pagination } from "react-bootstrap";

const TodoVisiblePages = (currentPage, totalPages, setPageHandler) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;
  let spaceStart = false;
  let spaceEnd = false;
  let pageComponents = [];
  let pageStart = 1;
  let pageEnd = totalPages;
  const gap = 1;
  if (currentPage - gap > 1) {
    pageStart = currentPage - gap;
    spaceStart = true;
  }
  if (currentPage + gap < totalPages) {
    pageEnd = currentPage + gap;
    spaceEnd = true;
  }
  while (pageStart <= pageEnd) {
    const p = pageStart;
    pageComponents.push(
      <Pagination.Item
        onClick={() => {
          setPageHandler(p - 1);
        }}
        active={p === currentPage}
        key={p}
      >
        {p}
      </Pagination.Item>
    );
    pageStart++;
  }
  return { isFirstPage, isLastPage, spaceStart, spaceEnd, pageComponents };
};
export default TodoVisiblePages;
