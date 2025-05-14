import { Outlet } from "react-router-dom";

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
