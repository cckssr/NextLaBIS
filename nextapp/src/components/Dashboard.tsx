import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Search, 
  Plus, 
  FolderOpen, 
  FlaskConical, 
  Database, 
  Clock,
  Star,
  Users
} from "lucide-react";

interface Space {
  id: string;
  name: string;
  code: string;
  description: string;
  projectCount: number;
  lastActivity: string;
  owner: string;
  role: 'admin' | 'power_user' | 'user' | 'observer';
}

interface RecentActivity {
  id: string;
  type: 'object_created' | 'object_updated' | 'collection_created';
  title: string;
  space: string;
  timestamp: string;
  user: string;
}

const mockSpaces: Space[] = [
  {
    id: '1',
    name: 'Physics Laboratory',
    code: 'PHYS_LAB',
    description: 'Quantum mechanics and optics research',
    projectCount: 8,
    lastActivity: '2 hours ago',
    owner: 'Dr. Johnson',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Materials Science',
    code: 'MAT_SCI',
    description: 'Advanced materials characterization and synthesis',
    projectCount: 12,
    lastActivity: '1 day ago',
    owner: 'Prof. Chen',
    role: 'power_user'
  },
  {
    id: '3',
    name: 'Biochemistry Lab',
    code: 'BIOCHEM',
    description: 'Protein analysis and molecular biology',
    projectCount: 6,
    lastActivity: '3 days ago',
    owner: 'Dr. Martinez',
    role: 'user'
  }
];

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'object_created',
    title: 'Desktop Multimeter True-RMS 6.5 Digits - INST_001',
    space: 'Physics Laboratory',
    timestamp: '2 hours ago',
    user: 'Lab Admin'
  },
  {
    id: '2',
    type: 'object_updated',
    title: 'UV-Vis Spectrophotometer - Calibration Updated',
    space: 'Physics Laboratory',
    timestamp: '4 hours ago',
    user: 'Dr. Johnson'
  },
  {
    id: '3',
    type: 'collection_created',
    title: 'Laboratory Equipment Inventory',
    space: 'Materials Science',
    timestamp: '6 hours ago',
    user: 'Dr. Martinez'
  },
  {
    id: '4',
    type: 'object_created',
    title: 'HPLC System with Autosampler - INST_004',
    space: 'Materials Science',
    timestamp: '1 day ago',
    user: 'Dr. Chen'
  },
  {
    id: '5',
    type: 'object_updated',
    title: 'Precision Analytical Balance - Maintenance Record',
    space: 'Biochemistry Lab',
    timestamp: '2 days ago',
    user: 'Lab Technician'
  }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin': return 'bg-red-100 text-red-800';
    case 'power_user': return 'bg-blue-100 text-blue-800';
    case 'user': return 'bg-green-100 text-green-800';
    case 'observer': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'object_created': return <Database className="w-4 h-4 text-green-600" />;
    case 'object_updated': return <Database className="w-4 h-4 text-blue-600" />;
    case 'collection_created': return <FlaskConical className="w-4 h-4 text-purple-600" />;
    default: return <Database className="w-4 h-4 text-gray-600" />;
  }
};

export function Dashboard({ 
  onNavigateToSpace, 
  isInventoryView = false 
}: { 
  onNavigateToSpace: (spaceId: string) => void;
  isInventoryView?: boolean;
}) {
  // Filter spaces for inventory view
  const displaySpaces = isInventoryView 
    ? mockSpaces.filter(space => space.code === 'INVENTORY' || space.name.toLowerCase().includes('inventory'))
    : mockSpaces;

  // Add inventory space if it doesn't exist and we're in inventory view
  const spacesToShow = isInventoryView && displaySpaces.length === 0 ? [
    {
      id: 'inventory',
      name: 'Laboratory Inventory',
      code: 'INVENTORY',
      description: 'Equipment and instrument management system',
      projectCount: 3,
      lastActivity: '1 hour ago',
      owner: 'Lab Manager',
      role: 'admin' as const
    }
  ] : displaySpaces;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {isInventoryView ? 'Laboratory Inventory' : 'OpenBIS Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {isInventoryView 
              ? 'Manage laboratory equipment, instruments, and resources.'
              : 'Welcome back! Manage your research data and laboratory information.'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {isInventoryView ? 'Add Equipment' : 'Create Space'}
          </Button>
        </div>
      </div>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Quick Search
          </CardTitle>
          <CardDescription>
            {isInventoryView 
              ? 'Search across all laboratory equipment and instruments'
              : 'Search across all spaces, projects, collections, and objects'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder={isInventoryView 
                ? "Search for instruments, equipment, tools..." 
                : "Search for samples, experiments, datasets..."
              }
              className="flex-1"
            />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spaces */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                {isInventoryView ? 'Inventory Spaces' : 'Your Spaces'}
              </CardTitle>
              <CardDescription>
                {isInventoryView 
                  ? 'Equipment categories and laboratory sections'
                  : 'Research groups and departments you have access to'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {spacesToShow.map((space) => (
                <div 
                  key={space.id}
                  className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => onNavigateToSpace(space.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{space.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {space.code}
                        </Badge>
                        <Badge className={`text-xs ${getRoleColor(space.role)}`}>
                          {space.role.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {space.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FlaskConical className="w-3 h-3" />
                          {space.projectCount} {isInventoryView ? 'categories' : 'projects'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {space.owner}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {space.lastActivity}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                {isInventoryView 
                  ? 'Latest equipment updates and maintenance'
                  : 'Latest updates across your spaces'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3 p-3 border rounded-lg">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.space} • {activity.user}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}