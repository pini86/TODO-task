import Button from './Button';

interface IProps {
  onAdd: () => void;
  showAdd: boolean;
}

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
