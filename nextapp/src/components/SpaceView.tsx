import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  Plus, 
  Search,
  FlaskConical,
  Calendar,
  User,
  MoreHorizontal,
  Filter,
  Download,
  Settings
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  collectionCount: number;
  objectCount: string;
  lastModified: string;
  owner: string;
  status: 'active' | 'completed' | 'archived';
}

interface SpaceData {
  id: string;
  name: string;
  code: string;
  description: string;
  owner: string;
  created: string;
  lastModified: string;
  userRole: string;
}

const mockSpaceData: SpaceData = {
  id: '1',
  name: 'Physics Laboratory',
  code: 'PHYS_LAB',
  description: 'Quantum mechanics and optics research facility for advanced physics experiments and measurements.',
  owner: 'Dr. Johnson',
  created: '2023-01-15',
  lastModified: '2024-12-15',
  userRole: 'admin'
};

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Quantum Dots Characterization',
    code: 'QD_CHAR_2024',
    description: 'Optical and electronic properties of semiconductor quantum dots',
    collectionCount: 12,
    objectCount: '156',
    lastModified: '2024-12-15',
    owner: 'Dr. Johnson',
    status: 'active'
  },
  {
    id: '2',
    name: 'Laser Spectroscopy',
    code: 'LASER_SPEC',
    description: 'High-resolution laser spectroscopy measurements',
    collectionCount: 8,
    objectCount: '94',
    lastModified: '2024-12-14',
    owner: 'Prof. Anderson',
    status: 'active'
  },
  {
    id: '3',
    name: 'Photonic Crystals',
    code: 'PHOTONIC_2023',
    description: 'Band gap measurements in 2D photonic crystal structures',
    collectionCount: 15,
    objectCount: '203',
    lastModified: '2024-12-10',
    owner: 'Dr. Lee',
    status: 'completed'
  },
  {
    id: '4',
    name: 'Temperature Calibration',
    code: 'TEMP_CAL_2024',
    description: 'Instrument calibration and validation procedures',
    collectionCount: 4,
    objectCount: '28',
    lastModified: '2024-12-08',
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

export function SpaceView({ 
  spaceId, 
  onNavigateToProject, 
  onNavigateToDashboard 
}: { 
  spaceId: string;
  onNavigateToProject: (projectId: string) => void;
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
            <BreadcrumbPage>{mockSpaceData.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Space Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold">{mockSpaceData.name}</h1>
            <Badge variant="outline">{mockSpaceData.code}</Badge>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <p className="text-muted-foreground mb-4">{mockSpaceData.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Owner: {mockSpaceData.owner}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Created: {mockSpaceData.created}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Modified: {mockSpaceData.lastModified}</span>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-muted-foreground" />
              <span>{mockProjects.length} Projects</span>
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
            New Project
          </Button>
        </div>
      </div>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Projects
              </CardTitle>
              <CardDescription>
                Research projects and experiment series in this space
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
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
                  <TableHead>Project</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Collections</TableHead>
                  <TableHead>Objects</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProjects.map((project) => (
                  <TableRow 
                    key={project.id}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => onNavigateToProject(project.id)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.code}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="truncate" title={project.description}>
                        {project.description}
                      </div>
                    </TableCell>
                    <TableCell>{project.collectionCount}</TableCell>
                    <TableCell>{project.objectCount}</TableCell>
                    <TableCell>{project.owner}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.lastModified}</TableCell>
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