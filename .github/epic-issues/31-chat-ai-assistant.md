---
name: "§31 Chat / AI Assistant"
about: A large initiative spanning multiple features (maps to a checklist section)
labels: ["type:epic", "domain:advanced", "status:backlog"]
---

# Overview

**Checklist section:** 31. Chat / AI Assistant
**Phase target:** phase 3
**Domain:** domain:advanced

## Goal

Integrate a contextual AI assistant into the openBIS UI that can help users with questions about UI features, provide intelligent guidance, and maintain session-based conversations.

## Scope

### In Scope

- Contextual help assistant (aware of current page/entity context)
- Question answering about UI features and openBIS concepts
- Session-based conversations
- Intelligent guidance and suggestions

### Out of Scope (deferred)

- AI-powered data analysis
- Natural language query execution
- Automated entity creation from natural language

## Feature Breakdown

- [ ] Contextual help assistant
- [ ] Ask questions about UI features
- [ ] Session-based conversations
- [ ] Intelligent guidance

## Acceptance Criteria

- [ ] All child feature issues closed
- [ ] Assistant provides relevant answers about UI features
- [ ] Conversation history persists within a session
- [ ] Assistant is context-aware (knows current page/entity)

## Dependencies

- §2 Navigation (context awareness requires knowing current location)
- §28 Settings (API key / configuration for AI service)

## Notes

- Phase 2 feature — requires LLM integration (API key, backend proxy)
- Consider a slide-out chat panel vs modal
- Context injection: pass current entity type, properties, and page to the LLM
