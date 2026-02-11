# openBIS New Web UI - Complete Feature Checklist

This document is a comprehensive checklist of every feature the new openBIS web UI should support, derived from analysis of the current Admin UI, ELN-LIMS UI, Java V3 API, Data Store Server, Screening module, core plugins, and Python API (PyBIS).

---

## 1. AUTHENTICATION & SESSION MANAGEMENT

- [ ] Login with username/password
- [ ] Login as another user (admin impersonation)
- [ ] Anonymous login (if enabled)
- [ ] Logout
- [ ] Session keep-alive / auto-refresh
- [ ] Session expiry handling and re-login prompt
- [ ] Display current session information (user, roles, login time)
- [ ] Personal Access Token (PAT) management
  - [ ] Create PATs with name, validity period, session expiry
  - [ ] List all PATs
  - [ ] Edit PAT settings
  - [ ] Revoke/delete PATs
  - [ ] View PAT last access information
- [ ] Active sessions overview (admin)

---

## 2. NAVIGATION & LAYOUT

### 2.1 Main Navigation Structure

- [ ] Tab-based or sidebar navigation with major sections:
  - [ ] Lab Notebook (ELN)
  - [ ] Inventory / LIMS
  - [ ] Database browser (Admin)
  - [ ] Types management
  - [ ] Users management
  - [ ] Tools / Utilities
- [ ] Breadcrumb navigation showing current hierarchy path
- [ ] Back/forward browser history support
- [ ] Multi-tab workspace (open multiple entities simultaneously)
  - [ ] Tab switching
  - [ ] Close tabs
  - [ ] Unsaved changes indicator per tab

### 2.2 Side Menu / Tree Browser

- [ ] Hierarchical tree navigation (Space > Project > Collection > Object > Dataset)
- [ ] Expand/collapse tree nodes
- [ ] Lazy loading of tree children
- [ ] Filter/search within tree
- [ ] Context menu on tree nodes (create, delete, move, etc.)
- [ ] Drag-and-drop in tree (move entities)

### 2.3 Responsive Layout

- [ ] Desktop layout (multi-column)
- [ ] Tablet layout adaptation
- [ ] Mobile layout adaptation
- [ ] Full-screen / focus mode
- [ ] Resizable panels (tree vs. content)

---

## 3. ENTITY MANAGEMENT - CORE ENTITIES

### 3.1 Spaces

- [ ] List all spaces
- [ ] Create space (code, description)
- [ ] Edit space (description)
- [ ] Delete space (with confirmation)
- [ ] View space details (projects, samples, metadata)
- [ ] Freeze space (make immutable)
  - [ ] Freeze for projects
  - [ ] Freeze for samples
- [ ] Search spaces

### 3.2 Projects

- [ ] List projects (within space or globally)
- [ ] Create project (code, description, space assignment)
- [ ] Edit project (description, space reassignment)
- [ ] Delete project (with confirmation)
- [ ] View project details (experiments, samples, metadata)
- [ ] Move project between spaces
- [ ] Search projects

### 3.3 Experiments / Collections

- [ ] List experiments (within project or globally)
- [ ] Create experiment (code, type, project assignment)
- [ ] Edit experiment properties
- [ ] Delete experiment (trackable, goes to trash)
- [ ] View experiment details (samples, datasets, properties)
- [ ] Move experiment between projects
- [ ] Freeze experiment
  - [ ] Freeze for samples
  - [ ] Freeze for datasets
- [ ] Search experiments by type, properties, project, space
- [ ] Pagination through experiment collections

### 3.4 Samples / Objects

- [ ] List samples (within experiment, project, space, or globally)
- [ ] Create sample (code, type, space/project/experiment assignment)
- [ ] Edit sample properties
- [ ] Delete sample (trackable, goes to trash)
- [ ] View sample details (properties, datasets, parents, children, components)
- [ ] Move sample between spaces/projects/experiments
- [ ] Manage parent-child relationships
  - [ ] Add/remove parents
  - [ ] Add/remove children
  - [ ] View parent hierarchy
  - [ ] View child hierarchy
