import { Route, Routes } from "react-router";
import "./App.css";
import { Suspense } from "react";
import { Dashboard, NotFound, TaskForms, ViewTasks } from "./pages";
import { Layout } from "./layout";
import { Loading } from "./components";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<TaskForms />} />
            <Route path="/view/:id" element={<ViewTasks />} />
            <Route path="/edit/:id" element={<TaskForms />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Suspense>
    </div>
  );
}

export default App;
