import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import { BASE_URL } from "../API";

import { paginate } from "../utils/paginate";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CalendarViewDay from "@mui/icons-material/CalendarTodayOutlined";
import Sidebar from "./common/Sidebar";
import Today from "./Today";
import { Routes, Route } from "react-router";
import Inbox from "./Inbox";
import TagModal from "./common/TagModal";
import TagBasesTodos from "./common/TagBasedTodos";
import TodoDetail from "./common/TodoDetail";
import Completed from "./Completed";

const cookies = new Cookies();

const Todos = ({ user }) => {
  const [tags, setTags] = useState(null);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [tagname, setTagName] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [endDate, setEndDate] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setOpenModal] = useState(false);
  const [finish, setFinish] = useState(false);
  const [todo, selectTodo] = useState(null);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [errors, setErrors] = useState(null);
  const [tagsLoading, setTagsLoading] = useState(true);
  const pageSize = 4;

  const startDate = new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const menuItems1 = [
    {
      text: "Today",
      icon: <CalendarToday />,
      path: "today"
    },
    {
      text: "Completed",
      icon: <CalendarViewDay />,
      path: "completed"
    },
    {
      text: "Inbox",
      icon: <InboxIcon />,
      path: "inbox"
    }
  ];

  const cehc = ["tags"];

  let filteredTodos = todos.filter(item =>
    cehc.some(key => item[key].includes(query))
  );

  const keys = ["title", "description", "tags"];

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

  const getTags = async () => {
    const cookie = cookies.get("auth_token");

    await axios
      .get(`${BASE_URL}/tags`, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then(res => {
        setTags(res.data);
        setTagsLoading(false);
      })
      .catch(err => console.log(err));
  };

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
    getTags();
    const cookie = cookies.get("auth_token");

    await axios
      .get(`${BASE_URL}/api/todos`, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then(res => setTodos(res.data.reverse()))
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
          end_date: endDate,
          start_date: startDate,
          tags: tagname,
          finish: finish
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`
          }
        }
      )
      .then(res => {
        if (res.status === 201) {
          setTodos(res.data.reverse());
          setOpenModal(false);
          getTags();
          setCategory("All");
          setTitle("");
          setDescription("");
          setTagName("");
          setFinish(false);
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
    setTagName(todo.tags);
    setOpenModal(true);
    setFinish(todo.finish);
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
          category: tagname,
          start_date: startDate,
          end_date: endDate,
          finish: finish
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`
          }
        }
      )
      .then(res => {
        setTodos(res.data.reverse());
        setTitle("");
        setEndDate("");
        setDescription("");
        setTagName("");
        setTodoId(null);
        setOpenModal(false);
        setFinish(false);
      })
      .catch(err => console.log(err));
  };

  const updateTodoFinish = async todo => {
    const cookie = cookies.get("auth_token");

    await axios
      .put(
        `${BASE_URL}/api/todos/${todo.id}/finish`,
        {
          finish: !todo.finish
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`
          }
        }
      )
      .then(res => {
        setTodos(res.data.reverse());
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

  const addTag = async () => {
    const cookie = cookies.get("auth_token");

    await axios
      .post(
        `${BASE_URL}/tags`,
        { tags: `${tagname} ` },
        {
          headers: {
            Authorization: `Bearer ${cookie}`
          }
        }
      )
      .then(res => {
        setTags(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchAllTodos();
    if (todos.length <= 1) {
      setCurrentPage(1);
    }
    setIsLoadingTodos(false);
  }, []);

  const count = search(filteredTodos).length;
  console.log(count);

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
            <Sidebar
              menuItems1={menuItems1}
              setOpenTagModal={setOpenTagModal}
              tags={tags}
              tagsLoading={tagsLoading}
              addTag={addTag}
            />
            <TagModal
              openTagModal={openTagModal}
              tagname={tagname}
              setOpenTagModal={setOpenTagModal}
              setTagName={setTagName}
            />
            <Routes>
              <Route
                path="/today"
                element={
                  <Today
                    deleteTodo={deleteTodo}
                    description={description}
                    tagname={tagname}
                    setCategory={setCategory}
                    tags={tags}
                    finish={finish}
                    setFinish={setFinish}
                    category={category}
                    setCurrentPage={setCurrentPage}
                    setDescription={setDescription}
                    addTodo={addTodo}
                    title={title}
                    setDescription={setDescription}
                    setTitle={setTitle}
                    closeModal={closeModal}
                    updateTodo={updateTodo}
                    setTagName={setTagName}
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
                    today={today}
                    selectTodo={selectTodo}
                    updateTodoFinish={updateTodoFinish}
                    pageSize={pageSize}
                  />
                }
              />
              <Route
                path="completed"
                element={
                  <Completed
                    todoData={todos}
                    editTodo={editTodo}
                    updateTodoFinish={updateTodoFinish}
                    selectTodo={selectTodo}
                    setCurrentPage={setCurrentPage}
                    setQuery={setQuery}
                    deleteTodo={deleteTodo}
                    changePage={changePage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                  />
                }
              />
              <Route
                path="/inbox"
                element={
                  <Inbox
                    deleteTodo={deleteTodo}
                    description={description}
                    tagname={tagname}
                    finish={finish}
                    setFinish={setFinish}
                    setCategory={setCategory}
                    categories={tags}
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
                    setTagName={setTagName}
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
                    selectTodo={selectTodo}
                    updateTodoFinish={updateTodoFinish}
                    pageSize={pageSize}
                  />
                }
              />
              {tagsLoading
                ? "Loading"
                : tags.map(item => (
                    <Route
                      path={item.toLocaleLowerCase()}
                      key={tags.indexOf(item)}
                      element={
                        <TagBasesTodos
                          deleteTodo={deleteTodo}
                          description={description}
                          tagname={tagname}
                          setCategory={setCategory}
                          tags={tags}
                          finish={finish}
                          setFinish={setFinish}
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
                          setTagName={setTagName}
                          categories={tags}
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
                          tagname={item}
                          selectTodo={selectTodo}
                          updateTodoFinish={updateTodoFinish}
                          pageSize={pageSize}
                        />
                      }
                    />
                  ))}
            </Routes>
            <TodoDetail todo={todo} />
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Todos;