- [ ] Manage container-component relationships
  - [ ] Assign sample to container
  - [ ] Add components to sample
  - [ ] Remove components
- [ ] Relationship annotations (quality, metadata on links)
- [ ] Freeze sample
  - [ ] Freeze for components
  - [ ] Freeze for children
  - [ ] Freeze for parents
  - [ ] Freeze for datasets
- [ ] Search samples by type, properties, relationships, space, project
- [ ] Batch sample operations
- [ ] Pagination through sample tables
- [ ] Sample form with sections and dynamic property layout
- [ ] Auto-save support on sample forms
- [ ] Show in project overview toggle

### 3.5 Datasets

- [ ] List datasets (within sample, experiment, or globally)
- [ ] Create dataset (code, type, sample/experiment assignment)
- [ ] Edit dataset properties
- [ ] Delete dataset (trackable, goes to trash)
- [ ] View dataset details (properties, files, metadata)
- [ ] Dataset kinds:
  - [ ] Physical datasets (files stored in DSS)
  - [ ] Link datasets (external references)
  - [ ] Container datasets (grouping)
- [ ] Manage parent-child relationships for datasets
- [ ] Manage container-component relationships for datasets
- [ ] Archive dataset
- [ ] Unarchive dataset
- [ ] Lock/unlock dataset
- [ ] View archive status (available, archived, archive pending, unarchive pending)
- [ ] Freeze dataset
  - [ ] Freeze for children
  - [ ] Freeze for parents
  - [ ] Freeze for components
  - [ ] Freeze for containers
- [ ] Search datasets by type, properties, sample, experiment
- [ ] View dataset registration/modification metadata

### 3.6 Materials (Legacy)

- [ ] List materials
- [ ] Create material (code, type)
- [ ] Edit material properties
- [ ] Delete material
- [ ] Search materials
- [ ] Material property references in other entities

---

## 4. FILE MANAGEMENT

### 4.1 File Browser

- [ ] Browse files within a dataset (directory tree)
- [ ] View file metadata (size, type, modification date)
- [ ] File type detection and icon display
- [ ] Grid view and list view modes
- [ ] Sort files by name, size, date, type
- [ ] Filter files within dataset

### 4.2 File Download

- [ ] Single file download
- [ ] Multiple file download as ZIP
- [ ] Download entire dataset as ZIP
- [ ] Download progress tracking
- [ ] Download cancellation
- [ ] Retry on failure
- [ ] Fast download (optimized bulk download)
- [ ] Streaming download for large files

### 4.3 File Upload

- [ ] Upload files to dataset
- [ ] Drag-and-drop upload
- [ ] Browse & select files
- [ ] Multiple file upload
- [ ] Upload progress tracking
- [ ] File conflict detection (overwrite confirmation)
- [ ] Session workspace (temporary upload area)
- [ ] Auto-upload on dataset creation

### 4.4 File Preview

- [ ] Image preview (PNG, JPG, GIF, SVG, TIFF)
- [ ] PDF preview
- [ ] Text/code file preview with syntax highlighting
- [ ] CSV/TSV tabular preview
- [ ] HDF5 file content browsing
- [ ] Video preview (MP4, AVI, MOV)
- [ ] Audio preview (MP3, WAV)

---

## 5. PROPERTY SYSTEM

### 5.1 Property Types

- [ ] View all property types
- [ ] Create property type
  - [ ] Code and label
  - [ ] Description
  - [ ] Data type selection:
    - [ ] VARCHAR (short text)
    - [ ] MULTILINE_VARCHAR (long text)
    - [ ] BOOLEAN
    - [ ] INTEGER
    - [ ] REAL (decimal)
    - [ ] TIMESTAMP (date/time)
    - [ ] CONTROLLEDVOCABULARY (dropdown)
    - [ ] MATERIAL (material reference)
    - [ ] SAMPLE (sample reference)
    - [ ] HYPERLINK (URL)
    - [ ] XML
    - [ ] JSON
  - [ ] Vocabulary assignment (for CONTROLLEDVOCABULARY type)
  - [ ] Validation constraints (min, max, regex pattern)
- [ ] Edit property type
- [ ] Delete property type
- [ ] Search property types

