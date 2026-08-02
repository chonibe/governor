export type ToolRisk = "low" | "medium" | "high";
export type DecisionAction = "allow" | "deny" | "escalate";
export type PolicyWindow = "minute" | "hourly" | "daily";

export interface ActorContext {
  id: string;
  type?: "user" | "agent" | "service";
}

export interface ToolContext {
  name: string;
  server?: string;
  risk?: ToolRisk;
}

export interface AuthorizationContext {
  tenantId?: string;
  environment?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthorizeRequest {
  actor: ActorContext;
  tool: ToolContext;
  context?: AuthorizationContext;
}
