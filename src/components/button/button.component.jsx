import './button.styles.scss';
import '../spinner/spinner.styles.scss';

const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  if (!buttonType) {
    buttonType = 'base';
  }

  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <div className="spinner-container" /> : children}
    </button>
  );
};

export default Button;
