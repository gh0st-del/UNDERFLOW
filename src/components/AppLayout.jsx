import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div className="w-full h-dvh flex justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
