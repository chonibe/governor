import type { ToolRisk } from "@governor/core";

export interface McpToolDescriptor {
  name: string;
  server?: string;
  risk?: ToolRisk;
}
