import Logo from "../Assets/Images/NCA_LOGO.png";
import { NavLink, Outlet, Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Root() {
  const links = [
    {
      route: "/vote",
      name: "Vote",
      color: "bg-[#000814]",
    },
    {
      route: "/liveResults",
      name: "Live Results",
      color: "bg-[#49097B]",
    },
  ];

  const [menu, setShowMenu] = useState(false);

  const handleMenu = () => {
    return setShowMenu(true);
  };

  const handleClose = () => {
    return setShowMenu(false);
  };

  return (
    <section>
      <section className="flex justify-between items-center mx-4 md:mx-12 lg:mx-auto my-4 lg:w-[80%]">
        <div className="w-fit h-fit">
          <Link to={"/"}>
            <img
              src={Logo}
              alt="NCA"
              width={500}
              height={500}
              className="text-white w-full h-full"
            />
          </Link>
        </div>
        <ul className="hidden md:flex justify-end items-center gap-6 bg-[#000814] w-full h-full p-4">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.route}
              className={({ isActive }) =>
                `text-xl ${
                  link.color
                } text-white text-[22px] font-medium font-poppins p-4 rounded-[20px] ${
                  isActive ? "" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
        <section className="bg-[#000814] w-full h-full p-4 flex md:hidden justify-end">
          <div onClick={handleMenu} className="cursor-pointer ">
            <IoMenu color="white" size={50} />
          </div>
        </section>
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
                      `text-xl ${
                        link.color
                      } text-white text-[18px] font-medium font-poppins p-4 rounded-[20px] ${
                        isActive ? "" : ""
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
      </section>
      <Outlet />
    </section>
  );
}
