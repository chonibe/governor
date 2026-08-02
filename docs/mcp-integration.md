# MCP Integration

Governor belongs at the boundary where an AI system is about to execute a tool.

## Integration Patterns

### MCP Server Wrapper

Wrap individual tool handlers and call Governor before executing the underlying tool.

```ts
const decision = await governor.authorize({
  actor,
  tool,
  context
});

if (!decision.allowed) {
  return { error: decision.reason };
}

return runTool(args);
```

### MCP Proxy

Run Governor as a proxy between agents and MCP servers. The proxy evaluates every tool call, forwards allowed calls, and records the decision and outcome.

### Platform Dispatcher

If your agent platform already centralizes tool dispatch, call Governor from that dispatcher before invoking tools.

## Placement

Governor should be deployed where tool calls cannot bypass it. Audit records are only meaningful if all relevant execution paths pass through the gateway.
