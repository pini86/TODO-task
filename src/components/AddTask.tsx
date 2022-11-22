import { useState } from 'react';
import { ITask } from '../types/Types';

interface IProps {
  onAdd: (task: ITask) => void;
  editTask?: ITask;
}

const AddTask = (props: IProps) => {
  const {
    onAdd,
    editTask = { title: '', desc: '', data: '', id: 0, complete: false, filename: '' },
  } = props;
  const [title, setTitle] = useState(editTask.title);
  const [desc, setDesc] = useState(editTask.desc);
  const [data, setData] = useState(editTask.data);
  const [complete, setComplete] = useState(editTask.complete);
  const [filename, setFilename] = useState(editTask.filename);
  const id = editTask.id;

  const HandleFileName = (event: React.FormEvent<HTMLInputElement>) => {
    //const file = picture[0];
    console.log(event.currentTarget.value);
    const file = event.currentTarget.value[0];
    //setFilename(URL.createObjectURL(event.currentTarget.value));
    setFilename(event.currentTarget.value);
    //setFilename((e.target.files as FileList)[0].name);
  };
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!title) {
      alert('Please add a task');
      return;
    }

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
          onChange={(e) => setFilename((e.target.files as FileList)[0].name)}
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
