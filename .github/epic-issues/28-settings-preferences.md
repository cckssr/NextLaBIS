---
name: "§28 Settings & Preferences"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:api", "status:backlog"]
---

# Overview

**Checklist section:** 28. Settings & Preferences
**Phase target:** phase 2, phase 3
**Domain:** domain:api

## Goal

Implement user preferences, instance-wide settings, and per-application settings storage so users and admins can customise the UI behaviour, and settings persist across sessions.

## Scope

### In Scope

- User preferences (grid preferences, column visibility, search config, editor prefs, notification prefs, annotation visibility, inventory space config)
- Instance settings (app-wide display settings, custom widget config, group/space-specific settings, feature flags)
- WebApp settings (per-application storage and retrieval)

### Out of Scope (deferred)

- User preference import/export
- Settings backup/restore

## Feature Breakdown

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

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] User preferences persist across sessions (local storage + API)
- [ ] Instance settings are admin-only
- [ ] Settings changes take effect immediately without page reload

## Dependencies

- §1 Authentication (user context for preferences)
- §9 Data Grids (grid preference storage)

## Notes

- Phase 0: user preferences in local storage
- Phase 1: sync preferences via openBIS API (webapp settings)
- Feature flags can gate Phase 1/2 features that aren't ready yet
