/** @module App */

import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { ITask } from './types/Types';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
/**
 * initialization FireBase API
 */
const firebaseConfig = {
  apiKey: 'AIzaSyC4bb_aYRxTsgt0p_LKJMIMyDRaiQ5Eqhc',
  authDomain: 'todo-project-a29e2.firebaseapp.com',
  projectId: 'todo-project-a29e2',
  storageBucket: 'todo-project-a29e2.appspot.com',
  messagingSenderId: '405859165789',
  appId: '1:405859165789:web:06a1b811ebdf009d4dcfb4',
  measurementId: 'G-T3XQ2BX9PF',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/** Application */
const App = () => {
  /** initialization state
   * @param {boolean} showAddTask - show add task form
   * @param {Array<ITask>} tasks - current tasks array
   */
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  /** Load saved tasks from server at the first render */
  useEffect(() => {
    const initTasks = async () => {
      const tasksFromServer = await getAllTasks();
      setTasks(tasksFromServer);
    };

    initTasks();
  }, []);

  /** Async functon get all tasks from server
   * @returns {Array<ITask>} array tasks
   */
  const getAllTasks = async () => {
    const data: ITask[] = [];
    const docSnap = await getDocs(collection(db, 'tasks'));

    docSnap.forEach((doc) => {
      data.push({ ...(doc.data() as ITask), id: doc.id });
    });

    return data;
  };

  /** Async functon add task to server
   * @param {Object<ITask>} task - adding task
   */
  const addTask = async (task: ITask) => {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    task = { ...task, id: docRef.id };

    /** Add task to state */
    setTasks([...tasks, task]);
  };

  /** Async functon delete task from server
   * @param {string} id - id deleting task
   */
  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, 'tasks', id));

    /** Remove task from state */
    setTasks(tasks.filter((task) => task.id !== id));
  };

  /** Async functon save the edited task to server
   * @param {Object<ITask>} task - edited task
   */
  const editTask = async (task: ITask) => {
    await updateDoc(doc(db, 'tasks', task.id), {
      ...task,
    });

    /** Update task from state */
    setTasks(tasks.map((taskCurrent) => (taskCurrent.id === task.id ? { ...task } : taskCurrent)));
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
        ) : (
          'Sorry, but no current tasks'
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
