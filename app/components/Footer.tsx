export const Footer = () => (
  <div className="footer">
    <div className="boxed-content">
      <span>© 2021 - {new Date().getFullYear()} TubeArchivist v0.1.3 </span>
      <span>
        <a href="{% url 'about' %}">About</a> |{" "}
        <a
          href="https://github.com/bbilly1/tubearchivist"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://hub.docker.com/r/bbilly1/tubearchivist"
          target="_blank"
          rel="noreferrer"
        >
          Docker Hub
        </a>{" "}
        |{" "}
        <a
          href="https://discord.gg/AFwz8nE7BK"
          rel="noreferrer"
          target="_blank"
        >
          Discord
        </a>{" "}
        | <a href="https://www.reddit.com/r/TubeArchivist/">Reddit</a>
      </span>
    </div>
  </div>
);
