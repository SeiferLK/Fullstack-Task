import Home from "./pages/home";
import Nav from "./components/nav";
import Login, { action as loginAction } from "./pages/login";
import User, { loader as userLoader } from "./pages/user";
import { createBrowserRouter, RouterProvider, Route, Outlet, createRoutesFromElements } from "react-router-dom";

function Root() {
  return (
    <div className="h-[100vh] bg-gray-100">
      <Nav />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />} />
      <Route path="user" element={<User />} loader={userLoader} />
      <Route path="login" element={<Login />} action={loginAction} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
