/** @module Header */

import Button from './Button';

/**
 * The Header properties.
 *
 * @typedef {object} IProps
 * @property {VoidFunction} onAdd - add task function.
 * @property {boolean} showAdd - show addTask form.
 */
interface IProps {
  onAdd: () => void;
  showAdd: boolean;
}

/** Header component
 * @param {Object} props All props of this component
 */
const Header = (props: IProps) => {
  const { onAdd, showAdd } = props;

  return (
    <header className="header">
      <h1>{'TODO app for WomanUP'}</h1>
      <Button color={showAdd ? 'blue' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
    </header>
  );
};

export default Header;
