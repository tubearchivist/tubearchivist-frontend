import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { randomBytes } from "crypto";
import invariant from "tiny-invariant";
import { API_URL } from "./lib/constants.server";
import { csrfCookie } from "./cookies";
invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const csrfStorage = createCookieSessionStorage({
  cookie: {
    name: "csrftoken",
    httpOnly: false,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export const getCsrfSession = async (request: Request) => {
  const cookie = request.headers.get("Cookie");
  return csrfStorage.getSession(cookie);
};

export const createCsrfToken = async (request: Request) => {
  const cookieHeaders = request.headers.get("Cookie");
  const cookie = await csrfCookie.parse(cookieHeaders);

  if (cookie) {
    return cookie;
  }

  const token = randomBytes(100).toString("base64");
  return token;
};

type LoginResponse = {
  token: string;
  user_id: string;
};

export const login = async ({
  username,
  password,
  request,
}: {
  username: string;
  password: string;
  request: Request;
}) => {
  if (!username || !password) {
    return redirect("/login");
  }
  const csrfmiddlewaretoken = csrfCookie.parse(request.headers.get("Cookie"));
  const creds = JSON.stringify({ username, password, csrfmiddlewaretoken });
  const response = await fetch(`${API_URL}/api/login/`, {
    method: "POST",
    body: creds,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en-US",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to login: ${response.statusText}`);
  }
  const cookie = response.headers.get("Cookie");
  const data: LoginResponse = await response.json();
  return data;
};

// export async function getUserId(
// 	request: Request
// ): Promise<User["id"] | undefined> {
// 	const session = await getSession(request);
// 	const userId = session.get(USER_SESSION_KEY);
// 	return userId;
// }

// export async function getUser(request: Request) {
// 	const userId = await getUserId(request);
// 	if (userId === undefined) return null;

// 	const user = await getUserById(userId);
// 	if (user) return user;

// 	throw await logout(request);
// }

// export async function requireUserId(
// 	request: Request,
// 	redirectTo: string = new URL(request.url).pathname
// ) {
// 	const userId = await getUserId(request);
// 	if (!userId) {
// 		const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
// 		throw redirect(`/login?${searchParams}`);
// 	}
// 	return userId;
// }

// export async function requireUser(request: Request) {
// 	const userId = await requireUserId(request);

// 	const user = await getUserById(userId);
// 	if (user) return user;

// 	throw await logout(request);
// }

export async function createUserSession({
  request,
  userId,
  token,
  remember = false,
  redirectTo,
}: {
  request: Request;
  userId: string;
  token: string;
  remember?: boolean;
  redirectTo: string;
}) {
  // const session = await getSession(request);
  const csrf = await getCsrfSession(request);

  // csrf.set(USER_SESSION_KEY, userId);
  // csrf.set("token", token);
  csrf.set("csrftoken", token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await csrfStorage.commitSession(csrf, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getCsrfSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await csrfStorage.destroySession(session),
    },
  });
}