### 5.2 Property Assignment to Entity Types

- [ ] Assign property to entity type
- [ ] Set mandatory/optional
- [ ] Set show in edit view
- [ ] Set section name (group properties into sections)
- [ ] Set ordinal (display order)
- [ ] Reorder properties
- [ ] Remove property from entity type
- [ ] Semantic annotations per property assignment

### 5.3 Property Rendering in Forms

- [ ] Text input fields
- [ ] Multiline text areas
- [ ] Rich text editor (CKEditor/equivalent) for multiline with formatting
- [ ] Date/time pickers
- [ ] Dropdown selects (for controlled vocabularies)
- [ ] Boolean toggles/switches
- [ ] Numeric inputs (integer and decimal)
- [ ] Hyperlink fields
- [ ] Sample picker/reference fields
- [ ] Material picker/reference fields
- [ ] JSON editor
- [ ] XML editor
- [ ] Dynamic rendering based on property type configuration

---

## 6. TYPE MANAGEMENT

### 6.1 Sample Types (Object Types)

- [ ] List all sample types
- [ ] Create sample type (code, description, validation plugin, auto-generated codes)
- [ ] Edit sample type
- [ ] Delete sample type
- [ ] Manage assigned properties (add, remove, reorder, configure)
- [ ] Manage sections (group properties into visual sections)
- [ ] Preview form layout
- [ ] Semantic annotations on sample type
- [ ] Assign to type group

### 6.2 Experiment Types (Collection Types)

- [ ] List all experiment types
- [ ] Create experiment type
- [ ] Edit experiment type
- [ ] Delete experiment type
- [ ] Manage assigned properties
- [ ] Semantic annotations

### 6.3 Dataset Types

- [ ] List all dataset types
- [ ] Create dataset type
- [ ] Edit dataset type
- [ ] Delete dataset type
- [ ] Manage assigned properties

### 6.4 Material Types

- [ ] List all material types
- [ ] Create material type
- [ ] Edit material type
- [ ] Delete material type
- [ ] Manage assigned properties

### 6.5 Type Groups

- [ ] List all type groups
- [ ] Create type group
- [ ] Edit type group
- [ ] Delete type group
- [ ] Assign/unassign entity types to groups

### 6.6 Vocabulary Management

- [ ] List all vocabularies
- [ ] Create vocabulary (code, description)
- [ ] Edit vocabulary
- [ ] Delete vocabulary
- [ ] Manage vocabulary terms:
  - [ ] Add term (code, label, description)
  - [ ] Edit term
  - [ ] Delete term
  - [ ] Reorder terms
  - [ ] Mark term as official
  - [ ] Mark term as internal (deprecated)
  - [ ] View term registrator and registration date

---

## 7. USER & ACCESS MANAGEMENT

### 7.1 User Management

- [ ] List all users
- [ ] Create user (userId, first name, last name, email)
- [ ] Edit user profile
- [ ] Deactivate/activate user
- [ ] Delete user
- [ ] View user's group memberships
- [ ] View user's role assignments
- [ ] Search users
- [ ] Password reset (self and admin-triggered)
- [ ] User profile page (self-service)
  - [ ] Edit own profile information
  - [ ] Change password
  - [ ] Manage own API tokens

### 7.2 Authorization Groups

- [ ] List all groups
- [ ] Create group (code, description)
- [ ] Edit group
- [ ] Delete group
- [ ] Add/remove users from group
- [ ] View group members
- [ ] View group role assignments
- [ ] Search groups

### 7.3 Role Assignments

- [ ] View all role assignments
- [ ] Create role assignment
  - [ ] Assign role to user or group
  - [ ] Role types: ADMIN, POWER_USER, USER, OBSERVER, ETL_SERVER
  - [ ] Scope levels: Instance, Space, Project
  - [ ] Space/project selector for scoped roles
- [ ] Edit role assignment
- [ ] Delete role assignment
- [ ] Rights checking (CREATE, UPDATE, DELETE per entity)
- [ ] Display current user's effective permissions

---

## 8. SEARCH & DISCOVERY

### 8.1 Global Search

