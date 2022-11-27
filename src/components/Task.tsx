/** @module Task */

import { SlClose, SlCheck } from 'react-icons/sl';
import dayjs from 'dayjs';
import { ITask } from '../types/Types';
import AddTask from './AddTask';
import { useState } from 'react';

/**
 * The Task properties.
 *
 * @typedef {object} IProps
 * @property {Array<ITask>} tasks - current tasks array
 * @property {VoidFunction} onDelete - delete function.
 * @property {VoidFunction} onEdit - edit function.
 */
interface IProps {
  task: ITask;
  onDelete: (id: string) => void;
  onEdit: (task: ITask) => void;
}

/** Task component
 * @param {Object} props All props of this component
 */
const Task = (props: IProps) => {
  const { task, onDelete, onEdit } = props;

  /** initialization state*/
  const [editMode, setEditMode] = useState(false);

  /** Compare task date with current date
   * @returns {boolean} true - task in future, false - task in past
   */
  const checkDate = () => {
    return dayjs(task.data) > dayjs();
  };

  /** Edit task
   * @param {object<ITask>} task - editing task
   * @returns {React.Component} form to edit tasks fields
   */
  const EditTask = (task: ITask) => {
    setEditMode(!editMode);
    onEdit(task);
    return <AddTask editTask={task} onAdd={onEdit} />;
  };

  /** Toggle complete task
   * @param {object<SyntheticEvent>} event- toggle event
   */
  const HandleComlete = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const toggledTask = { ...task, complete: !task.complete };
    onEdit(toggledTask);
  };

  /** Delete task
   * @param {object<SyntheticEvent>} event- delete event
   */
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
            <p style={{ textDecoration: task.complete ? 'line-through double #ff0000' : 'none' }}>
              {task.title}
            </p>
            <SlClose style={{ color: 'red' }} onClick={HandleDelete} />
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
