import { Pagination } from "react-bootstrap";

const TodoPagination = () => {
    return (
        <div className="d-flex">
        <Pagination className="mx-auto">
          <Pagination.First />
          <Pagination.Prev />
          {/* <Pagination.Ellipsis /> */}
    
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item active>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
    
          {/* <Pagination.Ellipsis /> */}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
        </div>
      );
}

export default TodoPagination