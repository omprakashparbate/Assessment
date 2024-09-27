import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;