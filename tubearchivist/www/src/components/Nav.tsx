import NextImage from "next/image";
import NextLink from "next/link";
import BannerDark from "../images/banner-tube-archivist-dark.png";
import IconSearch from "../images/icon-search.svg";
import IconGear from "../images/icon-gear.svg";
import IconExit from "../images/icon-exit.svg";
import { signIn, signOut, useSession } from "next-auth/react";

/** TODO: Fix these nav links */
export const Nav = () => {
  const { data: session } = useSession();
  return (
    <div className="boxed-content">
      <div className="top-banner">
        <NextLink href="/">
          <a>
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
        </NextLink>
      </div>
      <div className="top-nav">
        <div className="nav-items">
          <NextLink href="/">
            <a>
              <div className="nav-item">home</div>
            </a>
          </NextLink>
          <NextLink href="/channel">
            <a>
              <div className="nav-item">channels</div>
            </a>
          </NextLink>
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
              width={50}
              height={40}
              src={IconSearch}
              alt="search-icon"
              title="Search"
            />
          </a>
          <a href="/settings">
            <NextImage
              width={50}
              height={40}
              src={IconGear}
              alt="gear-icon"
              title="Settings"
            />
          </a>
          <a
            style={{ cursor: "pointer" }}
            onClick={!!session?.user ? () => signOut() : () => signIn()}
          >
            <NextImage
              width={50}
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
