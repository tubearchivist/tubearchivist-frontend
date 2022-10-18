import { Footer } from "./Footer";
import { Nav } from "./Nav";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
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
