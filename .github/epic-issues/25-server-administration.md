---
name: "§25 Server Administration"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:admin", "status:backlog"]
---

# Overview

**Checklist section:** 25. Server Administration
**Phase target:** phase 3
**Domain:** domain:admin

## Goal

Provide server administration interfaces for viewing server information, managing external data management systems, data store management, and generating active user reports.

## Scope

### In Scope

- Server version and configuration display
- Public server information (pre-login)
- Data store information
- Active users report (count, email delivery)
- External DMS CRUD
- Data store details and command queue monitoring

### Out of Scope (deferred)

- Server configuration editing (infrastructure concern)
- Log file viewing

## Feature Breakdown

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

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Server info page displays version and configuration accurately
- [ ] External DMS CRUD works correctly
- [ ] Active users report generates and can be emailed

## Dependencies

- §1 Authentication (admin access required)

## Notes

- Admin-only section — gate behind admin role check
- Consider combining with §20 Dropbox Monitoring for a unified admin dashboard
