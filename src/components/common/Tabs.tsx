import React, { useState } from 'react';

interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  onChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  className = '',
  tabClassName = '',
  contentClassName = '',
  onChange,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId || tabs[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-slate-200">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200
                ${
                  activeTabId === tab.id
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                }
                ${tabClassName}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`py-4 ${contentClassName}`}>
        {activeTab?.content}
      </div>
    </div>
  );
};

export default Tabs;