- [ ] Global search bar (search across all entity types)
- [ ] Full-text search across all indexed entities
- [ ] Search result grouping by entity type
- [ ] Navigate to search results
- [ ] Search suggestions / autocomplete

### 8.2 Advanced Search

- [ ] Search by entity type (space, project, experiment, sample, dataset)
- [ ] Search by code / permId / identifier
- [ ] Search by property values (any property, specific property)
- [ ] Search by string properties
- [ ] Search by numeric properties (with comparison operators)
- [ ] Search by boolean properties
- [ ] Search by date properties (with date range)
- [ ] Search by controlled vocabulary property
- [ ] Search by sample property (reference)
- [ ] Search by registration date range
- [ ] Search by modification date range
- [ ] Search by registrator/modifier
- [ ] Search by parent/child relationships
- [ ] Search by container/component relationships
- [ ] Search by experiment/project/space
- [ ] Search by tag
- [ ] Combine criteria with AND/OR operators
- [ ] Negate criteria (NOT)
- [ ] Saved searches
- [ ] Search history

### 8.3 Search Domain Services

- [ ] Execute search domain services (external search integrations)
- [ ] Display search domain results

---

## 9. DATA GRIDS & TABLES

- [ ] Display entities in sortable data grids
- [ ] Column management:
  - [ ] Show/hide columns
  - [ ] Reorder columns
  - [ ] Resize columns
  - [ ] Save column preferences per user
- [ ] Filtering:
  - [ ] Filter by column values
  - [ ] Multi-criteria filtering
  - [ ] Global filter across all visible columns
  - [ ] Save filter preferences
- [ ] Sorting:
  - [ ] Sort by any column
  - [ ] Multi-column sorting
  - [ ] Ascending/descending toggle
- [ ] Selection:
  - [ ] Single row selection
  - [ ] Multi-row selection (checkboxes)
  - [ ] Select all
  - [ ] Bulk operations on selected rows
- [ ] Pagination:
  - [ ] Configurable page size
  - [ ] Page navigation
  - [ ] Total count display
- [ ] Export grid data:
  - [ ] Export to CSV
  - [ ] Export to TSV
  - [ ] Export filtered/sorted data
  - [ ] Export all columns or visible only
- [ ] Grid settings persistence (per user, per entity type)

---

## 10. IMPORT & EXPORT

### 10.1 Data Import

- [ ] General import (ImportData API)
  - [ ] Update mode selection (ignore existing, update if exists, fail on existing)
  - [ ] File upload interface for import data
  - [ ] Import validation and error reporting
  - [ ] Import results display (success/error counts)
- [ ] Excel/XLS import (xls-import plugin)
  - [ ] Upload XLS/XLSX file
  - [ ] Parse and preview import data
  - [ ] Map columns to entity properties
  - [ ] Bulk entity creation from spreadsheet
- [ ] CSV import
- [ ] Custom import (dropbox-based)
  - [ ] File upload to dropbox
  - [ ] Monitor import status

### 10.2 Data Export

- [ ] General export (ExportData API)
- [ ] Hierarchical export (select entities and children)
  - [ ] Export format selection: PDF, XLSX, JSON
  - [ ] Email-based delivery option
  - [ ] Import-compatible export mode
  - [ ] Select parent/child depth levels
- [ ] RO-Crate export
  - [ ] Export datasets as RO-Crate packages
  - [ ] Include metadata and schema.org annotations
  - [ ] Async export with progress tracking
- [ ] RO-Crate import
  - [ ] Import RO-Crate packages into openBIS
  - [ ] Validation report display
- [ ] Grid/table data export (CSV, TSV)
- [ ] Query results export
- [ ] Research collection export
  - [ ] Submission type configuration
  - [ ] Retention period setting
  - [ ] Group-based filtering
- [ ] Zenodo integration
  - [ ] Configure Zenodo API token
  - [ ] Publish data to Zenodo
  - [ ] Export metadata and files

---

## 11. TRASH & DELETION MANAGEMENT

