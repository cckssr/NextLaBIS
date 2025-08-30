import { useState } from "react";
import { AppView } from "../App";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { 
  ChevronDown, 
  ChevronRight, 
  FolderOpen, 
  Folder, 
  FileText, 
  Package,
  ExternalLink 
} from "lucide-react";

interface NavigationDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateToSpace: (spaceId: string) => void;
  onNavigateToProject: (projectId: string) => void;
  onNavigateToCollection: (collectionId: string) => void;
  onOpenNewTab: (view: AppView, title: string) => void;
}

// Mock data structure for the navigation tree
const mockSpaces = [
  {
    id: "physics-lab",
    name: "Physics Laboratory",
    description: "Main physics research space",
    projects: [
      {
        id: "quantum-optics",
        name: "Quantum Optics Research",
        collections: [
          { id: "qo-experiments", name: "Experiments", objectCount: 24 },
          { id: "qo-protocols", name: "Protocols", objectCount: 8 },
          { id: "qo-instruments", name: "Instruments", objectCount: 12 }
        ]
      },
      {
        id: "spectroscopy",
        name: "Advanced Spectroscopy",
        collections: [
          { id: "spec-data", name: "Spectral Data", objectCount: 156 },
          { id: "spec-samples", name: "Sample Library", objectCount: 89 }
        ]
      }
    ]
  },
  {
    id: "chemistry-lab", 
    name: "Chemistry Laboratory",
    description: "Organic and analytical chemistry",
    projects: [
      {
        id: "synthesis",
        name: "Organic Synthesis",
        collections: [
          { id: "syn-reactions", name: "Reactions", objectCount: 45 },
          { id: "syn-compounds", name: "Compounds", objectCount: 123 }
        ]
      }
    ]
  },
  {
    id: "inventory",
    name: "Laboratory Inventory",
    description: "Equipment and instrument management",
    projects: [
      {
        id: "instruments",
        name: "Laboratory Instruments",
        collections: [
          { id: "analytical", name: "Analytical Instruments", objectCount: 28 },
          { id: "measurement", name: "Measurement Tools", objectCount: 45 },
          { id: "safety", name: "Safety Equipment", objectCount: 67 }
        ]
      }
    ]
  }
];

export function NavigationDrawer({
  isOpen,
  onOpenChange,
  onNavigateToSpace,
  onNavigateToProject,
  onNavigateToCollection,
  onOpenNewTab
}: NavigationDrawerProps) {
  const [expandedSpaces, setExpandedSpaces] = useState<Set<string>>(new Set(['physics-lab']));
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(['quantum-optics']));

  const toggleSpace = (spaceId: string) => {
    const newExpanded = new Set(expandedSpaces);
    if (newExpanded.has(spaceId)) {
      newExpanded.delete(spaceId);
    } else {
      newExpanded.add(spaceId);
    }
    setExpandedSpaces(newExpanded);
  };

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleNavigateToSpace = (spaceId: string, spaceName: string) => {
    onNavigateToSpace(spaceId);
    onOpenChange(false);
  };

  const handleNavigateToProject = (projectId: string, projectName: string) => {
    onNavigateToProject(projectId);
    onOpenChange(false);
  };

  const handleNavigateToCollection = (collectionId: string, collectionName: string) => {
    onNavigateToCollection(collectionId);
    onOpenChange(false);
  };

  const handleOpenInNewTab = (view: AppView, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenNewTab(view, title);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-80px)] px-6">
          <div className="space-y-2">
            {mockSpaces.map((space) => (
              <Collapsible
                key={space.id}
                open={expandedSpaces.has(space.id)}
                onOpenChange={() => toggleSpace(space.id)}
              >
                <div className="flex items-center justify-between">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 h-8 w-full justify-start p-2"
                    >
                      {expandedSpaces.has(space.id) ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                      {space.id === 'inventory' ? 
                        <Package className="h-4 w-4" /> : 
                        <FolderOpen className="h-4 w-4" />
                      }
                      <span className="truncate">{space.name}</span>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => handleOpenInNewTab(
                      { type: 'space', spaceId: space.id }, 
                      space.name, 
                      e
                    )}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>

                <CollapsibleContent className="ml-4">
                  <div className="space-y-1 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs text-muted-foreground h-7"
                      onClick={() => handleNavigateToSpace(space.id, space.name)}
                    >
                      View {space.name}
                    </Button>
                    
                    {space.projects.map((project) => (
                      <Collapsible
                        key={project.id}
                        open={expandedProjects.has(project.id)}
                        onOpenChange={() => toggleProject(project.id)}
                      >
                        <div className="flex items-center justify-between">
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex items-center gap-2 h-7 w-full justify-start p-2 ml-2"
                            >
                              {expandedProjects.has(project.id) ? 
                                <ChevronDown className="h-3 w-3" /> : 
                                <ChevronRight className="h-3 w-3" />
                              }
                              <Folder className="h-3 w-3" />
                              <span className="truncate text-xs">{project.name}</span>
                            </Button>
                          </CollapsibleTrigger>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0"
                            onClick={(e) => handleOpenInNewTab(
                              { type: 'project', projectId: project.id }, 
                              project.name, 
                              e
                            )}
                          >
                            <ExternalLink className="h-2 w-2" />
                          </Button>
                        </div>

                        <CollapsibleContent className="ml-6">
                          <div className="space-y-1 mt-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-xs text-muted-foreground h-6"
                              onClick={() => handleNavigateToProject(project.id, project.name)}
                            >
                              View {project.name}
                            </Button>
                            
                            {project.collections.map((collection) => (
                              <div key={collection.id} className="flex items-center justify-between">
                                <Button
                                  variant="ghost"
                                  className="flex items-center gap-2 h-6 flex-1 justify-start p-2"
                                  onClick={() => handleNavigateToCollection(collection.id, collection.name)}
                                >
                                  <FileText className="h-3 w-3" />
                                  <span className="truncate text-xs">{collection.name}</span>
                                  <span className="text-xs text-muted-foreground">({collection.objectCount})</span>
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0"
                                  onClick={(e) => handleOpenInNewTab(
                                    { type: 'collection', collectionId: collection.id }, 
                                    collection.name, 
                                    e
                                  )}
                                >
                                  <ExternalLink className="h-2 w-2" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}