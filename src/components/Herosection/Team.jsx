import React from "react";
import avator1 from "/landinpage/avator1.svg";
import avator2 from "/landinpage/avator2.svg";
import avator3 from "/landinpage/avator3.svg";
import cardimage2 from "/landinpage/FishCards2.svg";
import cardimage1 from "/landinpage/FishCards1.svg";
import cardimage3 from "/landinpage/cardimage3.svg";
import cardimage4 from "/landinpage/cardimage4.svg";
import cardimage5 from "/landinpage/cardimage5.svg";
import bluetick from "/landinpage/bluetick.svg";


const Team = () => {
  const cardsData = [
    {
      id: 1,
      avator: avator1,
      ownedBy: "Owned by",
      name: "Jacob Jones",
      image: cardimage1,
    },
    {
      id: 1,
      avator: avator2,
      ownedBy: "Owned by",
      name: "Jacob Jones",
      image: cardimage2,
    },
    {
      id: 1,
      avator: avator3,
      ownedBy: "Owned by",
      name: "Jacob Jones",
      image: cardimage3,
    },
    {
      id: 1,
      avator: avator1,
      ownedBy: "Owned by",
      name: "Jacob Jones",
      image: cardimage4,
    },
    {
      id: 1,
      avator: avator2,
      ownedBy: "Owned by",
      name: "Jacob Jones",
      image: cardimage3,
    },
    {
      id: 1,
      avator: avator3,
      ownedBy: "Owned by",
      name: "Jacob Jones",
      image: cardimage5,
    },
  ];
  return (
    <div>
      <h2 className=" md:text-[56px] text-[30px] font-bold text-center my-[1.5rem]">
        MEET OUR <span className=" text-[#15BFFD]"> TEAM </span>
      </h2>
      <div className=" grid md:grid-cols-3 grid-cols-1 place-content-center  md:w-[80%] w-[95%] mx-auto gap-[2rem] p-[1rem] ">
        {cardsData.map(({ id, avator, ownedBy, name, image }, index) => {
          return (
            <div
              key={index}
              className=" md:w-[400px] w-[98%] md:mx-0 mx-auto md:h-[440px] h-[380px] border border-[#15BFFD] p-[1rem] rounded-[10px] shadow-2xl md:hover:mt-[-0.4rem] transition-all ease-linear delay-150  cursor-pointer "
            >
              <div className=" flex gap-[0.7rem] py-[0.4rem]">
                <img src={avator} alt="" />
                <div className=" text-[12px] ">
                  <p>{ownedBy}</p>
                  <div className=" flex gap-[0.4rem]">
                    <p className=" text-[#fff]/50">{name}</p>
                    <img src={bluetick} alt="" />
                  </div>
                </div>
              </div>
              <img src={image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
