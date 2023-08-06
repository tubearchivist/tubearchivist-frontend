import type { LoaderArgs } from "@remix-run/server-runtime";
import { logout } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  return logout(request);
};
