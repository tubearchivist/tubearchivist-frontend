import { createCookie } from "@remix-run/node";

export const csrfCookie = createCookie("csrftoken", {
  maxAge: 604_800,
});