- [ ] View trashcan (all soft-deleted entities)
- [ ] Display deletion details (entity type, code, date, user, reason)
- [ ] Restore (revert) single deleted entity
- [ ] Permanently delete single entity
- [ ] Permanently delete with dependent entities (cascade)
- [ ] Empty entire trashcan
- [ ] Confirm permanent deletion with safety dialog
- [ ] Search/filter within trash
- [ ] Deletion reason input on delete

---

## 12. HISTORY & AUDIT

### 12.1 Entity History

- [ ] View change history for any entity
- [ ] Property change history (old value -> new value)
- [ ] Relationship change history (parents, children, container)
- [ ] Space/project/experiment assignment history
- [ ] User attribution for each change
- [ ] Timestamp for each change
- [ ] Version comparison

### 12.2 Deletion History

- [ ] View log of all deletion events
- [ ] Filter by entity type, date range, user
- [ ] Grid display with entity type, code, deletion date, user, reason

### 12.3 Freezing History

- [ ] View log of all freezing events
- [ ] Grid display with entity type, code, freeze date, user

### 12.4 Event Log

- [ ] Search events (deletion, movement, etc.)
- [ ] Event details (entity, type, timestamp, user, reason)

---

## 13. PLUGINS & SCRIPTING

### 13.1 Dynamic Property Plugins

- [ ] List all dynamic property plugins
- [ ] Create plugin (name, description, script)
- [ ] Edit plugin script (Jython code editor with syntax highlighting)
- [ ] Delete plugin
- [ ] Test/evaluate plugin with parameters
- [ ] View evaluation results
- [ ] Assign plugin to entity type properties

### 13.2 Entity Validation Plugins

- [ ] List all validation plugins
- [ ] Create validation plugin
- [ ] Edit validation plugin script
- [ ] Delete validation plugin
- [ ] Test/evaluate validation plugin
- [ ] Assign to entity types

### 13.3 Custom AS Services

- [ ] List available custom AS services
- [ ] Execute custom AS service with parameters
- [ ] Display service execution results

### 13.4 Aggregation Services

- [ ] List available aggregation services
- [ ] Execute aggregation service with parameters
- [ ] Display results as table

### 13.5 Reporting Services

- [ ] List available reporting services
- [ ] Execute reporting service with parameters
- [ ] Display report as table

### 13.6 Processing Services

- [ ] List available processing services
- [ ] Execute processing service on selected datasets
- [ ] Track processing status (async)

---

## 14. QUERY SYSTEM

- [ ] List all saved queries
- [ ] Create query (name, description, SQL, database selection)
- [ ] Edit query
- [ ] Delete query
- [ ] SQL editor with syntax highlighting
- [ ] Define query parameters (name, type, description)
- [ ] Execute query with parameter input form
- [ ] Display results in data grid
- [ ] Paginate query results
- [ ] Sort query results by column
- [ ] Export query results (CSV, TSV)
- [ ] Direct SQL execution (admin only)

---

## 15. STORAGE MANAGEMENT (LIMS)

- [ ] Storage browser (hierarchical storage visualization)
- [ ] Define storage units (freezers, racks, shelves, boxes)
- [ ] Grid-based storage layout visualization (rack positions, box positions)
- [ ] Assign samples to storage positions
- [ ] Drag-and-drop sample placement in storage grid
- [ ] View sample at position (click to navigate)
- [ ] Storage position validation (detect conflicts/duplicates)
- [ ] Multiple storage property groups per sample
- [ ] Box management within storage units
- [ ] User assignment to storage positions
- [ ] Print storage labels

---

## 16. ELN-SPECIFIC FEATURES

### 16.1 Lab Notebook Interface

- [ ] Dedicated lab notebook browsing mode
- [ ] Space > Project > Experiment hierarchy for organizing notebooks
- [ ] Rich text editor for experiment notes (CKEditor or equivalent)
  - [ ] Text formatting (bold, italic, headers, lists)
  - [ ] Greek character insertion (scientific notation)
  - [ ] Image embedding
  - [ ] Table creation
  - [ ] Code blocks
  - [ ] Link insertion
- [ ] Comments system on entities
  - [ ] Add timestamped comments
  - [ ] View comment thread
  - [ ] Delete comments
  - [ ] User attribution

