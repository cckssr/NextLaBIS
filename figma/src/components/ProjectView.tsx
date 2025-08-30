import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  Plus, 
  Search,
  Database,
  Calendar,
  User,
  MoreHorizontal,
  Filter,
  Download,
  Settings
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface Collection {
  id: string;
  name: string;
  code: string;
  description: string;
  objectCount: number;
  lastModified: string;
  owner: string;
  status: 'active' | 'completed' | 'archived';
}

interface ProjectData {
  id: string;
  name: string;
  code: string;
  description: string;
  owner: string;
  created: string;
  lastModified: string;
  userRole: string;
}

const mockProjectData: ProjectData = {
  id: '1',
  name: 'Quantum Dots Characterization',
  code: 'QD_CHAR_2024',
  description: 'Comprehensive study of optical and electronic properties of semiconductor quantum dots for photonic applications.',
  owner: 'Dr. Johnson',
  created: '2024-01-15',
  lastModified: '2024-12-15',
  userRole: 'admin'
};

const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Temperature Series Experiment',
    code: 'TEMP_SERIES_2024_01',
    description: 'Systematic temperature-dependent measurements from 4K to 300K',
    objectCount: 48,
    lastModified: '2024-12-15',
    owner: 'Dr. Johnson',
    status: 'active'
  },
  {
    id: '2',
    name: 'Size-dependent Analysis',
    code: 'SIZE_DEP_2024_01',
    description: 'Characterization of quantum dots with different sizes',
    objectCount: 32,
    lastModified: '2024-12-14',
    owner: 'Jane Smith',
    status: 'active'
  },
  {
    id: '3',
    name: 'Wavelength Calibration',
    code: 'CAL_WAVE_2024',
    description: 'Standard wavelength calibration measurements',
    objectCount: 15,
    lastModified: '2024-12-10',
    owner: 'Lab Admin',
    status: 'completed'
  },
  {
    id: '4',
    name: 'Solvent Effect Study',
    code: 'SOLVENT_2024_01',
    description: 'Impact of different solvents on quantum dot properties',
    objectCount: 24,
    lastModified: '2024-12-08',
    owner: 'Dr. Johnson',
    status: 'active'
  },
  {
    id: '5',
    name: 'Baseline Measurements',
    code: 'BASELINE_2024',
    description: 'Initial characterization and baseline measurements',
    objectCount: 18,
    lastModified: '2024-11-20',
    owner: 'Dr. Johnson',
    status: 'archived'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'archived': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function ProjectView({ 
  projectId, 
  onNavigateToCollection, 
  onNavigateToSpace,
  onNavigateToDashboard 
}: { 
  projectId: string;
  onNavigateToCollection: (collectionId: string) => void;
  onNavigateToSpace: (spaceId: string) => void;
  onNavigateToDashboard: () => void;
}) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={onNavigateToDashboard} className="cursor-pointer">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => onNavigateToSpace('1')} className="cursor-pointer">
              Physics Laboratory
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{mockProjectData.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Project Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold">{mockProjectData.name}</h1>
            <Badge variant="outline">{mockProjectData.code}</Badge>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <p className="text-muted-foreground mb-4">{mockProjectData.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Owner: {mockProjectData.owner}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Created: {mockProjectData.created}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Modified: {mockProjectData.lastModified}</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted-foreground" />
              <span>{mockCollections.length} Collections</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Collection
          </Button>
        </div>
      </div>

      {/* Collections Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Collections
              </CardTitle>
              <CardDescription>
                Experiment series and data collections in this project
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search collections..." 
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Collection</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Objects</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCollections.map((collection) => (
                  <TableRow 
                    key={collection.id}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => onNavigateToCollection(collection.id)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{collection.name}</div>
                        <div className="text-sm text-muted-foreground">{collection.code}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="truncate" title={collection.description}>
                        {collection.description}
                      </div>
                    </TableCell>
                    <TableCell>{collection.objectCount}</TableCell>
                    <TableCell>{collection.owner}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusColor(collection.status)}`}>
                        {collection.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{collection.lastModified}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}