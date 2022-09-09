import { useContext } from "react";
import { Pagination } from "react-bootstrap";
import TodosContext from "../../store/todos-context";

const TodoPagination = () => {
  const todosContext = useContext(TodosContext);
  const currentPage = todosContext.pagination.currentPage + 1;
  let pageComponents = [];
  let pageStart = 1;
  let pageEnd = todosContext.pagination.totalPages;
  if (currentPage - 3 > 0) {
    pageComponents.push(<Pagination.Ellipsis disabled key="space-start" />);
    pageStart = currentPage - 3;
  }
  if (currentPage + 3 < todosContext.pagination.totalPages) {
    pageEnd = currentPage + 3;
  }
  while (pageStart <= pageEnd) {
    const p = pageStart;
    pageComponents.push(
      <Pagination.Item
        onClick={() => {
          todosContext.setPage(p - 1);
        }}
        active={p === currentPage}
        key={p}
      >
        {p}
      </Pagination.Item>
    );
    pageStart++;
  }
  if (pageEnd === currentPage + 3)
    pageComponents.push(<Pagination.Ellipsis disabled key="space-end" />);
  return (
    <div className="d-flex">
      <Pagination className="mx-auto">
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => todosContext.setPage(0)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => todosContext.setPage(currentPage - 2)}
        />
        {pageComponents}
        <Pagination.Next
          onClick={() => todosContext.setPage(currentPage)}
          disabled={currentPage === todosContext.pagination.totalPages || todosContext.pagination.totalPages === 0}
        />
        <Pagination.Last
          onClick={() =>
            todosContext.setPage(todosContext.pagination.totalPages - 1)
          }
          disabled={currentPage === todosContext.pagination.totalPages || todosContext.pagination.totalPages === 0}
        />
      </Pagination>
    </div>
  );
};

export default TodoPagination;
