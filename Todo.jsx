import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([{ task: "Sample Task", id: uuidv4(), done: false }]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
    // Function to add a new todo

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { task: newTodo, id: uuidv4(), done: false }]);
    setNewTodo("");
  };
    // Function to delete a todo

  const updateNewTodo = (event) => setNewTodo(event.target.value);
  // Function to delete a todo

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const toggleDone = (id) => setTodos(todos.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const startEdit = (id, currentText) => { setEditId(id); setEditText(currentText); };
  const saveEdit = (id) => {
    setTodos(todos.map((t) => t.id === id ? { ...t, task: editText } : t));
    setEditId(null);
    setEditText("");
  };
    // Function to clear all todos

  // Function to clear all todos
  // This function will prompt the user for confirmation before clearing the list
  const clearAll = () => window.confirm("Clear all tasks?") && setTodos([]);
  const upperCaseAll = () => setTodos(todos.map(todo => ({ ...todo, task: todo.task.toUpperCase() })));
const markASDone = (id) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };
  return (
    <>
      <header className="header">📝 My Todo App</header>

      <div className="todo-container">
        <h2>Todo List</h2>
        <div className="input-section">
          <input
          className="add-input"
            placeholder="Add a task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
       {/* Add Button */}
<button onClick={addTodo} className="add-btn">
  ➕ Add
</button>
        </div>

        <div className="info-section">
          <p>Total Tasks: {todos.length}</p>
          <div>
            <button className="update-btn" onClick={upperCaseAll}>  🔠 Uppercase All</button>
            <button className="clear-btn" onClick={clearAll}>🧹 Clear All</button>
          </div>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              {editId === todo.id ? (
                <>
                  <input   className="edit-input" value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <button className="save-btn" onClick={() => saveEdit(todo.id)}>  💾 Save</button>
                </>
              ) : (
                <>
                  <span onClick={() => toggleDone(todo.id)}>{todo.task}</span>
                  <div className="btn-group">
                <button onClick={() => startEdit(todo.id, todo.task)} className="edit-btn">
  Edit
</button>
<button onClick={() => markASDone(todo.id)} className="mark-done-btn">
  {todo.done ? "✅ Done" : "❌ Not Done"}
</button>
<button onClick={() => deleteTodo(todo.id)} className="delete-btn">
  🗑️ Delete
</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">© 2025 My Todo App | Made with ❤️</footer>
    </>
  );
}
