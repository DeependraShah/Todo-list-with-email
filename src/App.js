import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    bcc: '',
    subject: '',
    message: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const { from, to, bcc, subject, message } = formData;
    if (message.trim() !== '') {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { from, to, bcc, subject, message };
        setTasks(updatedTasks);
        setFormData({ from: '', to: '', bcc: '', subject: '', message: '' });
        setEditIndex(null);
      } else {
        setTasks(prevTasks => [...prevTasks, { from, to, bcc, subject, message }]);
        setFormData({ from: '', to: '', bcc: '', subject: '', message: '' });
      }
    }
  };

  const deleteTask = index => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };

  const editTask = index => {
    setFormData(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="App">
      <h1>Email ToDo List</h1>
      <form>
        {['from', 'to', 'bcc', 'subject', 'message'].map(field => (
          <label key={field} htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type={field === 'message' ? 'textarea' : 'text'}
              id={field}
              value={formData[field]}
              onChange={e => setFormData({ ...formData, [field]: e.target.value })}
              required={field === 'message'}
            />
          </label>
        ))}
        <button type="button" onClick={addTask}>
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {Object.entries(task).map(([key, value]) => (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
            ))}
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
