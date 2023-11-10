import { useState } from "react";
import PropTypes from "prop-types";

const DropdownSelect = ({ options, value, onChange }) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleChange = (event) => {
    onChange(event.target.value);
    setShow(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={handleToggle}>
        {value}
      </button>
      {show && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="dropdown"
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DropdownSelect.propTypes = {
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownSelect;
