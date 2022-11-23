import { useState } from 'react';
import { ITask } from '../types/Types';

interface IProps {
  onAdd: (task: ITask) => void;
  editTask?: ITask;
}

const EMPTY_TASK = { title: '', desc: '', data: '', id: '', complete: false, filename: '' };

const AddTask = (props: IProps) => {
  const { onAdd, editTask = EMPTY_TASK } = props;
  const [title, setTitle] = useState(editTask.title);
  const [desc, setDesc] = useState(editTask.desc);
  const [data, setData] = useState(editTask.data);
  const [complete, setComplete] = useState(editTask.complete);
  const [filename, setFilename] = useState(editTask.filename);
  const id = editTask.id;

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    onAdd({
      title,
      desc,
      data,
      complete,
      id,
      filename,
    });

    setTitle('');
    setDesc('');
    setData('');
    setFilename('');
    setComplete(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Title</label>
        <input
          required
          type="text"
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Description</label>
        <input
          type="text"
          placeholder="Add description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="datetime-local"
          placeholder="Add Day & Time"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Filename {filename!}</label>
        <input
          type="file"
          placeholder="Add filename"
          onChange={(e) => setFilename(URL.createObjectURL((e.target.files as FileList)[0]))}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set complete</label>
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => setComplete(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
