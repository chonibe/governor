# Security

Governor is designed to sit on the execution path for tool-using agents. Treat policy definitions, approval records, and execution history as sensitive infrastructure data.

## Reporting Issues

Please report security issues privately to the maintainers before public disclosure. This repository is still being prepared for public release; a dedicated security contact will be added before launch.

## Security Model

Governor evaluates tool calls at runtime and returns a deterministic decision:

- `allow`: the tool call may proceed
- `deny`: the tool call must not execute
- `escalate`: the tool call requires another approval path

Governor should be deployed where agents cannot bypass it. For MCP integrations, that usually means wrapping the MCP server, running a proxy in front of tool execution, or enforcing Governor checks inside the platform-level tool dispatcher.

## Sensitive Data

Avoid storing raw secrets, prompt contents, private customer data, or tool payloads in policy context unless required. Prefer stable identifiers and minimal metadata for audit.
