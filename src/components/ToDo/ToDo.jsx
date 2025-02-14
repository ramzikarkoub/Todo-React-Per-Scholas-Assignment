import React, { useReducer, useState } from "react";
import "./toDo.css";

function tasksReducer(state, { type, payload }) {
  switch (type) {
    case "addTask": {
      // console.log(action.payload);
      return [...state, { id: Date.now(), text: payload, completed: true }];
    }
    case "deleteTask": {
      // console.log(action.payload);
      console.log(payload);
      return state.filter((task) => task.id !== payload);
    }
    case "setTaskToEdit": {
      // console.log(action.payload);
      console.log(payload);
      const toggle = state.map((todo) =>
        todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
      );
      return toggle;
    }
    default: {
      return state;
    }
  }
}

export default function ToDo() {
  // const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [toDo, dispatch] = useReducer(tasksReducer, []);
  const [taskToAdd, setTaskToAdd] = useState("");

  console.log(taskToAdd);
  console.log(toDo);

  return (
    <div className="container">
      <div className="title_Text">
        <h2>Create Todo List</h2>
        <input
          type="text"
          onChange={(e) => setTaskToAdd(e.target.value)}
        />{" "}
        <button
          type="button"
          onClick={() => dispatch({ type: "addTask", payload: taskToAdd })}
        >
          add
        </button>
      </div>
      {toDo.map((td, index) => (
        <div className="task" key={index}>
          <input type="checkbox" name="checkbox" id="checkbox" />
          {td.completed ? (
            <div>
              <p>{td.text}</p>
              <input
                type="text"
                onChange={(e) => setTaskToAdd(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <input
                type="text"
                onChange={(e) => setTaskToAdd(e.target.value)}
              />{" "}
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "addTask", payload: taskToAdd })
                }
              >
                add
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => dispatch({ type: "setTaskToEdit", payload: td })}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "deleteTask", payload: td.id })}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
