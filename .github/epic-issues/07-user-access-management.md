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

## Feature Breakdown

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

## Dependencies

- §1 Authentication (session and role context)
- §3 Core Entities (space/project selectors for role scoping)

## Notes

- User management is admin-facing; profile page is available to all users
- Consider reusing the data grid component (§9) for user and group lists
