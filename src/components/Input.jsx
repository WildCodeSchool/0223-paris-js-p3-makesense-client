import PropTypes from "prop-types";

function Input({ type, value = null, setValue = null }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

Input.propTypes = {
  type: PropTypes.elementType.isRequired,
  value: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Input;