### 16.2 Templates

- [ ] Template types for entity creation
- [ ] ELN master data initialization
- [ ] Pre-defined sample type configurations for common lab workflows

### 16.3 Drawing Board / Sketches

- [ ] Canvas-based drawing tool
- [ ] Create and save sketches/diagrams
- [ ] Attach drawings to experiments/samples

### 16.4 Free-Form Tables

- [ ] Create custom tables within entities
- [ ] Dynamically add rows and columns
- [ ] Edit cell values inline
- [ ] Mini view and detailed view modes
- [ ] JSON-based persistence
- [ ] Spreadsheet-like editing (JExcel integration)

### 16.5 Dilution Tables

- [ ] Dilution series calculation and management
- [ ] Concentration tracking

### 16.6 Barcode / QR Code Support

- [ ] Generate barcodes/QR codes for entities
- [ ] Display barcodes in data grids
- [ ] Scan barcodes with physical scanner (keyboard input)
- [ ] Scan QR codes with camera
- [ ] Look up entities by barcode scan

---

## 17. PRODUCT ORDERING (LIMS)

- [ ] Product catalog browsing
- [ ] Create new product entries
- [ ] Product fields: name, catalog number, provider/vendor, price, currency, quantity
- [ ] Submit orders/requests
- [ ] Order tracking
- [ ] Auto-generate product codes

---

## 18. JUPYTER NOTEBOOK INTEGRATION

- [ ] Launch Jupyter notebooks from openBIS
- [ ] Template-based notebook creation
- [ ] Copy existing notebooks
- [ ] Inject parameters/variables into notebooks
- [ ] Link notebooks to datasets
- [ ] Embedded Jupyter notebook viewer
- [ ] Jupyter session management
- [ ] Token-based authentication to Jupyter server

---

## 19. IMAGING & VISUALIZATION

### 19.1 Image Gallery

- [ ] Grid view of images in a dataset
- [ ] Thumbnail generation and display
- [ ] Image metadata display
- [ ] Navigate between images (next/previous)
- [ ] Image zoom controls
- [ ] Slideshow mode
- [ ] Editable image metadata
- [ ] Semantic annotations on images

### 19.2 Screening / Plate Management

- [ ] Plate listing (all plates, per experiment)
- [ ] Plate layout visualization (grid of wells)
- [ ] Well detail view
- [ ] Plate-well-material mapping
- [ ] Image datasets per well
  - [ ] Load well images (base64)
  - [ ] Multiple image channels
  - [ ] Multiple resolutions
  - [ ] Thumbnail previews
  - [ ] Physical thumbnails
  - [ ] Image representation format selection
- [ ] Feature vector analysis
  - [ ] List available feature codes
  - [ ] Load feature vectors for wells
  - [ ] Feature vector visualization
  - [ ] Feature dataset references
- [ ] Experiment-level image metadata

### 19.3 Data Visualization

- [ ] Tabular data graph rendering
- [ ] Image analysis graph reporting
- [ ] Dataset image overview
- [ ] Chart/graph generation from data

---

## 20. DROPBOX MONITORING

- [ ] Monitor incoming data directories (dropboxes)
- [ ] Dashboard overview of dropbox status
- [ ] Detailed import logs
- [ ] Error tracking and reporting
- [ ] View processing status per dropbox

---

## 21. ARCHIVING MANAGEMENT

- [ ] Archive helper workflow
- [ ] Submit archive requests
- [ ] Track archive status
- [ ] Unarchive helper workflow
- [ ] Submit unarchive requests
- [ ] Track unarchive progress
- [ ] View archive/unarchive queue
- [ ] Bulk archive/unarchive operations

---

## 22. SEMANTIC ANNOTATIONS

- [ ] Add semantic annotations to entity types
- [ ] Add semantic annotations to property assignments
- [ ] Ontology predicate and descriptor fields
- [ ] Annotation management interface (add, edit, delete)
- [ ] Display annotations on type definitions
- [ ] Display annotations on entity forms
- [ ] Schema.org integration support

---

## 23. TAGS / METAPROJECTS

