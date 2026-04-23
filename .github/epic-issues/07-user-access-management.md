---
name: "§7 User & Access Management"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:users", "status:backlog"]
---

# Overview

**Checklist section:** 7. User & Access Management
**Phase target:** phase 1, phase 2
**Domain:** domain:users

## Goal

Implement user management, authorization group management, and role assignment interfaces so administrators can manage users, groups, and permissions, and users can manage their own profiles.

## Scope

### In Scope

- User CRUD (list, create, edit, deactivate, delete)
- User profile (self-service: edit profile, change password, manage tokens)
- Authorization group CRUD
- Group membership management
- Role assignments (instance, space, project scopes)
- Role types: ADMIN, POWER_USER, USER, OBSERVER, ETL_SERVER
- Effective permissions display

### Out of Scope (deferred)

- LDAP/SSO integration configuration (infrastructure concern)
- PAT management (covered by §1 Authentication)

## Dependencies

- §1 Authentication (session and role context)
- §3 Core Entities (space/project selectors for role scoping)

## Notes

- User management is admin-facing; profile page is available to all users
- Consider reusing the data grid component (§9) for user and group lists
