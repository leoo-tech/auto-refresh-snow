# AGENTS.md

# ServiceNow Monitor | Agent Guidelines

## 1. Project Overview

ServiceNow Monitor is a lightweight JavaScript Bookmarklet designed to assist N1 operations analysts in monitoring incident queues within ServiceNow.

The project aims to reduce the time required to identify newly generated incidents that have not yet been assigned to an analyst.

The solution follows a **Plug-and-Play** philosophy: any authorized team member should be able to import the bookmarklet, execute it from the browser favorites bar, and use its features without programming knowledge.

### Operational context

The incident generation workflow is:

1. SolarWinds Orion monitors infrastructure devices.
2. Orion identifies monitoring alerts.
3. The Orion-ServiceNow integration generates incidents.
4. New incidents become available in the ServiceNow queue.
5. Analysts identify and take ownership of incidents.

ServiceNow Monitor operates at the ServiceNow queue level.

**Important:** Orion's native refresh functionality does not replace the need to refresh the ServiceNow incident queue. The bookmarklet must continue supporting ServiceNow queue refresh.

---

## 2. Repository Structure

The current repository intentionally uses a simple structure:

```text
auto-refresh-snow/
├── README.md
├── AGENTS.md
└── auto_refresh_snow.js
```

### File responsibilities

| File | Responsibility |
|---|---|
| `README.md` | Project documentation, objectives, architecture and roadmap |
| `AGENTS.md` | Instructions and development guidelines for AI agents |
| `auto_refresh_snow.js` | Main JavaScript Bookmarklet implementation |

Do not introduce additional directories, dependencies, build systems, or architectural complexity unless explicitly justified by project requirements.

Preserve the current repository structure unless the project owner approves a change.

---

## 3. Core Objective

The primary monitoring condition is:

- `State = New`
- `Assigned to = Empty`

Both conditions must be true for an incident to be considered eligible for notification.

The monitor must identify incidents that are available in the ServiceNow queue but have not yet been assigned to an analyst.

### Operational distinction

The project focuses on reducing incident pickup time.

It does not manage incident resolution, modify SLA records, or replace the analyst's operational responsibilities.

---

## 4. Development Philosophy

All development decisions must follow these principles.

### 4.1 Plug-and-Play

The solution must be easy to install and use.

Expected user workflow:

1. Import the bookmarklet into the browser.
2. Open the ServiceNow incident queue.
3. Execute the bookmarklet from browser favorites.
4. Use the visual control panel.

Normal operation must not require:

- Browser developer tools.
- JavaScript console commands.
- Manual code editing.
- External browser extensions.
- Technical knowledge of JavaScript.

### 4.2 Modular Design

Even if the implementation remains in a single JavaScript file, organize the code into logically independent components.

Prefer clear separation of responsibilities:

- Core initialization.
- Queue monitoring.
- Queue refresh.
- Alert management.
- User interface.
- Configuration.
- Logging and diagnostics.

Avoid unnecessary coupling between components.

### 4.3 User-Centered Development

The primary users are operations analysts, not software developers.

Interface labels, notifications, error messages, and controls must be understandable to non-technical users.

Prefer simple language and predictable behavior.

### 4.4 Incremental Evolution

Improve the existing implementation rather than replacing working functionality without justification.

Before changing behavior:

1. Understand the current implementation.
2. Identify the problem.
3. Evaluate the impact.
4. Propose the smallest effective change.
5. Preserve existing functionality.
6. Validate the result.

---

## 5. Functional Requirements

The following features define the expected behavior of the monitor.

### Monitoring controls

- Start monitoring.
- Pause monitoring.
- Stop monitoring.
- Execute a manual check.
- Display current monitoring status.
- Configure the refresh interval.

### Queue refresh

The bookmarklet must:

1. Locate the ServiceNow queue.
2. Refresh the queue.
3. Wait for the refresh operation to complete or time out safely.
4. Inspect the updated content.
5. Evaluate the incident conditions.

Avoid overlapping refresh operations.

Do not assume that the queue is always available in `window.frames[0]`. Validate the actual page structure before changing frame-selection logic.

### Incident detection

The monitor must identify records where:

```text
State = New
Assigned to = Empty
```

Do not rely permanently on broad text searches if the actual table structure can be identified.

Prefer reading the corresponding fields from individual incident records.

### Notifications

Notifications should:

- Be visible and understandable.
- Avoid unnecessary repetition.
- Identify when a new eligible incident is detected.
- Respect browser notification permissions.
- Never modify the incident.

Where possible, identify incidents individually using their incident number rather than relying only on a global Boolean state.

### Logging

Provide enough information to diagnose failures without exposing sensitive operational information.

Logs should help distinguish:

- Monitoring started.
- Monitoring paused.
- Monitoring stopped.
- Queue refreshed.
- Queue unavailable.
- Detection completed.
- Eligible incident detected.
- Notification permission unavailable.
- Refresh or inspection error.

---

