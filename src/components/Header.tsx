import { useLocation } from 'react-router-dom';
import Button from './Button';

interface IProps {
  onAdd: () => void;
  showAdd: boolean;
}

const Header = (props: IProps) => {
  const { onAdd, showAdd } = props;
  const location = useLocation();

  return (
    <header className="header">
      <h1>{'TODO app for WomanUP'}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

export default Header;
