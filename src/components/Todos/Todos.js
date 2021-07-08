import "./Todos.scss";
import { useState, useEffect } from "react";
import { Button, TextField, FormControlLabel } from "@material-ui/core";
import TodoItem from "../TodoItem/TodoItem";
import IOSSwitch from "../IOSSwitch/IOSSwitch";
import { STATUSES } from "../../constants/index";
import Logger from "../../constants/utils/Logger";
import DialogDelete from "../DialogDelete/DialogDelete";
import ModalWindow from "../ModalWindow/ModalWindow";

const Todos = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [newTodo, setNewTodo] = useState("");
  const [switchTodo, setSwitchTodo] = useState(localStorage.getItem("switchTodo") || "on");
  const [something, setSomething] =useState("");
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [disabledBtn,setDisabledBtn] = useState(true);

  const inputChangeSomething = (e) => {
    setSomething(e.target.value);
    setDisabledBtn(false);
    if(e.target.value === ""){
      setDisabledBtn(true);
    }
  };

  const inputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      status: "new",
    };
    setTodos((prevState) => [newTodoItem, ...prevState]);
    setNewTodo("");
  };

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));//save to localStorage
  }

  const switchHandler = ({ target: { checked } }) => {
    setSwitchTodo(checked);
  };

  useEffect(() => {
    if (switchTodo) {
      saveTodos();
    }
  }, [todos]); // eslint-disable-line react-hooks/exhaustive-deps

  const [currentStatus, setCurrentStatus] = useState("new");

  function tabHandler(status) {
    setCurrentStatus(status);
    // про синхронность setState
    // Logger.info("tabHandler", currentStatus);
  }

  useEffect(() => {
    //Logger.info("useEffect",currentStatus);
  }, [currentStatus]);

  return (
      <>
    <div className="todos">
      <form className="todos__homework" >
        <TextField
            label="Write something..."
            type="text"
            name="something"
            size={"small"}
            value={something}
            onChange={inputChangeSomething}
            variant="outlined"
        />
        <Button color="primary"
                variant="contained"
                disabled={disabledBtn}
                onClick={()=> setIsModalWindowOpened(true)}>
          CLICK ME!
        </Button>
      </form>

      <form className="todos__form" onSubmit={addTodo}>
        <TextField
          label="Your new todo..."
          type="text"
          name="todo"
          size={"small"}
          value={newTodo}
          onChange={inputChange}
          variant="outlined"
        />
        <Button color="primary" type="submit" variant="contained">
          Add todo
        </Button>
      </form>
      {todos.length ? (
        <Button variant="outlined" color="primary" className="todos__save" onClick={saveTodos}>
          Save todos
        </Button>
      ) : null}
      <div className="todos__autosave">
        <FormControlLabel control={<IOSSwitch checked={switchTodo === "on"||switchTodo === true} onChange={switchHandler} />} label="Autosave" />
      </div>
      <div className="todos__filter">
        {STATUSES.map((status) => (
          <Button key={status}
                  variant={status === currentStatus ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => tabHandler(status)}>
            {status}
          </Button>
        ))}
      </div>
      <div className="todos__list">
        {todos.length ? (
            todos.
            filter((todo) => todo.status === currentStatus)
          .map((todo) => <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />)
        ) : (
          <h2>No todos...</h2>
        )}
      </div>
    </div>
  <ModalWindow something={something}
               setSomething={setSomething}
               setDisabledBtn={setDisabledBtn}
               inputChangeSomething={inputChangeSomething}
               isModalWindowOpened={isModalWindowOpened}
               setIsModalWindowOpened={setIsModalWindowOpened}/>
  </>
  );
};

export default Todos;
