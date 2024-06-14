import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { GiTireIronCross } from "react-icons/gi";
import { Link } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);
  const navlinks = [
    {
      id: 1,
      text: "Home",
      linkto: "#",
    },
    {
      id: 2,
      text: "About",
      linkto: "#ourStory",
    },
    {
      id: 3,
      text: "Roadmap",
      linkto: "#roadmap",
    },
    {
      id: 4,
      text: "Team",
      linkto: "#team",
    },
    {
      id: 5,
      text: "FAQs",
      linkto: "#faqs",
    },
  
  ];

  return (
    <nav className=" flex justify-around md:items-center items-start md:flex-row flex-col  py-[1rem] md:mx-0 mx-4">
      <div>
        <img src="/logo.svg" alt="" />
      </div>
      <div
        className={`${
          show
            ? "flex gap-[2rem] md:flex-row flex-col md:my-0 my-8"
            : " md:flex hidden gap-[2rem]"
        } `}
      >
        {navlinks.map(({  text, linkto }, idx) => {
          return (
            <a
              href={linkto}
              key={idx}
              className=" hover:text-[#15BFFD] transition-all ease-linear delay-150 md:text-[24px] text-[16px]"
            >
              {text}
            </a>
          );
        })}
        <Link
          to="/mint"
          className=" hover:text-[#15BFFD] transition-all ease-linear delay-150 md:text-[24px] text-[16px]"
        >
          mint
        </Link>
      </div>
      <div className={`${show ? " flex " : " md:flex hidden"}  gap-[1rem] `}>
        <div className=" bg-[#15BFFD] text-[#000] md:text-[25px] text-[18px] p-[0.7rem] rounded-full hover:text-[#15BFFD] transition-all ease-linear delay-150 hover:border-[#15BFFD] hover:bg-transparent hover:border cursor-pointer">
          <FaTwitter />
        </div>
        <div className=" bg-[#15BFFD] text-[#000] md:text-[25px] text-[18px] p-[0.7rem] rounded-full hover:text-[#15BFFD] transition-all ease-linear delay-150 hover:border-[#15BFFD] hover:bg-transparent hover:border cursor-pointer">
          <FaDiscord />
        </div>
      </div>

      <div
        className=" absolute right-5 top-10 text-[24px] md:hidden block"
        onClick={() => {
          setShow(!show);
        }}
      >
        {!show ? <MdMenu /> : <GiTireIronCross />}
      </div>
    </nav>
  );
};

export default Nav;
