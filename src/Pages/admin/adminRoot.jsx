import NCA from "../../Assets/Images/NCA_LOGO.png";
import { NavLink, Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminFooter from "./components/adminFooter";

export default function AdminRoot() {
  const [menu, setShowMenu] = useState(false);

  const handleMenu = () => setShowMenu(true);

  const handleClose = () => setShowMenu(false);

  const links = [
    {
      route: "/admin",
      name: "Dashboard",
    },
    {
      route: "/admin/addDistricts",
      name: "Districts",
    },
  ];

  return (
    <>
      <ToastContainer />
      <section className="lg:flex">
        <aside className="lg:fixed lg:w-[20%] h-full lg:h-screen bg-slate-200 flex lg:flex-col justify-between items-center lg:justify-start lg:items-start p-4">
          <div className="w-20 h-20 p-2">
            <img
              src={NCA}
              alt="NCA"
              width={100}
              height={100}
              className="rounded-full w-full h-full object-cover shadow-lg"
            />
          </div>
          <ul className="w-full text-center hidden lg:flex flex-col gap-4 my-4">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.route}
                end
                className={({ isActive }) =>
                  `text-xl w-full font-bold text-left font-poppins text-black p-4 ml-4 transition-all duration-300 ${
                    isActive
                      ? "bg-[#fff] rounded-l-md "
                      : "hover:bg-[#e2e8f0] hover:rounded-l-md"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
          <div onClick={handleMenu} className="cursor-pointer lg:hidden">
            <IoMenu color="black" size={50} />
          </div>
        </aside>

        {menu && (
          <section className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-[1200]">
            <div className="bg-white flex flex-col gap-2 w-[50%] h-full">
              <div
                className="justify-end flex cursor-pointer p-4"
                onClick={handleClose}
              >
                <FaTimes color="black" size={25} />
              </div>
              <ul className="flex flex-col gap-3 my-4">
                {links.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.route}
                    end
                    className={({ isActive }) =>
                      `text-xl w-full font-bold text-left font-poppins text-black p-4 mr-6 transition-all duration-300 ${
                        isActive
                          ? "bg-[#e2e8f0] rounded-l-md "
                          : "hover:bg-[#e2e8f0] hover:rounded-l-md"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </ul>
            </div>
          </section>
        )}

        <div className="lg:ml-[20%] w-full h-screen overflow-y-auto">
          <section
            className="p-4 shadow-md"
            style={{
              backdropFilter: "blur(6px)",
            }}
          >
            <p className="p-4 font-dmSerif tracking-wider text-xl lg:text-4xl font-bold">
              Welcome to Admin Dashboard
            </p>
          </section>

          <Outlet />
          <AdminFooter />
        </div>
      </section>
    </>
  );
}
