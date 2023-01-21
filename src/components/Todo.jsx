import React from "react";
import {
  EllipsisHorizontalIcon,
  Squares2X2Icon
} from "@heroicons/react/24/solid";
import {
  CalendarIcon,
  ChatBubbleOvalLeftIcon
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Todo({ todo, deleteTodo, editTodo }) {
  return (
    <li className="flex bg-white rounded-lg items-start mb-4 shadow-xl p-3">
      <input
        type="checkbox"
        className="accent-gray-500 mt-1 border-none mx-2"
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
          <span className="flex fit-content text-generla justify-center items-center cursor-pointer rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            <Squares2X2Icon className="w-4 h-4 mr-2 text-general" />
            {todo.category}
          </span>
          <div className="flex">
            5
            <CalendarIcon className="h-6 w-6 text-general cursor-pointer ml-1 mr-3" />
            3
            <ChatBubbleOvalLeftIcon className="h-6 w-6 text-general cursor-pointer ml-1 mr-2" />
          </div>
        </div>
      </div>
    </li>
  );
}

export default Todo;
