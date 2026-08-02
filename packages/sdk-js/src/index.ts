export interface GovernorClientOptions {
  baseUrl: string;
  apiKey?: string;
}

export class GovernorClient {
  constructor(private readonly options: GovernorClientOptions) {}

  async authorize(payload: unknown): Promise<unknown> {
    const response = await fetch(`${this.options.baseUrl.replace(/\/$/, "")}/v1/authorize`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.options.apiKey ? { authorization: `Bearer ${this.options.apiKey}` } : {})
      },
      body: JSON.stringify(payload)
    });

    return response.json();
  }
}
