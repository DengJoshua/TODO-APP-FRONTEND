import React from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  CalendarIcon,
  ChatBubbleOvalLeftIcon
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Todo({ todo, deleteTodo, editTodo, selectTodo, updateTodoFinish }) {
  const formatDate = input => {
    const date = Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short"
    }).format(new Date(input));
    return date;
  };

  return (
    <li
      className={`flex bg-white rounded-lg items-start mb-4 shadow-xl p-3 ${
        todo.finish ? "bg-gray-200" : ""
      }`}
      onClick={() => selectTodo(todo)}
    >
      <input
        type="checkbox"
        checked={todo.finish}
        className="accent-gray-500 mt-1 border-none mx-2"
        onChange={() => updateTodoFinish(todo)}
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <span className="text-title overflow-auto">{todo.title}</span>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button>
                <EllipsisHorizontalIcon className="w-6 h-6 md:w-8 md:h-8 " />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 cursor-pointer fit-content origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => editTodo(todo)}
                      >
                        Edit
                      </span>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </span>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <p className="text-general mb-1">{todo.description}</p>
        <div className="flex justify-between mt-2">
          <span className="fit-content text-general p-0.5 left cursor-pointer rounded-md border border-gray-300 text-sm hover:bg-gray-50 ">
            {todo.tags}
          </span>
          <div className="flex text-general items-center">
            <span className="text-blue-500 text-sm">
              {formatDate(todo.end_date)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Todo;
