---
name: "§13 Plugins & Scripting"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:admin", "status:backlog"]
---

# Overview

**Checklist section:** 13. Plugins & Scripting
**Phase target:** phase 2, phase 3
**Domain:** domain:admin

## Goal

Provide interfaces for managing and executing openBIS server-side plugins including dynamic property plugins, entity validation plugins, custom AS services, aggregation services, reporting services, and processing services.

## Scope

### In Scope

- Dynamic property plugin CRUD (list, create, edit script, delete, test/evaluate)
- Entity validation plugin CRUD
- Custom AS service execution with parameters
- Aggregation service execution with tabular results
- Reporting service execution with tabular results
- Processing service execution on selected datasets (async)
- Jython code editor with syntax highlighting

### Out of Scope (deferred)

- Plugin development environment / debugging tools
- Plugin marketplace / sharing

## Feature Breakdown

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

## Dependencies

- §1 Authentication (admin access required)
- §3 Core Entities (plugins operate on entities)
- §5 Property System (dynamic property plugins)

## Notes

- Plugins require server-side execution — this is a Phase 1 feature
- Consider Monaco editor for the Jython code editor
