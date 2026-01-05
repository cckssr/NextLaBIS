import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { SpaceView } from "./components/SpaceView";
import { ProjectView } from "./components/ProjectView";
import { CollectionView } from "./components/CollectionView";
import { ObjectView } from "./components/ObjectView";
import { CreateObjectWizard } from "./components/CreateObjectWizard";
import { GlobalSearch } from "./components/GlobalSearch";
import { NavigationDrawer } from "./components/NavigationDrawer";
import { TabManager } from "./components/TabManager";
import { Button } from "./components/ui/button";
import { Menu, Package } from "lucide-react";

type AppView = 
  | { type: 'dashboard' }
  | { type: 'space'; spaceId: string }
  | { type: 'project'; projectId: string }
  | { type: 'collection'; collectionId: string }
  | { type: 'object'; objectId: string }
  | { type: 'create-object' }
  | { type: 'search' }
  | { type: 'inventory' };

export interface Tab {
  id: string;
  title: string;
  view: AppView;
  isActive: boolean;
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>({ type: 'dashboard' });
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'main',
      title: 'Dashboard',
      view: { type: 'dashboard' },
      isActive: true
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('main');

  const navigateToInventory = () => {
    setCurrentView({ type: 'inventory' });
    updateActiveTab({ type: 'inventory' }, 'Inventory');
  };

  const navigateToDashboard = () => {
    setCurrentView({ type: 'dashboard' });
    updateActiveTab({ type: 'dashboard' }, 'Dashboard');
  };

  const navigateToSpace = (spaceId: string) => {
    setCurrentView({ type: 'space', spaceId });
    updateActiveTab({ type: 'space', spaceId }, `Space ${spaceId}`);
  };

  const navigateToProject = (projectId: string) => {
    setCurrentView({ type: 'project', projectId });
    updateActiveTab({ type: 'project', projectId }, `Project ${projectId}`);
  };

  const navigateToCollection = (collectionId: string) => {
    setCurrentView({ type: 'collection', collectionId });
    updateActiveTab({ type: 'collection', collectionId }, `Collection ${collectionId}`);
  };

  const navigateToObject = (objectId: string) => {
    setCurrentView({ type: 'object', objectId });
    updateActiveTab({ type: 'object', objectId }, `Object ${objectId}`);
  };

  const navigateToCreateObject = () => {
    setCurrentView({ type: 'create-object' });
    updateActiveTab({ type: 'create-object' }, 'Create Object');
  };

  const navigateToSearch = () => {
    setCurrentView({ type: 'search' });
    updateActiveTab({ type: 'search' }, 'Search');
  };

