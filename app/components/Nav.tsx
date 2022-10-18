import BannerDark from "~/images/banner-tube-archivist-dark.png";
import IconSearch from "~/images/icon-search.svg";
import IconGear from "~/images/icon-gear.svg";
import IconExit from "~/images/icon-exit.svg";
import { Link } from "@remix-run/react";

/** TODO: Fix these nav links */
export const Nav = () => {
  return (
    <div className="boxed-content">
      <div className="top-banner">
        <Link to="/">
          {/* {% if colors == 'dark */}
          <img
            width={700}
            height={150}
            src={BannerDark}
            alt="tube-archivist-banner"
          />
          {/* {% endif %} */}
          {/* {% if colors == 'light */}
          {/* <img src="/img/banner-tube-archivist-light.png" alt="tube-archivist-banner"> */}
          {/* {% endif %} */}
        </Link>
      </div>
      <div className="top-nav">
        <div className="nav-items">
          <Link to="/">
            <div className="nav-item">home</div>
          </Link>
          <Link to="/channel">
            <div className="nav-item">channels</div>
          </Link>
          <Link to="/playlist">
            <div className="nav-item">playlists</div>
          </Link>
          <Link to="/download">
            <div className="nav-item">downloads</div>
          </Link>
        </div>
        <div className="nav-icons">
          <Link to="/search">
            <img
              width={50}
              height={40}
              src={IconSearch}
              alt="search-icon"
              title="Search"
            />
          </Link>
          <Link to="/settings">
            <img
              width={50}
              height={40}
              src={IconGear}
              alt="gear-icon"
              title="Settings"
            />
          </Link>
          <Link to="/logout" style={{ cursor: "pointer" }}>
            <img
              width={50}
              height={40}
              className="alert-hover"
              src={IconExit}
              alt="exit-icon"
              title="Logout"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
