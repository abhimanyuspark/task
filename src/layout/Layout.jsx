import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Nav from "./Nav";
import { Loading } from "../components";

const Layout = () => {
  return (
    <div>
      <nav className="sticky bg-white top-0 left-0 w-full z-10 p-4 sm:px-6 border-b border-slate-300">
        <Nav />
      </nav>
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
