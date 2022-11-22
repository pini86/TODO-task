import { useState, useEffect } from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { ITask } from './types/Types';

const BASE_URL = 'http://localhost:5000/tasks';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id: number) => {
    const res = await fetch(BASE_URL + `/${id}`);
    const data = await res.json();

    return data;
  };

  const addTask = async (task: ITask) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  };

  const deleteTask = async (id: number) => {
    const res = await fetch(BASE_URL + `/${id}`, {
      method: 'DELETE',
    });

    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task');
  };

  const toggleComplete = async (id: number) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, complete: !taskToToggle.complete };

    const res = await fetch(BASE_URL + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(tasks.map((task) => (task.id === id ? { ...task, complete: data.complete } : task)));
  };

  const editTask = async (task: ITask) => {
    const taskOrigin = await fetchTask(task.id);
    const updTask = { ...taskOrigin, ...task };

    const res = await fetch(BASE_URL + `/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    res.status === 200
      ? setTasks(
          tasks.map((taskCurrent) => (taskCurrent.id === task.id ? { ...task } : taskCurrent))
        )
      : alert('Error Updating This Task');
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks tasks={tasks} onEdit={editTask} onDelete={deleteTask} onToggle={toggleComplete} />
        ) : (
          'Sorry, but no current tasks'
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
