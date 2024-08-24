import NCA from "../../Assets/Images/NCA_LOGO.png";
import { NavLink, Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminRoot() {
   const [menu, setShowMenu] = useState(false);

   const handleMenu = () => {
     return setShowMenu(true);
   };

   const handleClose = () => {
     return setShowMenu(false);
   };

  const links = [
    {
      route: "",
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
        <aside className="lg:fixed lg:w-[20%] h-full lg:h-screen bg-black flex lg:flex-col justify-between items-center lg:justify-start lg:items-start p-4 lg:p-2 lg:border-r lg:border-r-gray-800">
          <div className="w-20 h-20 p-2">
            <img
              src={NCA}
              alt="NCA"
              width={100}
              height={100}
              className="rounded-full w-full h-full object-cover shadow-lg"
            />
          </div>
          <ul className=" w-full text-center hidden lg:flex flex-col gap-4 my-4">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.route}
                className={({ isActive }) =>
                  `text-xl w-full p-2 text-left font-syne ${
                    isActive
                      ? "font-bold text-[#312F49] text-2xl "
                      : "text-[white]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
          <div onClick={handleMenu} className="cursor-pointer lg:hidden">
            <IoMenu color="white" size={50} />
          </div>
        </aside>
        {menu && (
          <section className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-10">
            <div className="bg-white flex flex-col gap-2 w-[50%] h-full p-4">
              <div
                className="justify-end flex cursor-pointer"
                onClick={handleClose}
              >
                <FaTimes color="black" size={25} />
              </div>
              <ul className="flex flex-col gap-3 my-4">
                {links.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.route}
                    className={({ isActive }) =>
                      `text-xl text-[18px] font-medium font-syne p-4 border-b ${
                        isActive
                          ? "font-bold text-[#312F49] text-2xl"
                          : "text-black"
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
          <section className="border-b px-4 py-6 font-syne text-3xl">
            <p className="p-4 font-syne text-4xl font-bold">Welcome to Admin Dashboard</p>
          </section>

          <Outlet />
        </div>
      </section>
    </>
  );
}