## 6. Technical Guidelines

### JavaScript

- Prefer readable and maintainable JavaScript.
- Use descriptive variable and function names.
- Avoid unnecessary global variables.
- Avoid duplicated logic.
- Validate user-provided configuration.
- Handle exceptions explicitly.
- Avoid unnecessary external dependencies.
- Keep the Bookmarklet compatible with the organization's supported browsers.

### Bookmarklet compatibility

The final implementation must remain executable as a browser bookmarklet.

Consider:

- JavaScript URL length limitations.
- Browser security restrictions.
- Same-origin policy.
- Frame accessibility.
- Notification permissions.
- ServiceNow page navigation and reload behavior.

Do not assume that successful execution in one browser guarantees compatibility in every browser.

### Performance

- Avoid excessive refresh frequency.
- Prevent overlapping timers and reloads.
- Avoid unnecessary DOM scans.
- Stop scheduled operations when monitoring is stopped.
- Ensure that restarting the monitor does not create duplicate execution loops.

---

## 7. Security and Operational Boundaries

This project is intended for authorized internal operational use.

The bookmarklet must remain a monitoring assistant.

### Prohibited behavior

Do not implement functionality that automatically:

- Assigns incidents.
- Changes incident states.
- Closes incidents.
- Modifies work notes.
- Changes SLA information.
- Executes administrative actions.
- Bypasses authentication or access controls.

Do not introduce:

- Credential collection or storage.
- Session token extraction.
- Unauthorized API calls.
- External transmission of corporate information.
- Hidden tracking.
- Unapproved browser extensions.

Any functionality that interacts with internal systems beyond the existing read-only monitoring behavior requires explicit authorization.

Do not include real incident numbers, employee names, customer information, internal URLs, credentials, or other sensitive operational data in public documentation or test examples.

---

## 8. AI Agent Behavior

Any AI agent working on this repository must follow these instructions.

### Before making changes

1. Read `README.md`.
2. Read `AGENTS.md`.
3. Inspect the current `auto_refresh_snow.js`.
4. Understand the existing implementation before proposing modifications.
5. Identify dependencies and possible side effects.

### During development

- Preserve existing working features.
- Keep the implementation understandable to future maintainers.
- Avoid unnecessary rewrites.
- Do not invent ServiceNow DOM selectors.
- Do not assume undocumented ServiceNow behavior.
- Clearly distinguish confirmed behavior from assumptions.
- Explain significant architectural decisions.
- Prefer small, testable changes.
- Maintain compatibility with the Bookmarklet distribution model.

### When information is missing

Ask for the minimum information necessary.

Prefer sanitized screenshots, HTML structure examples, or anonymized test data.

Never request credentials, session cookies, authentication tokens, or confidential production records.

### When delivering code

Always provide:

1. What changed.
2. Why it changed.
3. Which existing behavior was preserved.
4. Known limitations.
5. How to test the change.
6. Whether the Bookmarklet needs to be regenerated.

Do not claim that code has been tested in the production ServiceNow environment unless that test was actually performed.

---

## 9. Testing and Validation

Every meaningful change should be validated against the following scenarios.

| Scenario | Expected behavior |
|---|---|
| No eligible incident | No new incident alert |
| New + Empty | Incident detected |
| New + Assigned | Incident ignored |
| Non-New + Empty | Incident ignored |
| Queue unavailable | Clear error displayed |
| Refresh in progress | No overlapping refresh |
| Monitoring paused | Automatic checks stop |
| Monitoring stopped | Timers are cleared |
| Monitoring restarted | Only one monitoring loop runs |
| Notification permission denied | Monitoring continues without browser notification |
| Same incident remains in queue | No repeated notification for the same occurrence |

Testing should use authorized and sanitized environments whenever possible.

---

## 10. Roadmap Guidance

Future development should prioritize:

1. Reliable identification of incident records.
2. Accurate reading of State and Assigned to fields.
3. Individual incident identification.
4. Reliable refresh completion detection.
5. Duplicate notification prevention.
6. Improved error handling.
7. User-friendly settings.
8. Persistent configuration, if permitted.
9. Broader browser compatibility.
10. Reusable monitoring components.

New features must not compromise the simplicity of the user experience.

---

## 11. Project Vision

ServiceNow Monitor should evolve into a reusable operational productivity tool.

The long-term vision is to establish a modular foundation that can support additional monitoring capabilities while maintaining a simple installation and user experience.

The project should always prioritize:

**Reliability over complexity.**

**Usability over technical sophistication.**

**Operational safety over automation for its own sake.**

**Modularity without unnecessary architecture.**

The ultimate goal is to help analysts identify incidents faster, reduce manual queue checking, and improve operational responsiveness.

---

## 12. Final Instruction

When working on this project, think like an engineer responsible for a tool used by an entire operations team.

Do not optimize only for the developer.

Every implementation decision must consider the analyst who will install, execute, understand, and depend on the tool during an operational shift.

Build for the team.