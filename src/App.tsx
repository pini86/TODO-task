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
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

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
    const data: ITask[] = [];
    const docSnap = await getDocs(collection(db, 'tasks'));

    docSnap.forEach((doc) => {
      data.push({ ...(doc.data() as ITask), id: doc.id });
    });

    return data;
  };

  const fetchTask = async (id: string) => {
    const docRef = doc(db, 'tasks', id);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  };

  const addTask = async (task: ITask) => {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    task = { ...task, id: docRef.id };

    setTasks([...tasks, task]);
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, 'tasks', id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = async (id: string) => {
    const taskToToggle = (await fetchTask(id)) as ITask;
    await updateDoc(doc(db, 'tasks', id), {
      complete: !taskToToggle.complete,
    });

    setTasks(tasks.map((task) => (task.id === id ? { ...task, complete: !task.complete } : task)));
  };

  const editTask = async (task: ITask) => {
    await updateDoc(doc(db, 'tasks', task.id), {
      ...task,
    });
    setTasks(tasks.map((taskCurrent) => (taskCurrent.id === task.id ? { ...task } : taskCurrent)));
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
