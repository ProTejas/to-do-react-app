import React from 'react'
import { useState } from 'react'

function ToDoInputs() {
  const [tasks, setTask] = useState('');
  const [tasksArr, setTaskArr] = useState([]);

  function onChange(e) {
    setTask(e.target.value);
  }
  function addTaskBtn(e) {
    e.preventDefault();
    setTaskArr([...tasksArr, { title: tasks, status: false }]); // add current task to the array
    setTask(''); // clear the input
  }

  function toggleTaskStatus(index) {
    const updatedTasks = tasksArr.map((tasks, i) => {
      return i === index ? { ...tasks, status: !tasks.status } : tasks
    });
    setTaskArr(updatedTasks);
  }

  return (
    <>
      <div className="container">
        <label htmlFor="tasks">Tasks</label>
        <input type="text" className='w-full border' id='tasks' name='tasks' value={tasks} onChange={onChange} />
        <button onClick={addTaskBtn} className='p-2 bg-black text-white'>Add Task</button>
      </div>
      <div className="tasks-list-box">
        <ul>
          {tasksArr.length ? (
            tasksArr.map((el, ind) => {
              return (
                <li key={ind}>
                  <label htmlFor={`tasksList${ind}`}>{el.title}</label>
                  <input type="checkbox" id={`tasksList${ind}`} checked={el.status} onChange={() => toggleTaskStatus(ind)} />
                </li>
              );
            })
          ) : (
            <h2>Add tasks</h2>
          )}
        </ul>
      </div>
    </>
  )
}

export default ToDoInputs
