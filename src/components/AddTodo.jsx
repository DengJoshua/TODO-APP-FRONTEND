import React, { Fragment } from "react";
import { TagIcon, XCircleIcon } from "@heroicons/react/24/outline";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

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
  categories,
  selected,
  setSelected
}) => {
  return (
    <div className="w-full flex items-start gap-5 lg:w-3/5 mx-auto mt-56 bg-white rounded-xl p-5 transition-all duration-200 ">
      <input type="checkbox" className="mt-10 w-4 h-4" />
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
            className="text-2xl outline-none mb-3"
          />
          <textarea
            name="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ color: "#616161" }}
            rows="4"
            wrap="soft"
            className="text-general outline-none bg-white"
            placeholder="Enter the description..."
          >
            {" "}
          </textarea>
          <div className="flex justify-end gap-5 items-center">
            <TagIcon className="w-6 h-6  mx-3 cursor-pointer" />
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium text-gray-700">
                    Category:
                  </Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                      <span className="ml-3 block truncate">{selected}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {categories.map(category => (
                          <Listbox.Option
                            key={category.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-indigo-600"
                                  : "text-gray-900",
                                "relative cursor-default select-none py-2 pl-3 pr-9"
                              )
                            }
                            value={category.name}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {category.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            <button
              className="fit-content justify-center p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 "
              onClick={id ? updateTodo : addTodo}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
