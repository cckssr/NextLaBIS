import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { 
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  FolderOpen,
  FlaskConical,
  Database,
  FileText,
  X
} from "lucide-react";

interface SearchResult {
  id: string;
  type: 'space' | 'project' | 'collection' | 'object';
  name: string;
  code: string;
  description: string;
  path: string[];
  owner: string;
  modified: string;
  relevanceScore: number;
  matchedFields: string[];
}

interface SearchFilters {
  types: string[];
  dateRange: {
    from?: string;
    to?: string;
  };
  owners: string[];
  spaces: string[];
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'object',
    name: 'Desktop Multimeter True-RMS 6.5 Digits',
    code: 'INST_001',
    description: 'Precise digital desktop multimeter for laboratory applications',
    path: ['Physics Laboratory', 'Laboratory Equipment', 'Electrical Instruments'],
    owner: 'Lab Admin',
    modified: '2025-07-01',
    relevanceScore: 0.95,
    matchedFields: ['name', 'description', 'type']
  },
  {
    id: '2',
    type: 'object',
    name: 'UV-Vis Spectrophotometer',
    code: 'INST_003',
    description: 'Double-beam UV-Visible spectrophotometer for absorbance measurements',
    path: ['Physics Laboratory', 'Laboratory Equipment', 'Optical Instruments'],
    owner: 'Dr. Johnson',
    modified: '2024-11-15',
    relevanceScore: 0.92,
    matchedFields: ['name', 'description']
  },
  {
    id: '3',
    type: 'object',
    name: 'HPLC System with Autosampler',
    code: 'INST_004',
    description: 'High-performance liquid chromatography system with automated sample injection',
    path: ['Materials Science', 'Analytical Instruments', 'Chromatography'],
    owner: 'Dr. Chen',
    modified: '2024-12-05',
    relevanceScore: 0.88,
    matchedFields: ['name', 'description']
  },
  {
    id: '4',
    type: 'collection',
    name: 'Laboratory Equipment Inventory',
    code: 'LAB_EQUIP_2024',
    description: 'Comprehensive inventory of all laboratory instruments and equipment',
    path: ['Physics Laboratory', 'Equipment Management'],
    owner: 'Lab Admin',
    modified: '2024-12-15',
    relevanceScore: 0.85,
    matchedFields: ['name', 'description']
  },
  {
    id: '5',
    type: 'object',
    name: 'Precision Analytical Balance',
    code: 'INST_002',
    description: 'High-precision analytical balance for micro-weighing applications',
    path: ['Biochemistry Lab', 'Weighing Equipment'],
    owner: 'Dr. Martinez',
    modified: '2024-12-10',
    relevanceScore: 0.80,
    matchedFields: ['name', 'description']
  },
  {
    id: '6',
    type: 'object',
    name: 'QD Sample #1 - 4K Measurement',
    code: 'QD_TEMP_001',
    description: 'Photoluminescence spectrum at 4K with 532nm excitation',
    path: ['Physics Laboratory', 'Quantum Dots Characterization', 'Temperature Series Experiment'],
    owner: 'Dr. Johnson',
    modified: '2024-11-15',
    relevanceScore: 0.75,
    matchedFields: ['name', 'description']
  },
  {
    id: '7',
    type: 'object',
    name: 'Rotary Evaporator',
    code: 'INST_005',
    description: 'Rotary evaporator for efficient solvent removal under reduced pressure',
    path: ['Materials Science', 'Synthesis Equipment'],
    owner: 'Lab Technician',
    modified: '2024-09-30',
    relevanceScore: 0.70,
    matchedFields: ['name', 'description']
  }
];

const availableTypes = [
  { value: 'space', label: 'Spaces', icon: FolderOpen },
  { value: 'project', label: 'Projects', icon: FlaskConical },
  { value: 'collection', label: 'Collections', icon: Database },
  { value: 'object', label: 'Objects', icon: FileText }
];

