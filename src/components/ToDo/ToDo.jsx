import React, { useReducer, useState } from "react";
import "./toDo.css";

function tasksReducer(state, { type, payload }) {
  switch (type) {
    case "addTask": {
      return [{ id: Date.now(), text: payload, completed: false }, ...state];
    }
    case "deleteTask": {
      return state.filter((task) => task.id !== payload);
    }
    case "setTaskToEdit": {
      return state.map((todo) =>
        todo.id === payload.id
          ? { ...todo, editing: true }
          : { ...todo, editing: false }
      );
    }
    case "saveTask": {
      return state.map((todo) =>
        todo.id === payload.id
          ? { ...todo, text: payload.newText, editing: false }
          : todo
      );
    }
    case "toggleTaskCompletion": {
      return state.map((todo) =>
        todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    }
    default:
      return state;
  }
}

export default function ToDo() {
  const [toDo, dispatch] = useReducer(tasksReducer, []);
  const [taskToAdd, setTaskToAdd] = useState("");
  const [editedTaskText, setEditedTaskText] = useState("");

  const handleSave = (id, newText) => {
    dispatch({ type: "saveTask", payload: { id, newText } });
  };

  return (
    <div className="container">
      <div className="title_Text">
        <h2>Create Todo List</h2>
        <input
          type="text"
          value={taskToAdd}
          onChange={(e) => setTaskToAdd(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            if (taskToAdd) {
              dispatch({ type: "addTask", payload: taskToAdd });
              setTaskToAdd("");
            }
          }}
        >
          Add Task
        </button>
      </div>

      {toDo.map((td) => (
        <div className="task" key={td.id}>
          <input
            type="checkbox"
            checked={td.completed}
            onChange={() =>
              dispatch({ type: "toggleTaskCompletion", payload: td })
            }
          />
          {td.editing ? (
            <div>
              <input
                type="text"
                value={editedTaskText || td.text}
                onChange={(e) => setEditedTaskText(e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleSave(td.id, editedTaskText)}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>{td.text}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => dispatch({ type: "setTaskToEdit", payload: td })}
            disabled={td.completed || td.editing}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => dispatch({ type: "deleteTask", payload: td.id })}
            disabled={!td.completed}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
