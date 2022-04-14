import { Footer } from "./Footer";
import { Nav } from "./Nav";

export const Layout = ({ children }) => {
  return (
    <>
      <div style={{ minHeight: "100vh" }} className="main-content">
        <Nav />
        {children}
      </div>
      <Footer />
    </>
  );
};
