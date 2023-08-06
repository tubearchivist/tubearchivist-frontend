import { Footer } from "./Footer";
import { Nav } from "./Nav";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
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
