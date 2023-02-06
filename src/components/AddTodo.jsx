import React from "react";
import { TagIcon, XCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddTodo = ({
  addTodo,
  setDescription,
  setTitle,
  title,
  description,
  closeModal,
  updateTodo,
  id,
  tagname,
  setTagName,
  endDate,
  setEndDate,
  finish,
  setFinish
}) => {
  return (
    <div className="lg:w-3/5 mx-2 md:mx-auto mt-56 bg-white rounded-xl p-2 md:p-5 transition-all duration-200 ">
      <div className="flex items-start gap-5">
        <input
          type="checkbox"
          checked={finish}
          onChange={() => setFinish(!finish)}
          className="mt-10 w-4 h-4"
        />
        <div className="w-full">
          <div className="flex justify-between mb-3">
            <h1 className="font-800">LOGO</h1>
            <XCircleIcon
              onClick={closeModal}
              className="w-6 h-6 cursor-pointer justify-end"
            />
          </div>

          <form className="todo-form">
            <input
              type="text"
              required
              value={title}
              placeholder="Enter todo title..."
              onChange={e => setTitle(e.target.value)}
              className="text-base md:text-2xl outline-none mb-3"
            />
            <textarea
              name="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ color: "#616161" }}
              rows="4"
              wrap="soft"
              className="text-sm md:text-general outline-none bg-white mb-1"
              placeholder="Enter the description..."
            >
              {" "}
            </textarea>
          </form>
        </div>
      </div>
      <div className="flex w-full justify-center md:justify-end items-center">
        <input
          type="text"
          name="tagname"
          value={tagname}
          placeholder="tag name"
          className="text-sm w-20 outline-none border border-indigo-300 p-0.5 md:p-1 focus:border-indigo-400 rounded"
          onChange={e => setTagName(e.target.value)}
        />
        <label className="text-xs md:text-sm ml-1">Finish by:</label>
        <input
          type="date"
          value={endDate}
          className="text-xs ml-1 outline-none border border-indigo-300 p-1 focus:border-indigo-400 rounded"
          onChange={e => setEndDate(e.target.value)}
        />

        <button
          className="fit-content justify-center p-1 ml-1 md:p-2 rounded-md border border-gray-300 bg-white text-xs md:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 "
          onClick={id ? updateTodo : addTodo}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