  const updateActiveTab = (view: AppView, title: string) => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab) {
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, view, title }
          : tab
      ));
    }
  };

  const openNewTab = (view: AppView, title: string) => {
    const newTabId = `tab-${Date.now()}`;
    const newTab: Tab = {
      id: newTabId,
      title,
      view,
      isActive: true
    };
    
    setTabs([
      ...tabs.map(tab => ({ ...tab, isActive: false })),
      newTab
    ]);
    setActiveTabId(newTabId);
    setCurrentView(view);
  };

  const switchToTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setTabs(tabs.map(t => ({ ...t, isActive: t.id === tabId })));
      setActiveTabId(tabId);
      setCurrentView(tab.view);
    }
  };

  const closeTab = (tabId: string) => {
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    
    if (updatedTabs.length === 0) {
      // If no tabs left, create a new dashboard tab
      const dashboardTab: Tab = {
        id: 'main',
        title: 'Dashboard',
        view: { type: 'dashboard' },
        isActive: true
      };
      setTabs([dashboardTab]);
      setActiveTabId('main');
      setCurrentView({ type: 'dashboard' });
    } else {
      setTabs(updatedTabs);
      if (activeTabId === tabId) {
        const nextTab = updatedTabs[updatedTabs.length - 1];
        setActiveTabId(nextTab.id);
        setCurrentView(nextTab.view);
        setTabs(updatedTabs.map(tab => ({ 
          ...tab, 
          isActive: tab.id === nextTab.id 
        })));
      }
    }
  };

  const handleSearchResult = (type: string, id: string) => {
    switch (type) {
      case 'space':
        navigateToSpace(id);
        break;
      case 'project':
        navigateToProject(id);
        break;
      case 'collection':
        navigateToCollection(id);
        break;
      case 'object':
        navigateToObject(id);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Drawer */}
      <NavigationDrawer 
        isOpen={isNavigationOpen}
        onOpenChange={setIsNavigationOpen}
        onNavigateToSpace={navigateToSpace}
        onNavigateToProject={navigateToProject}
        onNavigateToCollection={navigateToCollection}
        onOpenNewTab={openNewTab}
      />

      {/* Top Navigation Bar */}
      <div className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNavigationOpen(true)}
              className="h-8 w-8 p-0"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
            
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={navigateToDashboard}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">O</span>
              </div>
              <span className="font-semibold text-foreground">OpenBIS ELN-LIMS</span>
            </div>
            
            <nav className="flex items-center gap-4">
              <Button
                variant={currentView.type === 'dashboard' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={navigateToDashboard}
                className="h-8 px-3 text-sm"
              >
                Dashboard
              </Button>
              <Button
                variant={currentView.type === 'inventory' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={navigateToInventory}
                className="h-8 px-3 text-sm gap-1"
              >
                <Package className="h-3 w-3" />
                Inventory
              </Button>
              <Button
                variant={currentView.type === 'search' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={navigateToSearch}
                className="h-8 px-3 text-sm"
              >
                Search
              </Button>
              <Button
                variant={currentView.type === 'create-object' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={navigateToCreateObject}
                className="h-8 px-3 text-sm"
              >
                Create
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              Dr. Johnson • Physics Lab
            </div>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
              <span className="text-sm font-medium text-muted-foreground">DJ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Manager */}
      <TabManager 
        tabs={tabs}
        activeTabId={activeTabId}
        onSwitchTab={switchToTab}
        onCloseTab={closeTab}
        onNewTab={() => openNewTab({ type: 'dashboard' }, 'New Tab')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {currentView.type === 'dashboard' && (
          <Dashboard onNavigateToSpace={navigateToSpace} />
        )}

        {currentView.type === 'inventory' && (
          <Dashboard 
            onNavigateToSpace={navigateToSpace} 
            isInventoryView={true}
          />
        )}

        {currentView.type === 'space' && (
          <SpaceView 
            spaceId={currentView.spaceId}
            onNavigateToProject={navigateToProject}
            onNavigateToDashboard={navigateToDashboard}
            onOpenNewTab={openNewTab}
          />
        )}

        {currentView.type === 'project' && (
          <ProjectView 
            projectId={currentView.projectId}
            onNavigateToCollection={navigateToCollection}
            onNavigateToSpace={navigateToSpace}
            onNavigateToDashboard={navigateToDashboard}
            onOpenNewTab={openNewTab}
          />
        )}

        {currentView.type === 'collection' && (
          <CollectionView 
            collectionId={currentView.collectionId}
            onNavigateToObject={navigateToObject}
            onNavigateToProject={navigateToProject}
            onNavigateToSpace={navigateToSpace}
            onNavigateToDashboard={navigateToDashboard}
            onOpenNewTab={openNewTab}
          />
        )}

        {currentView.type === 'object' && (
          <ObjectView 
            objectId={currentView.objectId}
            onNavigateToCollection={navigateToCollection}
            onNavigateToProject={navigateToProject}
            onNavigateToSpace={navigateToSpace}
            onNavigateToDashboard={navigateToDashboard}
            onOpenNewTab={openNewTab}
          />
        )}

        {currentView.type === 'create-object' && (
          <CreateObjectWizard 
            onCancel={() => navigateToCollection('1')}
            onComplete={(objectId) => navigateToObject(objectId)}
            onNavigateToCollection={navigateToCollection}
            onNavigateToProject={navigateToProject}
            onNavigateToSpace={navigateToSpace}
            onNavigateToDashboard={navigateToDashboard}
          />
        )}

        {currentView.type === 'search' && (
          <GlobalSearch 
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToResult={handleSearchResult}
            onOpenNewTab={openNewTab}
          />
        )}
      </main>
    </div>
  );
}