- [ ] Create tags
- [ ] Assign tags to entities (samples, datasets, experiments)
- [ ] Remove tags from entities
- [ ] Browse/filter entities by tag
- [ ] Delete tags
- [ ] Search by tag

---

## 24. OPERATION EXECUTION (ASYNC)

- [ ] Execute batch operations asynchronously
- [ ] Track operation execution status
- [ ] View operation results
- [ ] Cancel pending operations
- [ ] Operation execution history
- [ ] Update operation execution details

---

## 25. SERVER ADMINISTRATION

### 25.1 Server Information

- [ ] Display server version and configuration
- [ ] Display public server information (pre-login)
- [ ] View data store information
- [ ] Active users report
  - [ ] Generate active user count
  - [ ] Send report via email

### 25.2 External Data Management Systems

- [ ] List external DMS
- [ ] Create external DMS reference
- [ ] Edit external DMS
- [ ] Delete external DMS

### 25.3 Data Store Management

- [ ] List data stores
- [ ] View data store details
- [ ] Command queue monitoring

---

## 26. FORMS & INPUT VALIDATION

### 26.1 Form Features

- [ ] View mode (read-only display)
- [ ] Edit mode (inline editing)
- [ ] Create mode (new entity form)
- [ ] Auto-save with dirty state detection
- [ ] Form validation (real-time feedback)
  - [ ] Required field validation
  - [ ] Data type validation
  - [ ] Custom validation rules (via plugins)
  - [ ] Regex pattern validation
  - [ ] Min/max value validation
- [ ] Conflict detection (concurrent edits)
- [ ] Conflict resolution dialog
- [ ] Unsaved changes warning on navigation
- [ ] Form reset/cancel

### 26.2 Dialog System

- [ ] Confirmation dialogs (delete, move, archive)
- [ ] Input dialogs (move entity, set parameters)
- [ ] Result dialogs (operation success/failure)
- [ ] Error detail dialogs
- [ ] File management dialogs (upload, download, conflict)

---

## 27. NOTIFICATIONS & FEEDBACK

- [ ] Toast notifications (success, error, warning, info)
- [ ] Auto-dismiss or persistent notifications
- [ ] Loading spinners for async operations
- [ ] Progress bars for file uploads/downloads
- [ ] Blocking overlay during critical operations
- [ ] Error messages with details/stack traces
- [ ] Operation success confirmation

---

## 28. SETTINGS & PREFERENCES

### 28.1 User Preferences

- [ ] Display settings (grid preferences, column visibility)
- [ ] Default search configuration
- [ ] Rich text editor preferences
- [ ] Spreadsheet widget settings
- [ ] Notification preferences
- [ ] Semantic annotation visibility toggle
- [ ] Inventory space configuration

### 28.2 Instance Settings

- [ ] Application-wide display settings
- [ ] Custom widget configuration
- [ ] Group settings management
- [ ] Space-specific settings
- [ ] Feature flag configuration

### 28.3 WebApp Settings

- [ ] Per-application settings storage and retrieval

---

## 29. PLUGIN-SPECIFIC FEATURES

### 29.1 XLS Import Plugin

- [ ] Upload Excel files for bulk data import
- [ ] Parse and validate spreadsheet data
- [ ] Map spreadsheet columns to openBIS properties
- [ ] Bulk create entities from spreadsheet

### 29.2 Imaging Technology Plugin

- [ ] Image analysis pipeline
- [ ] Feature extraction from images
- [ ] Image processing services
- [ ] Imaging-specific sample/dataset handling

### 29.3 Nanonis (SPM) Imaging Plugin

- [ ] Import scanning probe microscopy data
- [ ] SPM file format support (Nanonis)
- [ ] SPM data analysis tools
- [ ] SPM data visualization

### 29.4 Dataset Uploader Plugin

- [ ] Dedicated dataset upload API/service
- [ ] File upload workflow

### 29.5 Dataset File Search Plugin

- [ ] Full-text search within dataset files
- [ ] File content indexing

### 29.6 OpenBIS Sync Plugin

- [ ] Cross-instance data synchronization
- [ ] Resource-sync protocol support
- [ ] Sync status monitoring

---

