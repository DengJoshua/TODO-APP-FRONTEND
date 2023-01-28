import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import { BASE_URL } from "../API";

import { paginate } from "../utils/paginate";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CalendarViewDay from "@mui/icons-material/CalendarTodayOutlined";
import { ListItemAvatar } from "@mui/material";
import Sidebar from "./common/Sidebar";
import Today from "./Today";
import { Routes, Route } from "react-router";
import Upcoming from "./Upcoming";
import Inbox from "./Inbox";

const cookies = new Cookies();
const categories = [
  {
    name: "All",
    id: 1
  },
  {
    name: "Social",
    id: 2
  },
  {
    name: "Work",
    id: 3
  },
  {
    name: "Entertainment",
    id: 4
  },
  {
    name: "Family",
    id: 5
  }
];

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [endDate, setEndDate] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [selected, setSelected] = useState("Entertainment");
  const [category, setCategory] = useState(categories[0].name);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setOpenModal] = useState(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [errors, setErrors] = useState(null);
  const pageSize = 4;

  const startDate = new Date().toISOString().slice(0, 10);

  const menuItems1 = [
    {
      text: "Today",
      icon: <CalendarToday />,
      path: "today"
    },
    {
      text: "Next 7 Days",
      icon: <CalendarViewDay />,
      path: "upcoming"
    },
    {
      text: "Inbox",
      icon: <InboxIcon />,
      path: "inbox"
    }
  ];

  const menuItems2 = [
    {
      text: "Completed",
      icon: <ListItemAvatar />,
      path: "completed"
    },
    {
      text: "Won't Do",
      icon: <CalendarViewDay />,
      path: "upcoming"
    },
    {
      text: "Trash",
      icon: <CalendarToday />,
      path: "upcoming"
    }
  ];

  let filteredTodos = todos.filter(todo => {
    if (category === "Work") {
      return todo.category === "Work";
    } else if (category === "Social") {
      return todo.category === "Social";
    } else if (category === "Family") {
      return todo.category === "Family";
    } else if (category === "Entertainment") {
      return todo.category === "Entertainment";
    } else if (category === "All") {
      return todo;
    }
  });

  const keys = ["title", "description", "category"];

  const search = data => {
    return data.filter(item =>
      keys.some(key => item[key].toLowerCase().includes(query))
    );
  };

  const todoData = paginate(
    search(query ? todos : filteredTodos),
    pageSize,
    currentPage
  );

  const closeModal = () => {
    setTodoId(null);
    setDescription("");
    setTitle("");
    setOpenModal(false);
  };

  const changePage = page => {
    setCurrentPage(page);
  };

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
        {
          title,
          description,
          category: selected,
          end_date: endDate,
          start_date: startDate
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`
          }
        }
      )
      .then(res => {
        if (res.status === 201) {
          setTodos(res.data);
          setOpenModal(false);
          setCategory("All");
          setTitle("");
          setDescription("");
          setSelected("Entertainment");
          console.log(res.status);
        } else {
          setErrors(res.data);
        }
      })
      .catch(err => console.log(err));
  };

  const editTodo = async todo => {
    setDescription(todo.description);
    setTitle(todo.title);
    setTodoId(todo.id);
    setSelected(todo.category);
    setOpenModal(true);
  };

  const updateTodo = async e => {
    e.preventDefault();
    const cookie = cookies.get("auth_token");

    await axios
      .put(
        `${BASE_URL}/api/todos/${todoId}`,
        {
          title,
          description,
          category: selected,
          start_date: startDate,
          end_date: endDate
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`
          }
        }
      )
      .then(res => {
        setTodos(res.data);
        setTitle("");
        setEndDate("");
        setDescription("");
        setSelected("Entertainment");
        setTodoId(null);
        setOpenModal(false);
      })
      .catch(err => console.log(err));
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
    if (todos.length <= 1) {
      setCurrentPage(1);
    }
    setIsLoadingTodos(false);
  }, []);

  const count = search(filteredTodos).length;

  return (
    <React.Fragment>
      {" "}
      {isLoadingTodos ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <span className="ml-2">Loading Todos....</span>
        </div>
      ) : (
        <section className="bg-bgcolor w-full h-full">
          <div className="md:flex">
            <Sidebar menuItems1={menuItems1} menuItems2={menuItems2} />
            <Routes>
              <Route
                path="/today"
                element={
                  <Today
                    deleteTodo={deleteTodo}
                    description={description}
                    selected={selected}
                    setCategory={setCategory}
                    categories={categories}
                    category={category}
                    setCurrentPage={setCurrentPage}
                    setDescription={setDescription}
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
                    todoId={todoId}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    todoData={todoData}
                    user={user}
                    editTodo={editTodo}
                    setQuery={setQuery}
                    setOpenModal={setOpenModal}
                    changePage={changePage}
                    currentPage={currentPage}
                    count={count}
                    modalOpen={modalOpen}
                    todos={todos}
                  />
                }
              />
              <Route path="upcoming" element={<Upcoming />} />
              <Route
                path="inbox"
                element={
                  <Inbox
                    deleteTodo={deleteTodo}
                    description={description}
                    selected={selected}
                    setCategory={setCategory}
                    categories={categories}
                    category={category}
                    setCurrentPage={setCurrentPage}
                    setDescription={setDescription}
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
                    todoId={todoId}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    todoData={todoData}
                    user={user}
                    editTodo={editTodo}
                    setQuery={setQuery}
                    setOpenModal={setOpenModal}
                    changePage={changePage}
                    currentPage={currentPage}
                    count={count}
                    modalOpen={modalOpen}
                    todos={todos}
                  />
                }
              />
            </Routes>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Todos;
