/** @module Button */

/**
 * The Button properties.
 *
 * @typedef {object} IProps
 * @property {VoidFunction} onClick - onClick function.
 * @property {string} text - button text.
 * @property {string} color - button color.
 */
interface IProps {
  text: string;
  color: string;
  onClick: () => void;
}

/** Button component
 * @param {Object} props All props of this component
 */
const Button = (props: IProps) => {
  const { color = 'steelblue', text, onClick } = props;

  return (
    <button onClick={onClick} style={{ backgroundColor: color }} className="btn">
      {text}
    </button>
  );
};

export default Button;
