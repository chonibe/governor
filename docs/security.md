# Security

Governor is infrastructure for runtime tool authorization. It should be deployed with the same care as an API gateway or policy enforcement point.

## Recommendations

- Put Governor on the required execution path for tools.
- Keep policies versioned.
- Record decisions and outcomes.
- Store minimal context.
- Use tenant-scoped keys for hosted or shared deployments.
- Require approval for high-risk or destructive tools.

## Non-Goals

Governor does not inspect model internals, evaluate alignment, or determine whether generated text is safe. It controls tool execution.
