import type { DecisionRecord, GovernorStorage } from "../interface";

export class MemoryGovernorStorage implements GovernorStorage {
  private decisions: DecisionRecord[] = [];

  async recordDecision(record: DecisionRecord): Promise<void> {
    this.decisions.push(record);
  }

  listDecisions(): DecisionRecord[] {
    return [...this.decisions];
  }
}
