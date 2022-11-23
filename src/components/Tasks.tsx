/** @module Tasks */

import Task from './Task';
import { ITask } from '../types/Types';

/**
 * The Tasks properties.
 *
 * @typedef {object} IProps
 * @property {Array<ITask>} tasks - current tasks array
 * @property {VoidFunction} onDelete - delete function.
 * @property {VoidFunction} onEdit - edit function.
 */
interface IProps {
  tasks: ITask[];
  onDelete: (id: string) => void;
  onEdit: (task: ITask) => void;
}

/** Tasks component
 * @param {Object} props All props of this component
 */
const Tasks = (props: IProps) => {
  const { tasks, onDelete, onEdit } = props;

  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </>
  );
};

export default Tasks;
