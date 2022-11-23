import { SlClose, SlCheck } from 'react-icons/sl';
import dayjs from 'dayjs';
import { ITask } from '../types/Types';
import AddTask from './AddTask';
import { useState } from 'react';

interface IProps {
  task: ITask;
  onDelete: (id: string) => void;
  onEdit: (task: ITask) => void;
}

const Task = (props: IProps) => {
  const { task, onDelete, onEdit } = props;
  const [editMode, setEditMode] = useState(false);

  const checkDate = () => {
    return dayjs(task.data) > dayjs();
  };

  const EditTask = (task: ITask) => {
    setEditMode(!editMode);
    onEdit(task);
    return <AddTask editTask={task} onAdd={onEdit} />;
  };

  const HandleComlete = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const toggledTask = { ...task, complete: !task.complete };
    onEdit(toggledTask);
  };

  const HandleDelete = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    onDelete(task.id);
  };

  return (
    <div>
      {editMode ? (
        <AddTask editTask={task} onAdd={EditTask} />
      ) : (
        <div
          className={'task'}
          style={{ backgroundColor: checkDate() ? 'lime' : 'khaki' }}
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          <h3>
            <SlCheck style={{ color: task.complete ? 'green' : 'red' }} onClick={HandleComlete} />
            {task.title} <SlClose style={{ color: 'red' }} onClick={HandleDelete} />
          </h3>
          <p>{task.desc}</p>
          <p>{task.data}</p>
          <p>{task.filename}</p>
        </div>
      )}
    </div>
  );
};

export default Task;
