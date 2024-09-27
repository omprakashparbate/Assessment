import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch existing tasks from API on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        setTasks(data.todos);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTodos();
  }, []);

  // Add a new task via API
  const addTask = async (text) => {
    const newTask = { todo: text, completed: false, userId: 1 };
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks([...tasks, data]); // Add the new task to the list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task completion via API
  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      const data = await response.json();
      setTasks(tasks.map(task => task.id === id ? data : task));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task via API
  const deleteTask = async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo addTask={addTask} />
      <Filter setFilter={setFilter} />
      <TodoList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TodoApp;