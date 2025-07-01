import React, { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, defaultOpen = [] }) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);
  const [clickCount, setClickCount] = useState(0);

  const toggleItem = (itemId: string) => {
    setClickCount((prev) => prev + 1);

    if (allowMultiple) {
      setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
    } else {
      setOpenItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
    }
  };

  const openAll = () => {
    setOpenItems(items.map((item) => item.id));
  };

  const closeAll = () => {
    setOpenItems([]);
  };

  return (
    <div className="accordion-container">
      <h2>아코디언</h2>

      <div className="accordion-controls">
        <button onClick={openAll}>모두 열기</button>
        <button onClick={closeAll}>모두 닫기</button>
        <span>클릭 횟수: {clickCount}</span>
        <span>열린 항목: {openItems.length}개</span>
      </div>

      <div className="accordion">
        {items.map((item) => (
          <div key={item.id} className="accordion-item">
            <button
              className={`accordion-header ${openItems.includes(item.id) ? "open" : ""}`}
              onClick={() => toggleItem(item.id)}
            >
              {item.title}
              <span className="accordion-icon">{openItems.includes(item.id) ? "▼" : "▶"}</span>
            </button>

            {openItems.includes(item.id) && (
              <div className="accordion-content">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
