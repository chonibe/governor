import type { Governor, AuthorizeRequest } from "@governor/core";

export const handleAuthorize = async (governor: Governor, request: AuthorizeRequest) => {
  return governor.authorize(request);
};
