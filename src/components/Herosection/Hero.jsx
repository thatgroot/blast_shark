import React from "react";
import Btn from "../Btn";

const Hero = () => {
  const nftInfo = [
    {
      id: 1,
      text: "12",
      caption: "Total supply",
    },
    {
      id: 2,
      text: "12",
      caption: "Total volume",
    },
    {
      id: 3,
      text: "12",
      caption: "Floor price",
    },
  ];
  return (
    <div className=" relative ">
      <header className=" flex justify-center items-center md:flex-row flex-col md:gap-0 gap-[2rem] md:h-screen h-auto   ">
        <div className="md:h-[100vh] ">
          <img src="/landinpage/shark1.svg" alt="" className="" />
        </div>
        <div>
          <img src="/landinpage/sharkCollection.svg" alt="" className="mx-auto" />
          <h2 className=" md:text-[64px] text-[30px] font-bold text-center">
            {" "}
            WELCOME TO <br /> BLAST{" "}
            <span className=" text-[#15BFFD]"> SHARK </span>
          </h2>
          <div >
            <img src="/landinpage/collectnft.svg" alt="" />
          </div>
        </div>
        <div className="md:h-[100vh] ">
          <img src="/landinpage/shark2.svg" alt=""  />
        </div>
      </header>
    

      {/* lists are here */}
      <div className=" flex justify-around gap-[1rem] py-[3rem] md:flex-row flex-col">
        <div className=" flex flex-col gap-[2rem] md:w-[640px] w-[98%] md:mx-0 mx-auto">
          <li className=" leading-[32px] md:text-[18px] text-[14px] font-normal">
            Your digital penguin can become the key to the entire Blast
            ecosystem
          </li>
          <li className=" leading-[32px] md:text-[18px] text-[14px] font-normal">
            Blast shark community gets only positive vibe all because we are a
            big shark family, shark forever.
          </li>
        </div>
        <div className="flex flex-col gap-[2rem] md:w-[640px] w-[98%] md:mx-0 mx-auto">
          <li className=" leading-[32px] md:text-[18px] text-[14px] font-normal">
            Future bonuses and perks can be unlocked by the community through
            holding
          </li>
          <li className=" leading-[32px] md:text-[18px] text-[14px] font-normal">
            Unique digital collectibles living on the Blast blockchain
          </li>
        </div>
      </div>
      <div className=" flex justify-center items-center md:gap-[1.6rem] gap-[2rem] my-[1rem] md:flex-row flex-col">
        <Btn text={"Buy on Element Market"} style={"md:w-[310px] w-[95%] "} />
        <Btn text={"Buy on Mintify"} style={"md:w-[210px] w-[95%]"} />
      </div>

      {/* nft info buttons is here */}
      <div className=" flex justify-center items-center gap-[2rem] my-[2rem] flex-wrap">
        {nftInfo.map(({ id, text, caption }, idx) => {
          return (
            <div key={id} >
              <div className=" bg-[#15BFFD] text-[] w-[177px] h-[130px] flex flex-col justify-center items-center rounded-[10px] hover:text-[#15BFFD] hover:bg-transparent hover:border hover:border-[#15BFFD] cursor-pointer transition-all ease-linear delay-150">
              <p className="text-[68px]  font-bold">{text}</p>
              </div>
              <p className=" py-[1rem] text-center text-[20px] font-semibold text-[#fff]/70">{caption}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
