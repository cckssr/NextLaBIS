import { Tab } from "../App";
import { Button } from "./ui/button";
import { X, Plus } from "lucide-react";

interface TabManagerProps {
  tabs: Tab[];
  activeTabId: string;
  onSwitchTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onNewTab: () => void;
}

export function TabManager({ 
  tabs, 
  activeTabId, 
  onSwitchTab, 
  onCloseTab, 
  onNewTab 
}: TabManagerProps) {
  if (tabs.length <= 1) {
    return null; // Don't show tab bar if only one tab
  }

  return (
    <div className="border-b bg-muted/30">
      <div className="flex items-center px-6">
        <div className="flex items-center gap-1 overflow-x-auto max-w-full">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-2 text-sm border-b-2 transition-colors cursor-pointer group min-w-0 ${
                tab.isActive
                  ? 'border-primary text-foreground bg-background'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => onSwitchTab(tab.id)}
            >
              <span className="truncate max-w-32">{tab.title}</span>
              {tabs.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onNewTab}
          className="ml-2 p-2"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}