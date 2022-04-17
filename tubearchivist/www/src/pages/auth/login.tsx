import { NextPageContext } from "next";
import { getCsrfToken } from "next-auth/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { CustomHead } from "../../components/CustomHead";
import Logo from "../../images/logo-tube-archivist-dark.png";

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

const Login = ({ csrfToken }) => {
  const { query } = useRouter();
  return (
    <>
      <CustomHead title="Login" />

      <div className="boxed-content login-page">
        {/* {% if colors == 'dark' %} */}
        <NextImage src={Logo} alt="tube-archivist-logo" />
        {/* {% endif %} */}
        {/* {% if colors == 'light' %} */}
        {/* <img src="{% static 'img/logo-tube-archivist-light.png' %}" alt="tube-archivist-banner" /> */}
        {/* {% endif %} */}
        <h1>Tube Archivist</h1>
        <h2>Your Self Hosted YouTube Media Server</h2>
        {query.error && <p className="danger-zone">Failed to login.</p>}
        <form action="/api/auth/callback/credentials/" method="POST">
          <label>
            Username
            <input name="username" type="text" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          {/* <p>Remember me: form.remember_me </p> */}
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <button type="submit">Login</button>
        </form>
        <p className="login-links">
          <span>
            <a
              href="https://github.com/bbilly1/tubearchivist"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
          </span>{" "}
          <span>
            <a
              href="https://github.com/bbilly1/tubearchivist#donate"
              target="_blank"
              rel="noreferrer"
            >
              Donate
            </a>
          </span>
        </p>
      </div>
      <div
        style={{ position: "absolute", bottom: 0, width: "100%" }}
        className="footer-colors"
      >
        <div className="col-1"></div>
        <div className="col-2"></div>
        <div className="col-3"></div>
      </div>
    </>
  );
};

export default Login;
