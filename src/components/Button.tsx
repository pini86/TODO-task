interface IProps {
  text: string;
  color: string;
  onClick: () => void;
}

const Button = (props: IProps) => {
  const { color = 'steelblue', text, onClick } = props;

  return (
    <button onClick={onClick} style={{ backgroundColor: color }} className="btn">
      {text}
    </button>
  );
};

export default Button;
