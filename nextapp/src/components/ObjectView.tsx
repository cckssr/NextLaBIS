import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ObjectActionMenu } from "./ObjectActionMenu";
import { PropertyLabel } from "./PropertyTooltip";
import { AppView } from "../App";
import { 
  Save, 
  Edit,
  FileText,
  Calendar,
  User,
  Download,
  Upload,
  Eye,
  Link,
  History,
  Plus,
  ArrowUp,
  ArrowDown,
  ExternalLink
} from "lucide-react";

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
  properties: Record<string, any>;
}

interface FileData {
  id: string;
  name: string;
  size: string;
  type: string;
  uploaded: string;
  uploader: string;
}

interface RelationshipData {
  id: string;
  name: string;
  permId: string;
  type: string;
  relation: 'parent' | 'child';
  relationshipType: string;
}

interface HistoryEntry {
  id: string;
  action: string;
  field: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
  user: string;
}

const mockObjectData: ObjectData = {
  id: '1',
  permId: 'INST_001',
  name: 'Desktop Multimeter True-RMS 6.5 Digits',
  type: 'Laboratory Instrument',
  description: 'Precise digital desktop multimeter for laboratory applications with high resolution and comprehensive interface support. Ideal for use in automated measurement stations and LIMS environments.',
  created: '2025-05-01 09:00:00',
  modified: '2025-07-01 14:30:00',
  owner: 'Lab Admin',
  status: 'active',
  properties: {
    serialNumber: 'SDM36HCD801196',
    manufacturer: 'Siglent',
    modelNumber: 'SDM3065X',
    instrumentGroup: '6431-Electrical Measurement Devices: Digital Multimeters, Voltmeters',
    functionalStatus: 'Calibrated',
    lastCalibration: '2025-07-01',
    nextCalibration: '2026-07-01',
    acquisitionDate: '2025-05-01',
    price: '820',
    location: 'Lab A, Room 101, Bench 3',
    responsiblePerson: 'Dr. Anderson',
    firstOfKind: 'true',
    manualUploaded: 'true',
    networkConfig: 'IP: 141.23.109.200',
    technicalSpecs: `6½-digit resolution, True RMS
DC voltage accuracy: up to ±0.0035%
Supported measurements: Voltage, Current, Resistance, Frequency, Capacitance, Temperature
Measurement rate: up to 150 measurements/s
Integrated math and statistics functions
Supports SCPI, LabVIEW, IVI drivers
Interfaces: USB, LAN (VXI-11), optional GPIB
Internal data storage and logging function
Color display with graphical representation of measurement curves`,
    description: `01.07.25: Configured IP: 141.23.109.200

Precise digital desktop multimeter for laboratory applications with high resolution and comprehensive interface support. Ideal for use in automated measurement stations and LIMS environments.

Special features:

6½-digit resolution, True RMS
DC voltage accuracy: up to ±0.0035%
Supported measurements: Voltage, Current, Resistance, Frequency, Capacitance, Temperature
Measurement rate: up to 150 measurements/s
Integrated math and statistics functions
Supports SCPI, LabVIEW, IVI drivers
Interfaces: USB, LAN (VXI-11), optional GPIB
Internal data storage and logging function
Color display with graphical representation of measurement curves`
  }
};

const mockFiles: FileData[] = [
  {
    id: '1',
    name: 'SDM3065X_User_Manual.pdf',
    size: '3.2 MB',
    type: 'Documentation',
    uploaded: '2025-05-01 10:15:00',
    uploader: 'Lab Admin'
  },
  {
    id: '2',
    name: 'Calibration_Certificate_2025-07-01.pdf',
    size: '245 KB',
    type: 'Calibration Certificate',
    uploaded: '2025-07-01 14:30:00',
    uploader: 'Dr. Anderson'
  },
  {
    id: '3',
    name: 'Installation_Photos.zip',
    size: '8.7 MB',
    type: 'Images',
    uploaded: '2025-05-01 16:45:00',
    uploader: 'Lab Technician'
  },
  {
    id: '4',
    name: 'SCPI_Command_Reference.pdf',
    size: '1.8 MB',
    type: 'Documentation',
    uploaded: '2025-05-02 09:20:00',
    uploader: 'Lab Admin'
  },
  {
    id: '5',
    name: 'Network_Configuration_Backup.xml',
    size: '12 KB',
    type: 'Configuration',
    uploaded: '2025-07-01 15:10:00',
    uploader: 'Lab Admin'
  }
];

