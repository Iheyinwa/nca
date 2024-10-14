import Logo from "../Assets/Images/onecross.jpg";
import { NavLink, Outlet, Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

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
      text: "text-[#D70909]",
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
      <div>
        <section
          className="flex justify-between items-center p-1 my-6 mx-4 lg:mx-auto lg:w-[85%] rounded-[15px] border-[white] border shadow-lg"
          style={{
            backdropFilter: "blur(6px)",
          }}
        >
          <Link to={"/"} className="inline-flex items-center">
            <div className="w-16 h-16 rounded-full">
              <img
                src={Logo}
                alt="NCA"
                width={200}
                height={200}
                className="rounded-full w-full h-full object-cover"
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
                  `font-poppins ${link.color} ${
                    link.text
                  } font-semibold hover:border-b-[3px] hover:border-b-[#D7770D] ${
                    link.id && "justify-center"
                  } ${isActive ? "border-b-[#D7770D] border-b-[3px]" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
          <section className="bg-[#fff] rounded-l-[10px] w-full h-full p-4 flex md:hidden justify-end">
            <div onClick={handleMenu} className="cursor-pointer">
              <IoMenu color="black" size={30} />
            </div>
          </section>
        </section>
        {menu && (
          <section className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-end">
            <div className="bg-white flex flex-col gap-2 w-full max-w-[300px] h-full p-4">
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
                    id={link.id && "primaryButton"}
                    to={link.route}
                    className={({ isActive }) =>
                      `text-xl ${link.color} ${
                        link.text
                      } text-[18px] font-semibold font-syne p-3 hover:border-b-[3px] hover:border-b-[#D7770D] w-fit ${
                        link.id && "justify-start"
                      } ${isActive ? "border-b-[#D7770D] border-b-[3px]" : ""}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
      <Outlet />
      <Toaster />
    </section>
  );
}
