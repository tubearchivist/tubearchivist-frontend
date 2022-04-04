import NextImage from "next/image";
import BannerDark from "../images/banner-tube-archivist-dark.png";
import IconSearch from "../images/icon-search.svg";
import IconGear from "../images/icon-gear.svg";
import IconExit from "../images/icon-exit.svg";

/** TODO: Fix these nav links */
export const Nav = () => {
  return (
    <div className="boxed-content">
      <div className="top-banner">
        <a href="/">
          {/* {% if colors == 'dark */}
          <NextImage
            width={700}
            height={150}
            src={BannerDark}
            alt="tube-archivist-banner"
          />
          {/* {% endif %} */}
          {/* {% if colors == 'light */}
          {/* <img src="/img/banner-tube-archivist-light.png" alt="tube-archivist-banner"> */}
          {/* {% endif %} */}
        </a>
      </div>
      <div className="top-nav">
        <div className="nav-items">
          <a href="/">
            <div className="nav-item">home</div>
          </a>
          <a href="/channel">
            <div className="nav-item">channels</div>
          </a>
          <a href="/playlist">
            <div className="nav-item">playlists</div>
          </a>
          <a href="/downloads">
            <div className="nav-item">downloads</div>
          </a>
        </div>
        <div className="nav-icons">
          <a href="/search">
            <NextImage
              width={40}
              height={40}
              src={IconSearch}
              alt="search-icon"
              title="Search"
            />
          </a>
          <a href="/settings">
            <NextImage
              width={40}
              height={40}
              src={IconGear}
              alt="gear-icon"
              title="Settings"
            />
          </a>
          <a href="/logout">
            <NextImage
              width={40}
              height={40}
              className="alert-hover"
              src={IconExit}
              alt="exit-icon"
              title="Logout"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
