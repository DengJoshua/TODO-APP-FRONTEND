import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const AddTodo = (addTodo, setDescription, setTitle, title, description) => {
  return (
    <div>
      <form>
        <label>Title:</label>
        <input
          type="text"
          className=""
          onChange={e => setTitle(e.target.value)}
          value={title}
          name="title"
          required
        />
        <label>Description:</label>
        <input
          type="text"
          className=" "
          onChange={e => setDescription(e.target.value)}
          value={description}
          name="title"
          required
        />
        <button className="" onClick={() => addTodo()}>
          <PlusIcon className="h-6 w-6 text-blue-500" />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
