---
name: "§18 Jupyter Notebook Integration"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:advanced", "status:backlog"]
---

# Overview

**Checklist section:** 18. Jupyter Notebook Integration
**Phase target:** phase 3
**Domain:** domain:advanced

## Goal

Integrate Jupyter notebooks into the openBIS UI, allowing users to launch, create from templates, copy, and view notebooks directly within the application, with seamless dataset linking and session management.

## Scope

### In Scope

- Launch Jupyter notebooks from openBIS
- Template-based notebook creation
- Copy existing notebooks
- Parameter/variable injection into notebooks
- Link notebooks to datasets
- Embedded Jupyter notebook viewer
- Jupyter session management
- Token-based authentication to Jupyter server

### Out of Scope (deferred)

- JupyterHub multi-user server management
- Custom Jupyter kernel management

## Feature Breakdown

- [ ] Launch Jupyter notebooks from openBIS
- [ ] Template-based notebook creation
- [ ] Copy existing notebooks
- [ ] Inject parameters/variables into notebooks
- [ ] Link notebooks to datasets
- [ ] Embedded Jupyter notebook viewer
- [ ] Jupyter session management
- [ ] Token-based authentication to Jupyter server

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Notebooks launch in embedded viewer or new tab
- [ ] Template-based creation populates notebooks with correct parameters
- [ ] Dataset links are bidirectional (notebook ↔ dataset)
- [ ] Session management handles multiple concurrent notebooks

## Dependencies

- §3 Core Entities (datasets linked to notebooks)
- §4 File Management (notebook files)
- §1 Authentication (token management)

## Notes

- Requires a running Jupyter server — Phase 2 feature
- Consider iframe-based embedding vs dedicated viewer component
- PyBIS integration for Python-side openBIS access within notebooks
