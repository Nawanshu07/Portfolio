# Decisions

## 2026-11-23 — Clean-slate rebuild

**Decision:** Build a new portfolio from scratch instead of restoring the deleted earlier implementation.

**Reason:** User explicitly requested a new website. The old code remains in Git history and is not modified or committed as part of this work.

## 2026-11-23 — Content source of truth

**Decision:** Use `docs/INFO.md` for editable portfolio facts, links, projects, and contact details.

**Reason:** Separates personal content from presentation code and prevents agents from inventing biographical details.

## 2026-11-23 — Initial stack

**Decision:** Use React, TypeScript, Vite, and plain CSS for v1.

**Reason:** The current package manifest is intentionally minimal. Native CSS can deliver the planned layout and accessible motion without adding a dependency surface.

## 2026-11-23 — Addressable portfolio pages

Home, Work, About, Contact and each featured project have their own URL. The Vite build emits an HTML directory entry for each path using the shared page list. Ordinary links provide browser history and direct navigation. A short cobalt curtain adds motion to internal navigation when the visitor allows animation.
