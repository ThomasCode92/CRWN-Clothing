import './spinner.styles.scss';

const Spinner = () => {
  return (
    <div data-testid="spinner" className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  );
};

export default Spinner;