## 30. EXTERNAL DATA & INTEGRATION

### 30.1 External Data Repositories

- [ ] Link datasets to external locations
- [ ] External DMS management
- [ ] Content copy tracking

### 30.2 Git Integration (obis CLI support)

- [ ] Git-backed dataset management
- [ ] Git-annex large file support
- [ ] Repository initialization and configuration
- [ ] Dataset cloning and syncing

### 30.3 Research Collection / Publication

- [ ] Research collection management
- [ ] Submission type configuration
- [ ] Retention period settings
- [ ] Zenodo publication integration
- [ ] DOI assignment support

---

## 31. CHAT / AI ASSISTANT

- [ ] Contextual help assistant
- [ ] Ask questions about UI features
- [ ] Session-based conversations
- [ ] Intelligent guidance

---

## 32. MOVE OPERATIONS

- [ ] Move sample between spaces/projects/experiments
- [ ] Move experiment between projects
- [ ] Move project between spaces
- [ ] Cross-hierarchy relocation
- [ ] Parent reference update on move
- [ ] Move confirmation dialog
- [ ] Bulk move operations

---

## 33. HIERARCHY VISUALIZATION

- [ ] Parent-child relationship tree view
- [ ] Expandable/collapsible hierarchy
- [ ] Hierarchy filter by entity type
- [ ] Hierarchy depth control
- [ ] Navigate to any entity in hierarchy

---

## 34. PRINT FUNCTIONALITY

- [ ] Print entity details
- [ ] Print sample lists
- [ ] Print storage labels
- [ ] Print barcodes/QR codes
- [ ] Print-friendly formatting

---

## 35. THEMING & ACCESSIBILITY

- [ ] Material Design / consistent component library
- [ ] Light mode
- [ ] Dark mode
- [ ] Keyboard navigation support
- [ ] Screen reader support (ARIA labels)
- [ ] Focus management
- [ ] High contrast mode

---

## 36. IDENTIFIER & CODE MANAGEMENT

- [ ] Auto-generate permanent IDs (permId)
- [ ] Auto-generate entity codes (with prefix)
- [ ] Hierarchical identifier display (/SPACE/PROJECT/SAMPLE)
- [ ] Copy identifier/permId to clipboard
- [ ] Navigate by identifier

---

## 37. ATTACHMENT MANAGEMENT (LEGACY)

- [ ] Upload attachments to entities (experiments, samples, projects)
- [ ] Download attachments
- [ ] View attachment list
- [ ] Delete attachments
- [ ] Attachment versioning

---

## 38. OBJECT KIND MODIFICATION TRACKING

- [ ] Track modifications by object kind (entity type)
- [ ] Last modification timestamp per kind
- [ ] Use for cache invalidation / incremental loading

---

## Summary Statistics

| Category                             | Feature Count |
| ------------------------------------ | ------------- |
| Authentication & Sessions            | 15            |
| Navigation & Layout                  | 25            |
| Core Entity CRUD (6 entity types)    | 80+           |
| File Management                      | 30            |
| Property System                      | 25            |
| Type Management                      | 35            |
| User & Access Management             | 30            |
| Search & Discovery                   | 30            |
| Data Grids & Tables                  | 20            |
| Import & Export                      | 25            |
| Trash & Deletion                     | 10            |
| History & Audit                      | 15            |
| Plugins & Scripting                  | 20            |
| Query System                         | 12            |
| Storage Management (LIMS)            | 12            |
| ELN-Specific Features                | 25            |
| Product Ordering                     | 6             |
| Jupyter Integration                  | 8             |
| Imaging & Visualization              | 25            |
| Dropbox Monitoring                   | 5             |
| Archiving                            | 8             |
| Semantic Annotations                 | 7             |
| Tags                                 | 6             |
| Async Operations                     | 6             |
| Server Administration                | 8             |
| Forms & Validation                   | 15            |
| Notifications & Feedback             | 7             |
| Settings & Preferences               | 12            |
| Plugin-Specific Features             | 12            |
| External Data & Integration          | 8             |
| Other (Move, Print, Hierarchy, etc.) | 20            |
| **TOTAL**                            | **~600+**     |
