import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import Todo from "./Todo";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";

function Completed({
  setCurrentPage,
  todoData,
  currentPage,
  pageSize,
  editTodo,
  deleteTodo,
  setQuery,
  changePage,
  selectTodo,
  updateTodoFinish
}) {
  const data = todoData.filter(item => item.finish === true);

  const todos = paginate(data, pageSize, currentPage);

  return (
    <div className="md:w-full lg:w-4/5 xl:w-3/5 mt-4 h-full mx-auto px-2 md:p-4 ">
      <h1 className="text-xl md:text-3xl pt-8 pb-5 font-sans">Completed</h1>

      <div>
        <section className="flex my-4">
          <input
            type="text"
            required
            className="search-input md:text-light focus:outline-none focus:border-gray-400 focus:rounded-md"
            onChange={e => setQuery(e.target.value)}
          />
          <button className="flex justify-center items-center search-button">
            <MagnifyingGlassIcon className="w-4 h-4 text-base cursor-pointer" />
          </button>
        </section>

        <ul className="w-full">
          {todos.map(todo => (
            <Todo
              todo={todo}
              key={todo.id}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              selectTodo={selectTodo}
              updateTodoFinish={updateTodoFinish}
            />
          ))}
        </ul>
        <Pagination
          todosCount={todos.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={changePage}
          prevPage={() => setCurrentPage(currentPage - 1)}
          nextPage={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    </div>
  );
}

export default Completed;