const availableOwners = ['Dr. Johnson', 'Dr. Anderson', 'Prof. Chen', 'Lab Admin', 'Jane Smith'];
const availableSpaces = ['Physics Laboratory', 'Materials Science', 'Biochemistry Lab'];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'space': return <FolderOpen className="w-4 h-4" />;
    case 'project': return <FlaskConical className="w-4 h-4" />;
    case 'collection': return <Database className="w-4 h-4" />;
    case 'object': return <FileText className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'space': return 'bg-blue-100 text-blue-800';
    case 'project': return 'bg-green-100 text-green-800';
    case 'collection': return 'bg-purple-100 text-purple-800';
    case 'object': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function GlobalSearch({ 
  onNavigateToDashboard,
  onNavigateToResult 
}: {
  onNavigateToDashboard: () => void;
  onNavigateToResult: (type: string, id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("temperature");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    types: [],
    dateRange: {},
    owners: [],
    spaces: []
  });
  const [results, setResults] = useState(mockSearchResults);

  const handleSearch = () => {
    // Simulate search with filters
    let filteredResults = mockSearchResults;
    
    if (filters.types.length > 0) {
      filteredResults = filteredResults.filter(result => filters.types.includes(result.type));
    }
    
    if (filters.owners.length > 0) {
      filteredResults = filteredResults.filter(result => filters.owners.includes(result.owner));
    }
    
    if (filters.spaces.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.spaces.some(space => result.path.includes(space))
      );
    }
    
    setResults(filteredResults);
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      dateRange: {},
      owners: [],
      spaces: []
    });
    setResults(mockSearchResults);
  };

  const toggleFilter = (filterType: keyof SearchFilters, value: string) => {
    if (filterType === 'types' || filterType === 'owners' || filterType === 'spaces') {
      const currentArray = filters[filterType] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      setFilters(prev => ({
        ...prev,
        [filterType]: newArray
      }));
    }
  };

  const activeFiltersCount = filters.types.length + filters.owners.length + filters.spaces.length;

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
            <BreadcrumbPage>Global Search</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Global Search</h1>
        <p className="text-muted-foreground">Search across all spaces, projects, collections, and objects</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search for anything..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              Search
            </Button>
            <Collapsible open={showFilters} onOpenChange={setShowFilters}>
              <CollapsibleTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {activeFiltersCount}
                    </Badge>
                  )}
                  {showFilters ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </CardContent>

        <CollapsibleContent>
          <CardContent className="pt-0 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type Filters */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Type</Label>
                <div className="space-y-2">
                  {availableTypes.map((type) => (
                    <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type.value)}
                        onChange={() => toggleFilter('types', type.value)}
                        className="rounded border-gray-300"
                      />
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{type.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Owner Filters */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Owner</Label>
                <div className="space-y-2">
                  {availableOwners.map((owner) => (
                    <label key={owner} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.owners.includes(owner)}
                        onChange={() => toggleFilter('owners', owner)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{owner}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Space Filters */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Space</Label>
                <div className="space-y-2">
                  {availableSpaces.map((space) => (
                    <label key={space} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.spaces.includes(space)}
                        onChange={() => toggleFilter('spaces', space)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{space}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Date Range</Label>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="from-date" className="text-xs text-muted-foreground">From</Label>
                    <Input 
                      id="from-date"
                      type="date" 
                      value={filters.dateRange.from || ''}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, from: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="to-date" className="text-xs text-muted-foreground">To</Label>
                    <Input 
                      id="to-date"
                      type="date" 
                      value={filters.dateRange.to || ''}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, to: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {activeFiltersCount > 0 && `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied`}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button size="sm" onClick={handleSearch}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
              </CardDescription>
            </div>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="modified">Last Modified</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => (
              <div 
                key={result.id}
                className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onNavigateToResult(result.type, result.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(result.type)}
                        <h3 className="font-medium">{result.name}</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {result.code}
                      </Badge>
                      <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                        {result.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FolderOpen className="w-3 h-3" />
                        {result.path.join(' > ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {result.owner}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {result.modified}
                      </span>
                    </div>
                    
                    {result.matchedFields.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {result.matchedFields.map((field) => (
                          <Badge key={field} variant="secondary" className="text-xs">
                            Matched: {field}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right text-xs text-muted-foreground">
                    <div>Relevance</div>
                    <div className="font-medium">{(result.relevanceScore * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            ))}

            {results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-4 opacity-50" />
                <h3 className="font-medium mb-2">No results found</h3>
                <p className="text-sm">Try adjusting your search query or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}