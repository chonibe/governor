# Governor

Policy enforcement for MCP tools and AI agents.

Governor sits between AI systems and the tools they execute. It evaluates each tool call against deterministic runtime policies, returns an `allow`, `deny`, or `escalate` decision, and records execution history for audit.

```text
Agent
  |
  v
Governor
  |
  +-- Policy Engine
  |
  +-- State Store
  |
  v
MCP Tool
```

OAuth-style permissions were designed for humans granting broad access up front. AI agents need runtime policy: can this agent call this tool, right now, under these conditions, at this frequency, with this approval state?

Your company may have 500 employees whose access is carefully managed. Those employees can now launch thousands of AI agents that run continuously and make automated tool calls across databases, email, ticketing systems, cloud consoles, and internal APIs. Static human approval flows do not cover that execution model.

Governor is the policy gateway for that execution boundary.

## Status

Governor is being extracted into a public open source project. The existing implementation includes a deterministic policy engine, HTTP API, Supabase-backed storage, in-memory development storage, API tests, examples, and a pilot CLI. The public package structure below is the target shape for the extraction.

## Packages

```text
packages/
  core/       Policy engine, decision model, policy definitions, shared types
  gateway/    MCP/tool-call authorization helpers and middleware
  server/     HTTP API routes and handlers
  storage/    Storage interface plus memory and Supabase adapters
  sdk-js/     JavaScript/TypeScript client
  cli/        Local and CI-friendly command line tools
```

## Example

```ts
import { createGovernor } from "@governor/core";

const governor = createGovernor({
  policies: [
    {
      name: "email-send-limit",
      match: { tool: "gmail.send" },
      limit: { count: 50, window: "daily" }
    },
    {
      name: "financial-actions",
      match: { toolRisk: "high" },
      require: { approval: true }
    },
    {
      name: "destructive-tools",
      match: { tools: ["delete_database", "remove_user"] },
      action: "deny"
    }
  ]
});

const decision = await governor.authorize({
  actor: {
    id: "user_123"
  },
  tool: {
    name: "send_email",
    server: "gmail",
    risk: "medium"
  },
  context: {
    tenantId: "acme",
    metadata: {}
  }
});

if (decision.allowed) {
  await executeTool();
}
```

Example decision:

```ts
{
  allowed: false,
  reason: "daily_limit_exceeded",
  action: "deny",
  policy: "email-send-limit",
  retryAfter: "2026-08-03T09:00:00Z"
}
```

## Policy Model

Policies are deterministic rules evaluated at tool execution time.

```yaml
policies:
  - name: email-send-limit
    tool: gmail.send
    limit:
      count: 50
      window: daily

  - name: financial-actions
    toolRisk: high
    require:
      approval: true

  - name: destructive-tools
    tools:
      - delete_database
      - remove_user
    action:
      deny
```

Governor is intentionally not an AI safety framework or model alignment layer. It is infrastructure: a policy gateway, execution control plane, and governance middleware for tool-using systems.

## Use Cases

- Gate MCP tool calls before execution
- Enforce per-agent, per-user, or per-tenant tool limits
- Require approval for sensitive or high-risk tools
- Deny destructive tools in production environments
- Record execution decisions for audit and incident review
- Add runtime policy to autonomous workflows and enterprise copilots

## Open Core

Governor is designed as credibility-first commercial open source software.

The open source core should remain free to run locally or self-host:

- `@governor/core`
- local MCP proxies and wrappers
- YAML policy parsing
- local file and memory storage adapters
- self-hosted gateway basics

Commercial cloud and enterprise layers can build on top of that core:

- centralized policy management
- immutable audit ledgers and compliance exports
- human-in-the-loop approvals through Slack, PagerDuty, or ticketing systems
- global distributed rate limits
- enterprise SSO and role-based administration
- integrations with SIEM and observability platforms

## Repository Map

```text
governor/
  packages/
    core/
    gateway/
    server/
    storage/
    sdk-js/
    cli/
  examples/
    mcp-server-wrapper/
    mcp-proxy/
    node-agent/
    python-agent/
  docs/
    architecture.md
    production-runtime.md
    policies.md
    mcp-integration.md
    security.md
  migrations/
  README.md
  CONTRIBUTING.md
  SECURITY.md
  LICENSE
```

## Current Implementation

The extraction source currently lives under:

- `governor/api/src/rules` for the existing deterministic engine
- `governor/api/src/handlers.ts` for check/record/report flows
- `governor/api/src/storage` for memory and Supabase storage
- `governor/tests` for Vitest coverage
- `examples` for integration clients
- `scripts/governor-cli.js` for the pilot CLI

The current cooldown/pressure demo will become one sample policy pack, not the core project identity.

## Production Runtime

In production, Governor should use decentralized enforcement with centralized control:

- a local open source daemon, sidecar, or MCP proxy running inside the customer's VPC
- a commercial control plane for policy management, audit, approvals, and observability

The local runtime evaluates policies on the tool execution path. The control plane distributes policy updates, stores compliance-grade audit history, and coordinates human approval workflows. See [docs/production-runtime.md](docs/production-runtime.md).
