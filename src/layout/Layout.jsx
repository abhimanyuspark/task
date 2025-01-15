import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Nav from "./Nav";
import { Loading } from "../components";

const Layout = () => {
  return (
    <div className="h-screen">
      <header className="sticky bg-white top-0 left-0 w-full z-10">
        <Nav />
      </header>
      <main className="p-8">
        <div className="p-4 border border-slate-300 rounded-md">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;
