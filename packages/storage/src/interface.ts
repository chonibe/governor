import type { AuthorizeRequest, GovernorDecision } from "@governor/core";

export interface DecisionRecord {
  id: string;
  request: AuthorizeRequest;
  decision: GovernorDecision;
  createdAt: string;
}

export interface GovernorStorage {
  recordDecision(record: DecisionRecord): Promise<void>;
  incrementLimit?(
    key: string,
    window: "minute" | "hourly" | "daily",
    limit: number
  ): Promise<{ allowed: boolean; count: number; retryAfter?: string }>;
  getApproval?(escalationId: string): Promise<"pending" | "approved" | "denied" | "expired" | null>;
  recordApproval?(
    escalationId: string,
    status: "pending" | "approved" | "denied" | "expired",
    metadata?: Record<string, unknown>
  ): Promise<void>;
}
