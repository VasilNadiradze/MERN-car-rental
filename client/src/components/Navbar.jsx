import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useState } from "react";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-borderColor
      ${isHome ? "bg-light" : "bg-white"}`}
    >
      <div className="flex items-center justify-between text-gray-600 relative">
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <img src={assets.logo} alt="logo" className="h-8" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden sm:flex items-center gap-8">
          {menuLinks.map((link, index) => (
            <Link key={index} to={link.path} className="hover:text-primary">
              {link.name}
            </Link>
          ))}

          {/* Search */}
          <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
            <input
              type="text"
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              placeholder="Search cars"
            />
            <img src={assets.search_icon} alt="search" />
          </div>

          {/* User area */}
          <button className="cursor-pointer">Dashboard</button>

          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            Login
          </button>
        </nav>

        {/* Burger button (mobile only) */}
        <button
          className="sm:hidden cursor-pointer z-50"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>

        {/* Mobile menu */}
        <div
          className={`fixed top-16 right-0 h-screen w-full bg-white border-t border-borderColor
          transform transition-transform duration-300 sm:hidden z-40
          ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col gap-6 p-6 text-gray-700">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-lg"
              >
                {link.name}
              </Link>
            ))}

            <button className="text-left">Dashboard</button>

            <button
              onClick={() => {
                setShowLogin(true);
                setOpen(false);
              }}
              className="px-8 py-2 bg-primary text-white rounded-lg w-fit"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
