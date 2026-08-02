# Policies

Policies are deterministic rules evaluated at tool execution time.

Governor policies answer questions like:

- Can this actor call this tool?
- How often can this tool be called?
- Does this tool require approval?
- Is this tool allowed in this environment?
- What should be recorded after execution?

## Example

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

## Decision Actions

- `allow`: execute the tool
- `deny`: block the tool call
- `escalate`: require approval or another control path

## Policy Packs

The current cooldown and pressure-limiting behavior should become an example policy pack. It is useful, but it is not the core abstraction.
