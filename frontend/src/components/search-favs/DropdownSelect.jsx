import { useState } from "react";
import PropTypes from "prop-types";

const DropdownSelect = ({ options, value, onChange }) => {
  // Hide until clicked on
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
      <button
        className="btn btn-secondary dropdown-button"
        onClick={handleToggle}
      >
        {value}
      </button>
      {/* Only show ul if there is something to show */}
      {show && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option.value}>
              {/* Learn to work with radio buttons in React from
              Collegewap (2023) How to work with radio buttons in react, DEV Community. 
              Available at: https://dev.to/collegewap/how-to-work-with-radio-buttons-in-react-3e0o (Accessed: 15 November 2023).  */}
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
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownSelect;
