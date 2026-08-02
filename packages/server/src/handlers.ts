import type { Governor, AuthorizeRequest } from "@governor/core";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isAuthorizeRequest = (value: unknown): value is AuthorizeRequest => {
  if (!isRecord(value) || !isRecord(value.actor) || !isRecord(value.tool) || !isRecord(value.context)) {
    return false;
  }

  return (
    typeof value.actor.id === "string" &&
    typeof value.tool.name === "string" &&
    typeof value.context.tenantId === "string" &&
    typeof value.context.environment === "string"
  );
};

export const handleAuthorize = async (
  governor: Governor,
  request: unknown
): Promise<{ status: number; body: unknown }> => {
  if (!isAuthorizeRequest(request)) {
    return {
      status: 400,
      body: {
        error: "invalid_authorization_request",
        message: "Expected actor.id, tool.name, context.tenantId, and context.environment."
      }
    };
  }

  const decision = await governor.authorize(request);
  return {
    status: 200,
    body: decision
  };
};
