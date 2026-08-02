# Contributing

Governor is early in its open source extraction. Contributions should keep the project focused on one job: runtime policy enforcement at the AI-agent/tool execution boundary.

## Development

```bash
npm install
npm run typecheck
npm run test
```

## Design Principles

- Keep the core policy engine deterministic.
- Keep MCP/tool-call concepts first-class.
- Keep storage behind interfaces.
- Prefer explicit policy decisions over implicit behavior.
- Treat auditability as a product surface.

## Pull Requests

Before opening a pull request:

- Add or update tests for policy behavior.
- Document new policy fields or decision reasons.
- Avoid coupling `packages/core` to HTTP, Supabase, or framework-specific code.
- Keep examples runnable with minimal setup.

## Language

Use infrastructure language: policy gateway, execution control plane, tool authorization, governance middleware. Avoid framing Governor as an AI safety, alignment, or model-evaluation framework.
