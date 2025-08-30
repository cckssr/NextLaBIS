import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Plus, 
  Search,
  Database,
  Calendar,
  User,
  MoreHorizontal,
  Filter,
  Download,
  Settings,
  FileText,
  Trash2,
  Copy,
  Tag
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface ObjectData {
  id: string;
  permId: string;
  name: string;
  type: string;
  description: string;
  created: string;
  modified: string;
  owner: string;
  status: 'active' | 'archived' | 'processing';
  hasFiles: boolean;
  fileCount: number;
  tags: string[];
}

interface CollectionData {
  id: string;
  name: string;
  code: string;
  description: string;
  owner: string;
  created: string;
  lastModified: string;
  objectCount: number;
}

const mockCollectionData: CollectionData = {
  id: '1',
  name: 'Temperature Series Experiment',
  code: 'TEMP_SERIES_2024_01',
  description: 'Systematic temperature-dependent measurements of quantum dot emission spectra from 4K to 300K',
  owner: 'Dr. Johnson',
  created: '2024-11-15',
  lastModified: '2024-12-15',
  objectCount: 48
};

const mockObjects: ObjectData[] = [
  {
    id: '1',
    permId: 'INST_001',
    name: 'Desktop Multimeter True-RMS 6.5 Digits',
    type: 'Laboratory Instrument',
    description: 'Precise digital desktop multimeter for laboratory applications',
    created: '2025-05-01',
    modified: '2025-07-01',
    owner: 'Lab Admin',
    status: 'active',
    hasFiles: true,
    fileCount: 5,
    tags: ['electrical', 'multimeter', 'calibrated']
  },
  {
    id: '2',
    permId: 'INST_002',
    name: 'Precision Analytical Balance',
    type: 'Laboratory Instrument',
    description: 'High-precision analytical balance for micro-weighing applications',
    created: '2024-08-12',
    modified: '2024-12-10',
    owner: 'Dr. Martinez',
    status: 'active',
    hasFiles: true,
    fileCount: 3,
    tags: ['balance', 'precision', 'micro-weighing']
  },
  {
    id: '3',
    permId: 'INST_003',
    name: 'UV-Vis Spectrophotometer',
    type: 'Laboratory Instrument',
    description: 'Double-beam UV-Visible spectrophotometer for absorbance measurements',
    created: '2024-03-20',
    modified: '2024-11-15',
    owner: 'Dr. Johnson',
    status: 'active',
    hasFiles: true,
    fileCount: 8,
    tags: ['spectroscopy', 'UV-Vis', 'absorbance']
  },
  {
    id: '4',
    permId: 'QD_TEMP_001',
    name: 'QD Sample #1 - 4K Measurement',
    type: 'Spectroscopy Measurement',
    description: 'Photoluminescence spectrum at 4K with 532nm excitation',
    created: '2024-11-15',
    modified: '2024-11-15',
    owner: 'Dr. Johnson',
    status: 'active',
    hasFiles: true,
    fileCount: 3,
    tags: ['4K', 'PL', 'baseline']
  },
  {
    id: '5',
    permId: 'INST_004',
    name: 'HPLC System with Autosampler',
    type: 'Laboratory Instrument',
    description: 'High-performance liquid chromatography system with automated sample injection',
    created: '2024-01-08',
    modified: '2024-12-05',
    owner: 'Dr. Chen',
    status: 'active',
    hasFiles: true,
    fileCount: 12,
    tags: ['HPLC', 'chromatography', 'automated']
  },
  {
    id: '6',
    permId: 'INST_005',
    name: 'Rotary Evaporator',
    type: 'Laboratory Instrument',
    description: 'Rotary evaporator for efficient solvent removal under reduced pressure',
    created: '2023-11-22',
    modified: '2024-09-30',
    owner: 'Lab Technician',
    status: 'active',
    hasFiles: false,
    fileCount: 0,
    tags: ['evaporator', 'solvent-removal', 'vacuum']
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'archived': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function CollectionView({ 
  collectionId, 
  onNavigateToObject,
  onNavigateToProject,
  onNavigateToSpace,
  onNavigateToDashboard 
}: { 
  collectionId: string;
  onNavigateToObject: (objectId: string) => void;
  onNavigateToProject: (projectId: string) => void;
  onNavigateToSpace: (spaceId: string) => void;
  onNavigateToDashboard: () => void;
}) {
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedObjects(mockObjects.map(obj => obj.id));
    } else {
      setSelectedObjects([]);
    }
  };

  const handleSelectObject = (objectId: string, checked: boolean) => {
    if (checked) {
      setSelectedObjects([...selectedObjects, objectId]);
    } else {
      setSelectedObjects(selectedObjects.filter(id => id !== objectId));
    }
  };

  const filteredObjects = mockObjects.filter(obj => {
    const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         obj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         obj.permId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || obj.type === filterType;
    return matchesSearch && matchesType;
  });

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
            <BreadcrumbLink onClick={() => onNavigateToProject('1')} className="cursor-pointer">
              Quantum Dots Characterization
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{mockCollectionData.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Collection Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold">{mockCollectionData.name}</h1>
            <Badge variant="outline">{mockCollectionData.code}</Badge>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <p className="text-muted-foreground mb-4">{mockCollectionData.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Owner: {mockCollectionData.owner}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Created: {mockCollectionData.created}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Modified: {mockCollectionData.lastModified}</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted-foreground" />
              <span>{mockCollectionData.objectCount} Objects</span>
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
            New Object
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedObjects.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedObjects.length} object{selectedObjects.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Tag className="w-4 h-4 mr-2" />
                  Add Tags
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" variant="outline" className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Objects Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Objects
              </CardTitle>
              <CardDescription>
                Research data, samples, and measurements in this collection
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search objects..." 
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Spectroscopy Measurement">Spectroscopy</SelectItem>
                  <SelectItem value="Calibration Standard">Calibration</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedObjects.length === filteredObjects.length && filteredObjects.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Object</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredObjects.map((object) => (
                  <TableRow 
                    key={object.id}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => onNavigateToObject(object.id)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={selectedObjects.includes(object.id)}
                        onCheckedChange={(checked) => handleSelectObject(object.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{object.name}</div>
                        <div className="text-sm text-muted-foreground">{object.permId}</div>
                        <div className="flex gap-1 mt-1">
                          {object.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {object.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{object.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {object.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="truncate" title={object.description}>
                        {object.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{object.fileCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>{object.owner}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusColor(object.status)}`}>
                        {object.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{object.modified}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Add to Collection</DropdownMenuItem>
                          <DropdownMenuItem>Download Files</DropdownMenuItem>
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