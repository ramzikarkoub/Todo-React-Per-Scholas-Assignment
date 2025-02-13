import React, { useReducer, useState } from "react";
import "./toDo.css";

function tasksReducer(state, action) {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case "addTask": {
      // return state + action.payload.step;
      // }
      // case "decrement": {
      //   return state - action.payload.step;
      console.log(state);
    }
    default: {
      return state;
    }
  }
}

export default function ToDo() {
  // const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [taskToAdd, setTaskToAdd] = useState("");

  console.log(taskToAdd);
  console.log(tasks);

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
          onClick={() => dispatch({ type: addTask, payload: taskToAdd })}
        >
          add
        </button>
      </div>

      <div className="task">
        <input type="checkbox" name="checkbox" id="checkbox" />
        <p>hahahahah</p>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
      <div className="task">
        <input type="checkbox" name="checkbox" id="checkbox" />
        <p>hahahahah</p>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
      <div className="task">
        <input type="checkbox" name="checkbox" id="checkbox" />
        <p>hahahahah</p>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </div>
  );
}
