import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import type { ActionArgs, ErrorBoundaryComponent, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { csrfCookie } from "~/cookies";
import { createCsrfToken, createUserSession, login } from "~/session.server";
import { safeRedirect } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const csrf = await createCsrfToken(request);
  return json(csrf, {
    headers: {
      "Set-Cookie": await csrfCookie.serialize(csrf),
    },
  });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("next"), "/");
  const remember = formData.get("remember");

  const user = await login({ username, password, request });
  console.log(user);

  return createUserSession({
    redirectTo,
    request,
    userId: user.user_id,
    token: user.token,
    remember: remember === "on" ? true : false,
  });
};

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const csrf = useLoaderData<typeof loader>();
  console.log(csrf);

  return (
    <>
      <div className="boxed-content login-page">
        <img src="img/logo-tube-archivist-dark.png" alt="tube-archivist-logo" />

        <h1>Tube Archivist</h1>
        <h2>Your Self Hosted YouTube Media Server</h2>

        <p className="danger-zone">Failed to login.</p>

        <Form method="POST" name="login">
          <input type="text" name="username" />
          <br />
          <input type="password" name="password" />
          <br />
          <p>
            Remember me: <input type="checkbox" name="remember" />
          </p>
          <input type="hidden" name="next" value={redirectTo} />
          <input type="hidden" name="csrf" value={csrf} />
          <button type="submit">Login</button>
        </Form>
        <p className="login-links">
          <span>
            <a
              href="https://github.com/tubearchivist/tubearchivist"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </span>{" "}
          <span>
            <a
              href="https://github.com/tubearchivist/tubearchivist#donate"
              target="_blank"
              rel="noreferrer"
            >
              Donate
            </a>
          </span>
        </p>
      </div>
      <div className="footer-colors">
        <div className="col-1"></div>
        <div className="col-2"></div>
        <div className="col-3"></div>
      </div>
    </>
  );
};

export default LoginPage;

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }: { error: Error }) => {
  console.warn(error);
  return (
    <div className="boxed-content">
      <div className="title-bar">
        <h1>Error: </h1>
        <p>{error.message}</p>
      </div>
    </div>
  );
};
