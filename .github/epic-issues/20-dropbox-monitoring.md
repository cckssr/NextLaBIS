---
name: "§20 Dropbox Monitoring"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:admin", "status:backlog"]
---

# Overview

**Checklist section:** 20. Dropbox Monitoring
**Phase target:** phase 2, phase 3
**Domain:** domain:admin

## Goal

Provide a monitoring dashboard for openBIS dropbox data ingestion, showing incoming data directories, processing status, import logs, and error tracking.

## Scope

### In Scope

- Dropbox status dashboard overview
- Monitor incoming data directories
- Detailed import logs
- Error tracking and reporting
- Processing status per dropbox

### Out of Scope (deferred)

- Dropbox configuration / plugin management
- Automated alerting / notifications for failures

## Feature Breakdown

- [ ] Monitor incoming data directories (dropboxes)
- [ ] Dashboard overview of dropbox status
- [ ] Detailed import logs
- [ ] Error tracking and reporting
- [ ] View processing status per dropbox

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Dashboard shows real-time status of all configured dropboxes
- [ ] Import logs are searchable and filterable
- [ ] Errors are clearly highlighted with actionable details

## Dependencies

- §1 Authentication (admin access)
- §25 Server Administration (data store information)

## Notes

- Dropbox monitoring requires DSS API access — Phase 1 feature
- Relatively small epic — may be combined with §25 Server Administration