const mockRelationships: RelationshipData[] = [
  {
    id: '1',
    name: 'Precision Analytical Balance - INST_002',
    permId: 'INST_002',
    type: 'Laboratory Instrument',
    relation: 'child',
    relationshipType: 'same_location'
  },
  {
    id: '2',
    name: 'Electrical Safety Inspection - SAFE_001',
    permId: 'SAFE_001',
    type: 'Safety Record',
    relation: 'child',
    relationshipType: 'safety_inspection'
  },
  {
    id: '3',
    name: 'Lab A Equipment Collection',
    permId: 'LAB_A_EQUIP',
    type: 'Equipment Collection',
    relation: 'parent',
    relationshipType: 'member_of'
  }
];

const mockHistory: HistoryEntry[] = [
  {
    id: '1',
    action: 'Created',
    field: 'Object',
    oldValue: '',
    newValue: 'Desktop Multimeter True-RMS 6.5 Digits',
    timestamp: '2025-05-01 09:00:00',
    user: 'Lab Admin'
  },
  {
    id: '2',
    action: 'Updated',
    field: 'Network Configuration',
    oldValue: 'DHCP',
    newValue: 'IP: 141.23.109.200',
    timestamp: '2025-07-01 14:30:00',
    user: 'Lab Admin'
  },
  {
    id: '3',
    action: 'Updated',
    field: 'Functional Status',
    oldValue: 'Operational',
    newValue: 'Calibrated',
    timestamp: '2025-07-01 15:45:00',
    user: 'Dr. Anderson'
  },
  {
    id: '4',
    action: 'File Added',
    field: 'Files',
    oldValue: '',
    newValue: 'Calibration_Certificate_2025-07-01.pdf',
    timestamp: '2025-07-01 14:30:00',
    user: 'Dr. Anderson'
  },
  {
    id: '5',
    action: 'Updated',
    field: 'Next Calibration Date',
    oldValue: '2025-12-01',
    newValue: '2026-07-01',
    timestamp: '2025-07-01 15:50:00',
    user: 'Dr. Anderson'
  }
];

const objectPath = 'Physics Laboratory / Laboratory Equipment / Electrical Instruments / INST_001';
const actualPermId = '20250501090000123-11248';

