import Logo from '../../Assets/Images/NCA_LOGO.png'
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { useState } from 'react';

const Navbar = () => {
const [menu, setShowMenu] = useState(false)

const handleMenu = () => {
  return (
    setShowMenu(true)
  )
}
    return (
      <section className="flex justify-between items-center mx-4 md:mx-12 lg:mx-auto my-4 lg:w-[80%]">
        <div className="w-fit h-fit">
          <img
            src={Logo}
            alt="NCA"
            width={500}
            height={500}
            className="text-white w-full h-full"
          />
        </div>
        <ul className=" hidden md:flex justify-end items-center gap-6 bg-[#000814] w-full h-full p-4">
          <li className="p-4 text-white text-[22px] font-medium font-poppins">
            Voted
          </li>
          <li className="bg-[#49097B] rounded-[20px] font-medium text-[22px] p-4 text-white font-poppins">
            Live Results
          </li>
        </ul>
        <div onClick={handleMenu} className='cursor-pointer'>
          <IoMenu color="black" size={25} />
        </div>
        {menu && (
          <div className="bg-white flex flex-col gap-2">
            <div className='justify-end cursor-pointer'>
              <FaTimes color="black" size={25} />
            </div>
            <ul>
              <li>Vote</li>
            </ul>
          </div>
        )}
      </section>
    );
}

export default Navbar