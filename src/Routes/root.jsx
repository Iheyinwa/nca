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
      text: "text-black",
    },
    {
      route: "/liveResults",
      name: "Live Results",
      color: "bg-transparent",
      text: "text-black",
      id: true,
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
      <section
        id="navbarbg"
        className="flex justify-between items-center p-1 my-6  mx-auto w-[80%] rounded-[15px] border-[white] border shadow-lg "
        style={{
       
          backdropFilter: 'blur(6px)'
        }}
      >
        <Link to={"/"} className="inline-flex items-center">
          <div className="w-16 h-16 rounded-full">
            <img
              src={Logo}
              alt="NCA"
              width={100}
              height={100}
              className=" rounded-full w-full h-full object-cover"
            />
          </div>
        </Link>
        <ul className="hidden md:flex justify-end items-center gap-6 rounded-r-[10px]">
          {links.map((link, index) => (
            <NavLink
              key={index}
              id={link.id && "primaryButton"}
              to={link.route}
              className={({ isActive }) =>
                `font-poppins ${link.color} ${link.text} hover:border-b-[#D7770D] font-semibold${
                  isActive ? "vote" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
        <section className="bg-[#fff] rounded-l-[10px] w-full h-full p-4 flex md:hidden justify-end">
          <div onClick={handleMenu} className="cursor-pointer ">
            <IoMenu color="black" size={30} />
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
                    id={link.id && "navbarButton"}
                    to={link.route}
                    className={({ isActive }) =>
                      `text-xl ${link.color} ${
                        link.text
                      } text-[18px] font-semibold font-syne p-3 ${
                        isActive ? "vote" : ""
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
