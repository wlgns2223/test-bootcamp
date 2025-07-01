import React, { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  content: string;
}

interface TabProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
}

const Tab: React.FC<TabProps> = ({ tabs, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id || "");
  const [tabHistory, setTabHistory] = useState<string[]>([activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setTabHistory((prev) => [...prev, tabId]);
  };

  const goBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = tabHistory.slice(0, -1);
      setTabHistory(newHistory);
      setActiveTab(newHistory[newHistory.length - 1]);
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {currentTab && (
          <div className="tab-panel">
            <h3>{currentTab.label}</h3>
            <p>{currentTab.content}</p>
          </div>
        )}
      </div>

      <div className="tab-controls">
        <button onClick={goBack} disabled={tabHistory.length <= 1}>
          이전 탭으로
        </button>
        <span>탭 히스토리: {tabHistory.length}개</span>
        <span>현재 탭: {currentTab?.label}</span>
      </div>
    </div>
  );
};

export default Tab;
