import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim(), editing: false }]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editValue.trim(), editing: false } : todo
    ));
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="todolist-container">
      <div className="header">
        <h1>To-Do List</h1>
        <Link to="/">
          <button className="back-btn">&larr; Back</button>
        </Link>
      </div>
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task..."
          className="todo-input"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="add-btn">Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => saveEdit(todo.id)} className="save-btn">Save</button>
                <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
              </>
            ) : (
              <>
                <span className="todo-text">{todo.text}</span>
                <button onClick={() => startEdit(todo.id, todo.text)} className="edit-btn">Edit</button>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
