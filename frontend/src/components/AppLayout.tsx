import Header from "./Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout;
