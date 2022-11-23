import Task from './Task';
import { ITask } from '../types/Types';

interface IProps {
  tasks: ITask[];
  onDelete: (id: string) => void;
  onEdit: (task: ITask) => void;
}

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
