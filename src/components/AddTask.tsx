/** @module AddTask */

import { useState } from 'react';
import { ITask } from '../types/Types';

/**
 * The AddTask properties.
 *
 * @typedef {object} IProps
 * @property {VoidFunction} onAdd - onAdd function.
 * @property {object<ITask>} editTask - edited task
 */
interface IProps {
  onAdd: (task: ITask) => void;
  editTask?: ITask;
}

/** Empty task object for create new task */
const EMPTY_TASK = { title: '', desc: '', data: '', id: '', complete: false, filename: '' };

/** AddTask component
 * @param {Object} props All props of this component
 */
const AddTask = (props: IProps) => {
  const { onAdd, editTask = EMPTY_TASK } = props;

  /** initialization state
   * @param {object<ITask>} task - current task
   */
  const [task, setTask] = useState(editTask);

  /** onSubmit handler
   * @param {object<SyntheticEvent>} event- submit event
   */
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
