import { useState } from 'react';
import { ITask } from '../types/Types';

interface IProps {
  onAdd: (task: ITask) => void;
  editTask?: ITask;
}

const EMPTY_TASK = { title: '', desc: '', data: '', id: '', complete: false, filename: '' };

const AddTask = (props: IProps) => {
  const { onAdd, editTask = EMPTY_TASK } = props;
  const [task, setTask] = useState(editTask);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAdd(task);
    setTask(EMPTY_TASK);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Title</label>
        <input
          required
          type="text"
          placeholder="Add title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>
      <div className="form-control">
        <label>Description</label>
        <input
          type="text"
          placeholder="Add description"
          value={task.desc}
          onChange={(e) => setTask({ ...task, desc: e.target.value })}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="datetime-local"
          placeholder="Add Day & Time"
          value={task.data}
          onChange={(e) => setTask({ ...task, data: e.target.value })}
        />
      </div>
      <div className="form-control">
        <label>Filename {task.filename!}</label>
        <input
          type="file"
          placeholder="Add filename"
          onChange={(e) =>
            setTask({
              ...task,
              filename: URL.createObjectURL((e.target.files as FileList)[0]),
            })
          }
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set complete</label>
        <input
          type="checkbox"
          checked={task.complete}
          onChange={(e) =>
            setTask({
              ...task,
              complete: e.currentTarget.checked,
            })
          }
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
