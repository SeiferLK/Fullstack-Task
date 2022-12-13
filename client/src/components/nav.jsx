import { Link, useLocation } from "react-router-dom";

function NavLink(props) {
  return (
    <Link
      to={props.to}
      className={
        props.active
          ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
      }
    >
      {props.children}
    </Link>
  );
}

export default function Nav() {
  const location = useLocation();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="ml-6 flex h-16 flex-1 items-center space-x-4">
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>

          <NavLink to="/login" active={location.pathname === "/login"}>
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
