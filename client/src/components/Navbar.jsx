import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const activeStiles = {
    color: "white",
  };

  const isAuth = false;

  return (
    <div className="flex items-center justify-between py-4">
      <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-600 text-xs text-white">
        E
      </span>
      {isAuth && (
        <ul className="flex gap-4">
          <li>
            <NavLink
              to={"/"}
              style={({ isActive }) => (isActive ? activeStiles : undefined)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              style={({ isActive }) => (isActive ? activeStiles : undefined)}
              className="text-xs text-gray-400 hover:text-white"
            >
              My posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              style={({ isActive }) => (isActive ? activeStiles : undefined)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Add post
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex items-center justify-center px-4 py-2 rounded-sm bg-gray-600 text-xs text-white">
        {isAuth ? <button>Logout</button> : <Link to={"/login"}>Login</Link>}
      </div>
    </div>
  );
};
