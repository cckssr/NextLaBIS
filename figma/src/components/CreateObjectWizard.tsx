import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Progress } from "./ui/progress";
import { 
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  X,
  Info
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ObjectType {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'file';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string; }[];
  unit?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

const objectTypes: ObjectType[] = [
  {
    id: 'spectroscopy_measurement',
    name: 'Spectroscopy Measurement',
    description: 'Optical spectroscopy measurements and analysis',
    category: 'Measurement',
    fields: [
      { id: 'sample_id', name: 'sampleId', label: 'Sample ID', type: 'text', required: true, placeholder: 'QD-001' },
      { id: 'temperature', name: 'temperature', label: 'Temperature', type: 'number', required: true, unit: 'K', validation: { min: 0, max: 1000 } },
      { id: 'excitation_wavelength', name: 'excitationWavelength', label: 'Excitation Wavelength', type: 'number', required: true, unit: 'nm', validation: { min: 200, max: 2000 } },
      { id: 'laser_power', name: 'laserPower', label: 'Laser Power', type: 'number', required: true, unit: 'mW', validation: { min: 0.1, max: 100 } },
      { id: 'integration_time', name: 'integrationTime', label: 'Integration Time', type: 'number', required: true, unit: 'ms', validation: { min: 1, max: 10000 } },
      { id: 'detector', name: 'detector', label: 'Detector', type: 'select', required: true, options: [
        { value: 'CCD-1024', label: 'CCD-1024' },
        { value: 'InGaAs-512', label: 'InGaAs-512' },
        { value: 'Si-CCD', label: 'Si-CCD' }
      ]},
      { id: 'instrument_id', name: 'instrumentId', label: 'Instrument ID', type: 'text', required: true, placeholder: 'SPEC-001' },
      { id: 'operator', name: 'operator', label: 'Operator', type: 'text', required: true },
      { id: 'experiment_date', name: 'experimentDate', label: 'Experiment Date', type: 'date', required: true },
      { id: 'notes', name: 'notes', label: 'Notes', type: 'textarea', required: false, placeholder: 'Additional experimental conditions or observations...' }
    ]
  },
  {
    id: 'physical_sample',
    name: 'Physical Sample',
    description: 'Physical specimens, materials, and samples',
    category: 'Sample',
    fields: [
      { id: 'sample_name', name: 'sampleName', label: 'Sample Name', type: 'text', required: true, placeholder: 'Quantum Dot Batch #1' },
      { id: 'material', name: 'material', label: 'Material', type: 'text', required: true, placeholder: 'CdSe/ZnS' },
      { id: 'batch_number', name: 'batchNumber', label: 'Batch Number', type: 'text', required: true, placeholder: 'QD-2024-001' },
      { id: 'synthesis_date', name: 'synthesisDate', label: 'Synthesis Date', type: 'date', required: true },
      { id: 'size', name: 'size', label: 'Size', type: 'number', required: false, unit: 'nm', validation: { min: 0.1, max: 1000 } },
      { id: 'concentration', name: 'concentration', label: 'Concentration', type: 'number', required: false, unit: 'mg/mL', validation: { min: 0.001, max: 1000 } },
      { id: 'solvent', name: 'solvent', label: 'Solvent', type: 'select', required: false, options: [
        { value: 'toluene', label: 'Toluene' },
        { value: 'chloroform', label: 'Chloroform' },
        { value: 'hexane', label: 'Hexane' },
        { value: 'water', label: 'Water' }
      ]},
      { id: 'storage_location', name: 'storageLocation', label: 'Storage Location', type: 'text', required: true, placeholder: 'Freezer A, Shelf 2' },
      { id: 'prepared_by', name: 'preparedBy', label: 'Prepared By', type: 'text', required: true },
      { id: 'synthesis_notes', name: 'synthesisNotes', label: 'Synthesis Notes', type: 'textarea', required: false, placeholder: 'Synthesis conditions, procedures, observations...' }
    ]
  },
  {
    id: 'calibration_standard',
    name: 'Calibration Standard',
    description: 'Reference materials and calibration standards',
    category: 'Reference',
    fields: [
      { id: 'standard_name', name: 'standardName', label: 'Standard Name', type: 'text', required: true, placeholder: 'Wavelength Calibration Lamp' },
      { id: 'standard_type', name: 'standardType', label: 'Standard Type', type: 'select', required: true, options: [
        { value: 'wavelength', label: 'Wavelength Calibration' },
        { value: 'intensity', label: 'Intensity Calibration' },
        { value: 'temperature', label: 'Temperature Standard' },
        { value: 'reference_material', label: 'Reference Material' }
      ]},
      { id: 'certificate_number', name: 'certificateNumber', label: 'Certificate Number', type: 'text', required: true, placeholder: 'NIST-SRM-2036' },
      { id: 'manufacturer', name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
      { id: 'calibration_date', name: 'calibrationDate', label: 'Calibration Date', type: 'date', required: true },
      { id: 'expiry_date', name: 'expiryDate', label: 'Expiry Date', type: 'date', required: true },
      { id: 'uncertainty', name: 'uncertainty', label: 'Uncertainty', type: 'text', required: false, placeholder: '±0.1 nm' },
      { id: 'responsible_person', name: 'responsiblePerson', label: 'Responsible Person', type: 'text', required: true },
      { id: 'calibration_notes', name: 'calibrationNotes', label: 'Calibration Notes', type: 'textarea', required: false, placeholder: 'Calibration procedures, conditions, additional information...' }
    ]
  },
  {
    id: 'laboratory_instrument',
    name: 'Laboratory Instrument',
    description: 'Laboratory equipment and instrumentation for LIMS management',
    category: 'Equipment',
    fields: [
      { id: 'instrument_name', name: 'instrumentName', label: 'Instrument Name', type: 'text', required: true, placeholder: 'Desktop Multimeter True-RMS 6.5 Digits' },
      { id: 'serial_number', name: 'serialNumber', label: 'Serial Number', type: 'text', required: true, placeholder: 'SDM36HCD801196' },
      { id: 'manufacturer', name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true, placeholder: 'Siglent' },
      { id: 'model_number', name: 'modelNumber', label: 'Model Number', type: 'text', required: true, placeholder: 'SDM3065X' },
      { id: 'instrument_group', name: 'instrumentGroup', label: 'Instrument Group', type: 'select', required: true, options: [
        { value: 'electrical_measurement', label: '6431-Electrical Measurement Devices: Digital Multimeters, Voltmeters' },
        { value: 'optical_spectroscopy', label: '6421-Optical Spectroscopy: Spectrometers, Photometers' },
        { value: 'microscopy', label: '6411-Microscopy: Light Microscopes, Electron Microscopes' },
        { value: 'analytical_balance', label: '6441-Analytical Balances: Precision Scales, Microbalances' },
        { value: 'chromatography', label: '6451-Chromatography: HPLC, GC, LC-MS' },
        { value: 'thermal_analysis', label: '6461-Thermal Analysis: DSC, TGA, DMA' }
      ]},
      { id: 'functional_status', name: 'functionalStatus', label: 'Functional Status', type: 'select', required: true, options: [
        { value: 'calibrated', label: 'Calibrated' },
        { value: 'operational', label: 'Operational' },
        { value: 'maintenance_required', label: 'Maintenance Required' },
        { value: 'out_of_service', label: 'Out of Service' },
        { value: 'under_repair', label: 'Under Repair' }
      ]},
      { id: 'last_calibration', name: 'lastCalibration', label: 'Last Calibration Date', type: 'date', required: true },
      { id: 'next_calibration', name: 'nextCalibration', label: 'Next Calibration Date', type: 'date', required: false },
      { id: 'acquisition_date', name: 'acquisitionDate', label: 'Acquisition Date', type: 'date', required: true },
      { id: 'price', name: 'price', label: 'Price', type: 'number', required: false, unit: '€', validation: { min: 0, max: 1000000 } },
      { id: 'location', name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Lab A, Room 101, Bench 3' },
      { id: 'responsible_person', name: 'responsiblePerson', label: 'Responsible Person', type: 'text', required: true },
      { id: 'first_of_kind', name: 'firstOfKind', label: 'First Device of Its Kind', type: 'select', required: false, options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]},
      { id: 'manual_uploaded', name: 'manualUploaded', label: 'Manual/Instructions Uploaded', type: 'select', required: false, options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]},
      { id: 'network_config', name: 'networkConfig', label: 'Network Configuration', type: 'text', required: false, placeholder: 'IP: 141.23.109.200' },
      { id: 'technical_specs', name: 'technicalSpecs', label: 'Technical Specifications', type: 'textarea', required: false, placeholder: 'Key technical specifications and capabilities...' },
      { id: 'description', name: 'description', label: 'Description', type: 'textarea', required: false, placeholder: 'Detailed description, special features, usage notes...' }
    ]
  }
];

const steps = [
  { id: 'type', name: 'Object Type', description: 'Select the type of object to create' },
  { id: 'basic', name: 'Basic Info', description: 'Enter basic information' },
  { id: 'properties', name: 'Properties', description: 'Set type-specific properties' },
  { id: 'files', name: 'Files', description: 'Upload files and datasets (optional)' },
  { id: 'review', name: 'Review', description: 'Review and create object' }
];

export function CreateObjectWizard({ 
  onCancel,
  onComplete,
  onNavigateToCollection,
  onNavigateToProject,
  onNavigateToSpace,
  onNavigateToDashboard 
}: {
  onCancel: () => void;
  onComplete: (objectId: string) => void;
  onNavigateToCollection: (collectionId: string) => void;
  onNavigateToProject: (projectId: string) => void;
  onNavigateToSpace: (spaceId: string) => void;
  onNavigateToDashboard: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<ObjectType | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<File[]>([]);

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTypeSelect = (type: ObjectType) => {
    setSelectedType(type);
    // Initialize form data with default values
    const initialData: Record<string, any> = {};
    type.fields.forEach(field => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Here you would submit the form data to create the object
    console.log('Creating object:', {
      type: selectedType?.id,
      data: formData,
      files: files
    });
    
    // Simulate object creation
    const newObjectId = 'OBJ_' + Date.now();
    onComplete(newObjectId);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedType !== null;
      case 1: return formData.name && formData.description;
      case 2: 
        if (!selectedType) return false;
        return selectedType.fields
          .filter(field => field.required)
          .every(field => formData[field.name] && formData[field.name].toString().trim() !== '');
      default: return true;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
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
            <BreadcrumbPage>Create Object</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Create New Object</h1>
          <p className="text-muted-foreground">Step {currentStep + 1} of {steps.length}: {currentStepData.description}</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          {steps.map((step, index) => (
            <span 
              key={step.id} 
              className={index <= currentStep ? 'text-primary font-medium' : ''}
            >
              {step.name}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{currentStepData.name}</CardTitle>
          <CardDescription>{currentStepData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Step 1: Object Type Selection */}
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {objectTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedType?.id === type.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => handleTypeSelect(type)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{type.name}</h3>
                      {selectedType?.id === type.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    <div className="text-xs text-muted-foreground">
                      Category: {type.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Object Name *</Label>
                <Input 
                  id="name"
                  placeholder="Enter a descriptive name for this object"
                  value={formData.name || ''}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe the purpose, content, or context of this object"
                  value={formData.description || ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  rows={3}
                />
              </div>
              {selectedType && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    You are creating a <strong>{selectedType.name}</strong>. 
                    In the next step, you'll fill in specific properties for this object type.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Step 3: Type-specific Properties */}
          {currentStep === 2 && selectedType && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedType.fields.map((field) => (
                  <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <Label htmlFor={field.id}>
                      {field.label} {field.required && '*'}
                      {field.unit && <span className="text-muted-foreground"> ({field.unit})</span>}
                    </Label>
                    
                    {field.type === 'text' && (
                      <Input 
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'number' && (
                      <Input 
                        id={field.id}
                        type="number"
                        placeholder={field.placeholder}
                        min={field.validation?.min}
                        max={field.validation?.max}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'date' && (
                      <Input 
                        id={field.id}
                        type="date"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'select' && (
                      <Select 
                        value={formData[field.name] || ''} 
                        onValueChange={(value) => handleFieldChange(field.name, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    {field.type === 'textarea' && (
                      <Textarea 
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        rows={3}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: File Upload */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">Upload Files (Optional)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload measurement data, documentation, images, or any related files
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>Choose Files</span>
                  </Button>
                </Label>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Files ({files.length})</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{file.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 4 && selectedType && (
            <div className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Review all information before creating the object. Once created, some fields may not be editable.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {selectedType.name}</div>
                    <div><strong>Name:</strong> {formData.name}</div>
                    <div><strong>Description:</strong> {formData.description}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Properties</h4>
                  <div className="space-y-2 text-sm">
                    {selectedType.fields.slice(0, 6).map((field) => (
                      formData[field.name] && (
                        <div key={field.id}>
                          <strong>{field.label}:</strong> {formData[field.name]} {field.unit && field.unit}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Files ({files.length})</h4>
                  <div className="text-sm text-muted-foreground">
                    {files.map((file, index) => (
                      <div key={index}>{file.name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={!canProceed()}
          >
            <Check className="w-4 h-4 mr-2" />
            Create Object
          </Button>
        )}
      </div>
    </div>
  );
}