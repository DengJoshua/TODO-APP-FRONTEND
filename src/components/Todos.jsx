import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import { BASE_URL } from "../API";
import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  Squares2X2Icon
} from "@heroicons/react/24/solid";
import {
  TagIcon,
  CalendarIcon,
  XCircleIcon,
  ChatBubbleOvalLeftIcon
} from "@heroicons/react/24/outline";
import Category from "./Category";

const cookies = new Cookies();
const categories = [
  {
    name: "Category1",
    id: 1,
    href: "#"
  },
  {
    name: "Category2",
    id: 2,
    href: "#"
  },
  {
    name: "Category3",
    id: 3,
    href: "#"
  },
  {
    name: "Category4",
    id: 4,
    href: "#"
  }
];

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setOpenModal] = useState(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  const fetchAllTodos = async () => {
    const cookie = cookies.get("auth_token");

    await axios
      .get(`${BASE_URL}/api/todos`, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  };

  const addTodo = async e => {
    e.preventDefault();
    const cookie = cookies.get("auth_token");

    await axios
      .post(
        `${BASE_URL}/api/todos`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${cookie}`
          }
        }
      )
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.log(err));
    setTitle("");
    setDescription("");
    setOpenModal(false);
  };

  const deleteTodo = async id => {
    const cookie = cookies.get("auth_token");

    await axios
      .delete(`${BASE_URL}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then(res => setTodos(res.data));
  };

  useEffect(() => {
    fetchAllTodos();
    setIsLoadingTodos(false);
  }, []);

  return (
    <React.Fragment>
      {" "}
      {isLoadingTodos ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <span className="ml-2">Loading Todos....</span>
        </div>
      ) : (
        <div>
          <section className="todo-section w-full">
            {modalOpen && (
              <div className="modalBackground w-full bg-center">
                <div className="modalContainer md:w-3/4 mx-auto my-10 mx-2 transition-all duration-200 ">
                  <div className="flex justify-between mb-3">
                    <h1 className="font-800">LOGO</h1>
                    <XCircleIcon
                      onClick={() => setOpenModal(false)}
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
                      className="title-text text-lg font-medium leading-6 text-gray-900"
                    />
                    <textarea
                      name="text"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows="5"
                      cols="10"
                      wrap="soft"
                      className="description-text"
                      placeholder="Enter the description"
                    >
                      {" "}
                    </textarea>
                    <div className="flex justify-end">
                      <TagIcon className="w-6 h-6 my-3 mx-3 cursor-pointer" />
                      <CalendarIcon className="w-6 h-6 my-3 mx-3 cursor-pointer" />

                      <button
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        onClick={addTodo}
                      >
                        Create todo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="md:w-3/5 h-screen mx-auto ">
              <h1 className="text-3xl pt-8 pb-5 font-sans">
                Welcome back, {user.username}
              </h1>
              <p className="text-base mb-10">
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
                    onChange={e => setSearch(e.target.value)}
                  />
                  <button className="flex justify-center items-center search-button">
                    <MagnifyingGlassIcon className="w-4 h-4 text-base cursor-pointer" />
                  </button>
                </section>
                <Category categories={categories} />

                <ul className="w-full">
                  {todos.map(todo => (
                    <li
                      className="flex bg-white rounded-lg items-start mb-3 shadow-xl p-3"
                      key={todo.id}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-gray-200 checked:border-gray-200 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      />
                      <div className="flex items-center  w-full">
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <span className="text-title">{todo.title}</span>
                            <EllipsisHorizontalIcon className="md:w-8 md:h-8 flex right cursor-pointer" />
                          </div>

                          <p className="text-general">{todo.description}</p>
                          <div className="flex justify-between mt-2">
                            <span className="flex fit-content justify-center cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                              <Squares2X2Icon className="w-5 h-5 mr-2" />
                              Catergory
                            </span>
                            <div className="flex">
                              5
                              <CalendarIcon className="h-6 w-6 cursor-pointer ml-1 mr-3" />
                              3
                              <ChatBubbleOvalLeftIcon className="h-6 w-6 cursor-pointer ml-1 mr-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </React.Fragment>
  );
};

export default Todos;
