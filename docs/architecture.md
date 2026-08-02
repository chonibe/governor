# Architecture

Governor is a runtime policy gateway for MCP tools and AI agents.

```text
Agent -> Governor -> MCP Tool
            |
            +-> Policy Engine
            +-> State Store
            +-> Audit Log
```

## Layers

### Daemon / Sidecar

The daemon is the local policy enforcement point. It runs next to MCP servers, agent workers, or tool gateways inside the customer's network. It should evaluate cached policies locally and avoid depending on a cloud round trip for ordinary allow/deny decisions.

### Control Plane

The control plane is the commercial management layer. It distributes policies, stores audit history, coordinates human approvals, and provides security teams with centralized visibility.

### Core

The core package evaluates tool execution requests against deterministic policies. It owns the policy model, decision model, context model, and matching logic.

### Gateway

The gateway package adapts core decisions to MCP and agent runtimes. It provides wrappers and middleware for authorizing tool calls before execution.

### Server

The server package exposes Governor over HTTP for systems that cannot embed the core package directly.

### Storage

Storage adapters persist execution history, counters, approvals, and compact state used by policy evaluation.

### SDK and CLI

The SDK and CLI make Governor easy to call from applications, tests, CI, and local development.
