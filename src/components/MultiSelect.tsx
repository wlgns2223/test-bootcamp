import React, { useState } from "react";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  maxSelections?: number;
  defaultSelected?: string[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, maxSelections = 3, defaultSelected = [] }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        if (prev.length >= maxSelections) {
          return prev;
        }
        return [...prev, optionId];
      }
    });
  };

  const selectAll = () => {
    const allIds = options.map((option) => option.id);
    setSelectedOptions(allIds.slice(0, maxSelections));
  };

  const clearAll = () => {
    setSelectedOptions([]);
  };

  const getSelectedLabels = () => {
    return selectedOptions
      .map((id) => options.find((option) => option.id === id)?.label)
      .filter(Boolean)
      .join(", ");
  };

  const isOptionSelected = (optionId: string) => selectedOptions.includes(optionId);
  const isOptionDisabled = (optionId: string) => !isOptionSelected(optionId) && selectedOptions.length >= maxSelections;

  return (
    <div className="multi-select-container">
      <h2>다중 선택</h2>

      <div className="multi-select-controls">
        <button onClick={selectAll}>모두 선택</button>
        <button onClick={clearAll}>모두 해제</button>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "옵션 숨기기" : "옵션 보기"}</button>
      </div>

      <div className="multi-select-display">
        <p>선택된 항목: {getSelectedLabels() || "없음"}</p>
        <p>
          선택 개수: {selectedOptions.length}/{maxSelections}
        </p>
      </div>

      {isOpen && (
        <div className="multi-select-options">
          {options.map((option) => (
            <label key={option.id} className="option-item">
              <input
                type="checkbox"
                checked={isOptionSelected(option.id)}
                onChange={() => toggleOption(option.id)}
                disabled={isOptionDisabled(option.id)}
              />
              <span className={isOptionDisabled(option.id) ? "disabled" : ""}>{option.label}</span>
            </label>
          ))}
        </div>
      )}

      <div className="multi-select-summary">
        <p>최대 선택 가능: {maxSelections}개</p>
        <p>현재 선택: {selectedOptions.length}개</p>
        {selectedOptions.length >= maxSelections && <p className="warning">최대 선택 개수에 도달했습니다!</p>}
      </div>
    </div>
  );
};

export default MultiSelect;
