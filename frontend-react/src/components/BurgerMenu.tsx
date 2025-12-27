import { useState } from "react";
import { Link } from "react-router-dom";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 flex flex-col justify-center items-center w-12 h-12 bg-transparent border-none cursor-pointer"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-8 h-1 bg-white mb-1.5 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-white mb-1.5 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#3A3D44] shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          {/* Logo/Title */}
          <div className="mb-12">
            <h2 className="text-white text-3xl font-bold tracking-wider">
              ITEM SW
            </h2>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col space-y-6">
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-white text-xl font-semibold hover:text-[#F16736] transition-colors border-b-2 border-[#F16736] pb-2"
            >
              ACCUEIL
            </Link>
            <Link
              to="/creation"
              onClick={toggleMenu}
              className="text-white text-xl font-semibold hover:text-[#F16736] transition-colors"
            >
              ESPACE CREATION
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;