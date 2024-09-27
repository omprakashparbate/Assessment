import React from "react";

const TodoItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div className="todo-item">
      <span
        style={{ textDecoration: task.completed ? "line-through" : "" }}
        onClick={() => toggleComplete(task.id, task.completed)}
      >
        {task.todo}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;