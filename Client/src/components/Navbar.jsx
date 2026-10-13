import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const links = [
    { name: "Home", path: "/" },
    { name: "Dashavatar", path: "/dashavatar" },
    { name: "Temples", path: "/temples" },
    { name: "Vishnu Puran", path: "/vishnu-puran" },
  ];

  const handleLogout = () => {
  localStorage.removeItem("token");
  setUser(null);
  setMenuOpen(false);
  navigate("/");
  };
  const linkStyle = ({ isActive }) =>
    `block py-2 text-[15px] transition-colors duration-300 ${
      isActive
        ? "text-amber-300"
        : "text-gray-200 hover:text-amber-300"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/70 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <span className="text-3xl">🪷</span>
          <div>
            <h1 className="text-2xl font-bold text-amber-300 tracking-wide">
              Vaikunth
            </h1>
            <p className="text-[15px] font-bold text-gray-100 tracking-[3px] uppercase">
              Divine Journey
            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Login / Signup */}
        <div className="hidden lg:flex items-center gap-3">
           {user ? (
                  <>
                    <NavLink className="flex-1 text-center rounded-full border border-amber-400 px-4 py-2 text-sm text-amber-300" to="/profile">Profile</NavLink>
                    <button className="flex-1 text-center rounded-full border border-amber-400 px-4 py-2 text-sm text-amber-300" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
<>
  <NavLink
    to="/login"
    className="flex-1 whitespace-nowrap rounded-full border border-amber-400 px-5 py-2.5 text-center text-sm font-semibold text-amber-300 transition-all duration-300 hover:bg-amber-400 hover:text-slate-950"
  >
    Login
  </NavLink>

  <NavLink
    to="/signup"
    className="flex-1 whitespace-nowrap rounded-full bg-amber-400 px-5 py-2.5 text-center text-sm font-bold text-slate-950 shadow-md transition-all duration-300 hover:bg-amber-300 hover:shadow-lg active:scale-95"
  >
    Sign Up
  </NavLink>
</>

                )}
        </div>

        {/* Mobile / Tablet Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 border border-amber-400 rounded-lg text-amber-300"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <>
              <span className="w-5 h-0.5 bg-amber-300" />
              <span className="w-5 h-0.5 bg-amber-300" />
              <span className="w-5 h-0.5 bg-amber-300" />
            </>
          )}
        </button>
      </div>

      {/* Mobile / Tablet Dropdown */}
      {menuOpen && (
        <div className="lg:hidden px-5 pb-5 pt-2 border-t border-amber-400/40">
          <div className="flex flex-col">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            {user ? (
                  <>
                    <NavLink className="flex-1 text-center rounded-full border border-amber-400 px-4 py-2 text-sm text-amber-300" to="/profile">Profile</NavLink>
                    <button className="flex-1 text-center rounded-full border border-amber-400 px-4 py-2 text-sm text-amber-300" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink className="flex-1 text-center rounded-full border border-amber-400 px-4 py-2 text-sm text-amber-300"  to="/login">Login</NavLink>
                    <NavLink className="flex-1 text-center rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950" to="/signup">Sign Up</NavLink>
                  </>
                )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

