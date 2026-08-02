import type { AuthorizeRequest, GovernorDecision } from "@governor/core";

export interface DecisionRecord {
  id: string;
  request: AuthorizeRequest;
  decision: GovernorDecision;
  createdAt: string;
}

export interface GovernorStorage {
  recordDecision(record: DecisionRecord): Promise<void>;
}
