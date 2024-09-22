import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [checkedTasks, setCheckedTasks] = useState([]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask('');
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  function handleCheckedInput(index) {
    setCheckedTasks((prevCheckedTasks) =>
      prevCheckedTasks.includes(index)
        ? prevCheckedTasks.filter((i) => i !== index)
        : [...prevCheckedTasks, index]
    );
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    
    setCheckedTasks((prevCheckedTasks) =>
      prevCheckedTasks
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i)) 
    );
  }

  return (
    <div className="todo">
      <h1>To Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="addButton" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="AllTasks">
        {tasks.map((task, index) => (
          <li key={index} className={checkedTasks.includes(index) ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={checkedTasks.includes(index)}
              onChange={() => handleCheckedInput(index)}
            />
            <span className="text">{task}</span>
            <button className="deleteButton" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
