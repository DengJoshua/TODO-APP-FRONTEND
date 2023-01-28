import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import Dropdown from "./Dropdown";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import Pagination from "./common/Pagination";
import { Modal } from "@mui/material";

import Box from "@mui/material/Box";

function Inbox({
  user,
  addTodo,
  description,
  setCategory,
  categories,
  category,
  setCurrentPage,
  setDescription,
  setEndDate,
  title,
  setTitle,
  closeModal,
  modalOpen,
  setOpenModal,
  todoData,
  currentPage,
  pageSize,
  editTodo,
  deleteTodo,
  setQuery,
  errors,
  endDate,
  todoId,
  count,
  changePage,
  selected,
  setSelected,
  todos,
  updateTodo
}) {
  return (
    <div className="md:w-full lg:w-4/5 xl:w-3/5 h-full mx-auto px-2 md:p-4 ">
      <Modal open={modalOpen} onClose={() => setOpenModal(false)}>
        <Box>
          <AddTodo
            addTodo={addTodo}
            title={title}
            description={description}
            setDescription={setDescription}
            setTitle={setTitle}
            closeModal={closeModal}
            updateTodo={updateTodo}
            selected={selected}
            setSelected={setSelected}
            categories={categories}
            errors={errors}
            id={todoId}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Box>
      </Modal>
      <h1 className="text-xl md:text-3xl pt-8 pb-5 font-sans">Inbox</h1>
      <p className="text-base font-light md:text-lg mb-10">
        You currently have {todos.length} todos.
      </p>

      <div className="form-check my-2 mb-10">
        <input
          type="checkbox"
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-grey-600 checked:border-grey-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          onClick={() => setOpenModal(true)}
          defaultChecked
        />{" "}
        Add a new todo....
      </div>
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
        <Dropdown
          categories={categories}
          category={category}
          setCategory={setCategory}
        />

        <ul className="w-full">
          {todoData.map(todo => (
            <Todo
              todo={todo}
              key={todo.id}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
        <Pagination
          todosCount={count}
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

export default Inbox;
