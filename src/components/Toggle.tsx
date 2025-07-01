import React, { useState } from "react";

interface ToggleProps {
  initialChecked?: boolean;
  label?: string;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ initialChecked = false, label = "토글", disabled = false }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [toggleCount, setToggleCount] = useState(0);

  const handleToggle = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      setToggleCount((prev) => prev + 1);
    }
  };

  return (
    <div className="toggle-container">
      <label className="toggle-label">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} disabled={disabled} />
        <span className="toggle-text">{label}</span>
      </label>

      <div className="toggle-status">
        <p>상태: {isChecked ? "켜짐" : "꺼짐"}</p>
        <p>토글 횟수: {toggleCount}</p>
        {disabled && <p className="disabled-text">비활성화됨</p>}
      </div>
    </div>
  );
};

export default Toggle;
