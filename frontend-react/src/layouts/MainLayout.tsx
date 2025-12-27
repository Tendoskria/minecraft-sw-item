import { Outlet } from "react-router-dom"
import BurgerMenu from "../components/BurgerMenu"

function MainLayout() {
  return (
    <div className="h-screen bg-gradient-to-r from-[#21242D] via-[#21242D] to-[#2D3037] relative">
      <div className="flex h-full relative">

        {/* Left column */}
        <div className="flex-1 bg-[#21242D] opacity-60 relative">
          <div className="absolute top-5 right-5 text-[#3A3B40] text-6xl font-extrabold">
            ITEMS
          </div>
        </div>

        {/* Right column */}
        <div className="flex-1 bg-[#2D3037] opacity-40 relative">
          <div className="absolute top-5 left-5 text-[#21242D] text-6xl font-extrabold">
            SW
          </div>
        </div>

        {/* Route content area */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-[80%] h-[60%] text-white">
            <Outlet />
          </div>
        </div>

        {/* Bottom left rectangle */}
        <div className="absolute bottom-10 left-0 bg-[#F16736] h-[3%] w-[16%]"></div>

        {/* Burger Menu */}
        <BurgerMenu />

      </div>
    </div>
  )
}

export default MainLayout
