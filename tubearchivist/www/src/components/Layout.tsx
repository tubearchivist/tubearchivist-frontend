import { Footer } from "./Footer";
import { Nav } from "./Nav";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="main-content">
        <Nav />
        {children}
      </div>
      <Footer />
    </>
  );
};
