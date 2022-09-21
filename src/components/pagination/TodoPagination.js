import { useContext } from "react";
import { Pagination } from "react-bootstrap";
import TodosContext from "../../store/todos-context";
import TodoVisiblePages from "./TodoVisiblePages";

const TodoPagination = () => {
  const todosContext = useContext(TodosContext);
  const currentPage = todosContext.pagination.currentPage + 1;
  const totalPages = todosContext.pagination.totalPages;

  const setPagehandler = (page) => {
    todosContext.setPage(page);
  };
  const { isFirstPage, isLastPage, spaceStart, spaceEnd, pageComponents } =
    TodoVisiblePages(currentPage, totalPages, setPagehandler);
  return (
    <div className="d-flex">
      <Pagination className="mx-auto">
        <Pagination.First
          disabled={isFirstPage}
          onClick={() => setPagehandler(0)}
        />
        <Pagination.Prev
          disabled={isFirstPage}
          onClick={() => setPagehandler(currentPage - 2)}
        />
        {spaceStart && <Pagination.Ellipsis disabled />}
        {pageComponents}
        {spaceEnd && <Pagination.Ellipsis disabled />}
        <Pagination.Next
          onClick={() => setPagehandler(currentPage)}
          disabled={isLastPage}
        />
        <Pagination.Last
          onClick={() => setPagehandler(totalPages - 1)}
          disabled={isLastPage}
        />
      </Pagination>
    </div>
  );
};

export default TodoPagination;
