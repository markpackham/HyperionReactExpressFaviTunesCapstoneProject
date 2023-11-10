import { useState } from "react";

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

export default DropdownSelect;