export function ObjectView({ 
  objectId,
  onNavigateToCollection,
  onNavigateToProject,
  onNavigateToSpace,
  onNavigateToDashboard,
  onOpenNewTab
}: { 
  objectId: string;
  onNavigateToCollection: (collectionId: string) => void;
  onNavigateToProject: (projectId: string) => void;
  onNavigateToSpace: (spaceId: string) => void;
  onNavigateToDashboard: () => void;
  onOpenNewTab?: (view: AppView, title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedObject, setEditedObject] = useState(mockObjectData);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the changes to the backend
  };

  const handleCancel = () => {
    setEditedObject(mockObjectData);
    setIsEditing(false);
  };

  const handlePropertyChange = (propertyName: string, value: any) => {
    setEditedObject(prev => ({
      ...prev,
      properties: {
        ...prev.properties,
        [propertyName]: value
      }
    }));
  };

  // Action menu handlers
  const handleOpenNewTab = () => {
    if (onOpenNewTab) {
      onOpenNewTab({ type: 'object', objectId }, mockObjectData.name);
    }
  };

  const handleDuplicate = () => {
    console.log('Duplicating object:', objectId);
    // Implementation for duplication
  };

  const handleDelete = () => {
    console.log('Deleting object:', objectId);
    // Implementation for deletion
  };

  const handleArchive = () => {
    console.log('Archiving object:', objectId);
    // Implementation for archiving
  };

  const handleExportData = () => {
    console.log('Exporting object data:', objectId);
    // Implementation for data export
  };

  const handleShowHistory = () => {
    // Switch to history tab or show history modal
    console.log('Showing history for:', objectId);
  };

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
            <BreadcrumbLink onClick={() => onNavigateToCollection('1')} className="cursor-pointer">
              Temperature Series Experiment
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{mockObjectData.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Object Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold">{mockObjectData.name}</h1>
            <Badge variant="outline">{mockObjectData.permId}</Badge>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <p className="text-muted-foreground mb-4">{mockObjectData.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Owner: {mockObjectData.owner}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Created: {mockObjectData.created}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Modified: {mockObjectData.modified}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span>{mockFiles.length} Files</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <ObjectActionMenu
                objectId={objectId}
                objectType={mockObjectData.type}
                canEdit={true}
                canDelete={true}
                canManagePermissions={true}
                isArchived={false}
                isLocked={false}
                isFavorite={false}
                onEdit={() => setIsEditing(true)}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                onArchive={handleArchive}
                onShowHistory={handleShowHistory}
                onExportData={handleExportData}
                onOpenNewTab={handleOpenNewTab}
              />
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="files">Files & Datasets</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Properties Tab */}
        <TabsContent value="properties">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Core metadata for this object
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <PropertyLabel 
                    label="Permanent ID" 
                    description="Unique identifier automatically generated by the system. This ID never changes and can be used for permanent references."
                    htmlFor="permId"
                  />
                  <Input 
                    id="permId"
                    value={actualPermId}
                    disabled={true}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <PropertyLabel 
                    label="Object Path" 
                    description="Hierarchical path showing the location of this object within the system structure."
                    htmlFor="objectPath"
                  />
                  <Input 
                    id="objectPath"
                    value={objectPath}
                    disabled={true}
                    className="text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <PropertyLabel 
                      label="Name" 
                      description="Display name for this object. Should be descriptive and unique within its collection."
                      htmlFor="name"
                    />
                    <Input 
                      id="name"
                      value={editedObject.name}
                      disabled={!isEditing}
                      onChange={(e) => setEditedObject({...editedObject, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <PropertyLabel 
                      label="Type" 
                      description="Object type determines available properties and behavior. Cannot be changed after creation."
                      htmlFor="type"
                    />
                    <Select value={editedObject.type} disabled={true}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laboratory Instrument">Laboratory Instrument</SelectItem>
                        <SelectItem value="Spectroscopy Measurement">Spectroscopy Measurement</SelectItem>
                        <SelectItem value="Physical Sample">Physical Sample</SelectItem>
                        <SelectItem value="Calibration Standard">Calibration Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <PropertyLabel 
                    label="Description" 
                    description="Detailed description of the object, its purpose, and any relevant information for users."
                    htmlFor="description"
                  />
                  <Textarea 
                    id="description"
                    value={editedObject.description}
                    disabled={!isEditing}
                    onChange={(e) => setEditedObject({...editedObject, description: e.target.value})}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Conditional second card based on object type */}
            {editedObject.type === 'Laboratory Instrument' && (
              <Card>
                <CardHeader>
                  <CardTitle>Instrument Details</CardTitle>
                  <CardDescription>
                    Equipment specifications and status information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="Serial Number" 
                        description="Manufacturer's serial number for unique identification and warranty tracking."
                        htmlFor="serialNumber"
                      />
                      <Input 
                        id="serialNumber"
                        value={editedObject.properties.serialNumber || ''}
                        disabled={!isEditing}
                        className="font-mono"
                        onChange={(e) => handlePropertyChange('serialNumber', e.target.value)}
                      />
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Manufacturer" 
                        description="Company that manufactured this instrument."
                        htmlFor="manufacturer"
                      />
                      <Input 
                        id="manufacturer"
                        value={editedObject.properties.manufacturer || ''}
                        disabled={!isEditing}
                        onChange={(e) => handlePropertyChange('manufacturer', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="Model Number" 
                        description="Manufacturer's model designation for this instrument type."
                        htmlFor="modelNumber"
                      />
                      <Input 
                        id="modelNumber"
                        value={editedObject.properties.modelNumber || ''}
                        disabled={!isEditing}
                        onChange={(e) => handlePropertyChange('modelNumber', e.target.value)}
                      />
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Functional Status" 
                        description="Current operational status of the instrument. Affects availability for experiments."
                        htmlFor="functionalStatus"
                      />
                      <Select 
                        value={editedObject.properties.functionalStatus || ''} 
                        disabled={!isEditing}
                        onValueChange={(value) => handlePropertyChange('functionalStatus', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Calibrated">Calibrated</SelectItem>
                          <SelectItem value="Operational">Operational</SelectItem>
                          <SelectItem value="Maintenance Required">Maintenance Required</SelectItem>
                          <SelectItem value="Out of Service">Out of Service</SelectItem>
                          <SelectItem value="Under Repair">Under Repair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="Last Calibration" 
                        description="Date when the instrument was last calibrated. Used to track calibration intervals."
                        htmlFor="lastCalibration"
                      />
                      <Input 
                        id="lastCalibration"
                        type="date"
                        value={editedObject.properties.lastCalibration || ''}
                        disabled={!isEditing}
                        onChange={(e) => handlePropertyChange('lastCalibration', e.target.value)}
                      />
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Next Calibration" 
                        description="Scheduled date for the next calibration. Alerts are generated when approaching."
                        htmlFor="nextCalibration"
                      />
                      <Input 
                        id="nextCalibration"
                        type="date"
                        value={editedObject.properties.nextCalibration || ''}
                        disabled={!isEditing}
                        onChange={(e) => handlePropertyChange('nextCalibration', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="Acquisition Date" 
                        description="Date when the instrument was acquired by the laboratory."
                        htmlFor="acquisitionDate"
                      />
                      <Input 
                        id="acquisitionDate"
                        type="date"
                        value={editedObject.properties.acquisitionDate || ''}
                        disabled={!isEditing}
                        onChange={(e) => handlePropertyChange('acquisitionDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Price (€)" 
                        description="Purchase price of the instrument for asset tracking and depreciation."
                        htmlFor="price"
                      />
                      <Input 
                        id="price"
                        type="number"
                        value={editedObject.properties.price || ''}
                        disabled={!isEditing}
                        onChange={(e) => handlePropertyChange('price', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="Location" 
                        description="Physical location of the instrument within the laboratory for easy finding."
                        htmlFor="location"
                      />
                      <Input 
                        id="location"
                        value={editedObject.properties.location || ''}
                        disabled={!isEditing}
                        onChange={(e) => handlePropertyChange('location', e.target.value)}
                      />
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Responsible Person" 
                        description="Person responsible for maintenance, calibration, and instrument care."
                        htmlFor="responsiblePerson"
                      />
                      <Input 
                        id="responsiblePerson"
                        value={editedObject.properties.responsiblePerson || ''}
                        disabled={!isEditing}
                        onChange={(e) => handlePropertyChange('responsiblePerson', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="First Device of Its Kind" 
                        description="Indicates if this is the first instrument of this type in the laboratory."
                        htmlFor="firstOfKind"
                      />
                      <Select 
                        value={editedObject.properties.firstOfKind || ''} 
                        disabled={!isEditing}
                        onValueChange={(value) => handlePropertyChange('firstOfKind', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Manual Uploaded" 
                        description="Indicates if the user manual has been uploaded to the system."
                        htmlFor="manualUploaded"
                      />
                      <Select 
                        value={editedObject.properties.manualUploaded || ''} 
                        disabled={!isEditing}
                        onValueChange={(value) => handlePropertyChange('manualUploaded', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <PropertyLabel 
                      label="Instrument Group" 
                      description="Classification group for organizing similar instruments and generating reports."
                      htmlFor="instrumentGroup"
                    />
                    <Input 
                      id="instrumentGroup"
                      value={editedObject.properties.instrumentGroup || ''}
                      disabled={true}
                      className="text-sm"
                    />
                  </div>

                  <div>
                    <PropertyLabel 
                      label="Network Configuration" 
                      description="Network settings for remote access and automated data collection."
                      htmlFor="networkConfig"
                    />
                    <Input 
                      id="networkConfig"
                      value={editedObject.properties.networkConfig || ''}
                      disabled={!isEditing}
                      placeholder="IP address, network settings..."
                      onChange={(e) => handlePropertyChange('networkConfig', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* For Spectroscopy Measurements */}
            {editedObject.type === 'Spectroscopy Measurement' && (
              <Card>
                <CardHeader>
                  <CardTitle>Measurement Parameters</CardTitle>
                  <CardDescription>
                    Experimental conditions and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="Temperature" 
                        description="Sample temperature during measurement. Critical for reproducible results."
                        htmlFor="temperature"
                      />
                      <div className="flex gap-2">
                        <Input 
                          id="temperature"
                          value={editedObject.properties.temperature}
                          disabled={!isEditing}
                        />
                        <Select value={editedObject.properties.temperatureUnit} disabled={!isEditing}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="K">K</SelectItem>
                            <SelectItem value="°C">°C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Excitation Wavelength" 
                        description="Wavelength of the excitation laser used for the measurement."
                        htmlFor="excitation"
                      />
                      <div className="flex gap-2">
                        <Input 
                          id="excitation"
                          value={editedObject.properties.excitationWavelength}
                          disabled={!isEditing}
                        />
                        <Select value={editedObject.properties.excitationWavelengthUnit} disabled={!isEditing}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nm">nm</SelectItem>
                            <SelectItem value="μm">μm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="Laser Power" 
                        description="Power of the excitation laser. Affects signal intensity and potential sample damage."
                        htmlFor="power"
                      />
                      <div className="flex gap-2">
                        <Input 
                          id="power"
                          value={editedObject.properties.laserPower}
                          disabled={!isEditing}
                        />
                        <Select value={editedObject.properties.laserPowerUnit} disabled={!isEditing}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mW">mW</SelectItem>
                            <SelectItem value="μW">μW</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Integration Time" 
                        description="Duration of signal collection per data point. Longer times improve signal-to-noise ratio."
                        htmlFor="integration"
                      />
                      <div className="flex gap-2">
                        <Input 
                          id="integration"
                          value={editedObject.properties.integrationTime}
                          disabled={!isEditing}
                        />
                        <Select value={editedObject.properties.integrationTimeUnit} disabled={!isEditing}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ms">ms</SelectItem>
                            <SelectItem value="s">s</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PropertyLabel 
                        label="Detector" 
                        description="Type of detector used for signal collection."
                        htmlFor="detector"
                      />
                      <Input 
                        id="detector"
                        value={editedObject.properties.detector}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <PropertyLabel 
                        label="Instrument ID" 
                        description="Identifier of the instrument used for this measurement."
                        htmlFor="instrument"
                      />
                      <Input 
                        id="instrument"
                        value={editedObject.properties.instrumentId}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <PropertyLabel 
                      label="Notes" 
                      description="Additional notes about the measurement conditions or observations."
                      htmlFor="notes"
                    />
                    <Textarea 
                      id="notes"
                      value={editedObject.properties.notes}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* For other object types, show a generic properties card */}
            {!['Laboratory Instrument', 'Spectroscopy Measurement'].includes(editedObject.type) && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Properties</CardTitle>
                  <CardDescription>
                    Type-specific metadata and information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Property fields for {editedObject.type} objects would be displayed here.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Technical Specifications for Laboratory Instruments */}
          {editedObject.type === 'Laboratory Instrument' && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>
                  Detailed technical specifications and capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <PropertyLabel 
                    label="Technical Specifications" 
                    description="Detailed technical specifications, measurement ranges, accuracy, and special features of the instrument."
                    htmlFor="technicalSpecs"
                  />
                  <Textarea 
                    id="technicalSpecs"
                    value={editedObject.properties.technicalSpecs || ''}
                    disabled={!isEditing}
                    rows={8}
                    className="font-mono text-sm"
                    onChange={(e) => handlePropertyChange('technicalSpecs', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Files & Datasets</CardTitle>
                  <CardDescription>
                    Uploaded files, measurement data, and documentation
                  </CardDescription>
                </div>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Uploader</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.uploaded}</TableCell>
                      <TableCell>{file.uploader}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relationships Tab */}
        <TabsContent value="relationships">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Object Relationships</CardTitle>
                  <CardDescription>
                    Parent and child objects related to this item
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Relationship
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Object</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Relationship Type</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRelationships.map((rel) => (
                    <TableRow key={rel.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {rel.relation === 'parent' ? (
                            <ArrowUp className="w-4 h-4 text-blue-600" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-green-600" />
                          )}
                          <span className="capitalize">{rel.relation}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rel.name}</div>
                          <div className="text-sm text-muted-foreground">{rel.permId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {rel.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{rel.relationshipType.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Link className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Change History
              </CardTitle>
              <CardDescription>
                Complete audit trail of changes to this object
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Old Value</TableHead>
                    <TableHead>New Value</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {entry.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.field}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={entry.oldValue}>
                        {entry.oldValue || '-'}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={entry.newValue}>
                        {entry.newValue}
                      </TableCell>
                      <TableCell>{entry.timestamp}</TableCell>
                      <TableCell>{entry.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}