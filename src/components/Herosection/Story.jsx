import React from "react";
import Btn from "../Btn";
import { FaEthereum } from "react-icons/fa";

const Story = () => {
  return (
    <div>
      <h2 className=" text-center py-[1rem] md:text-[56px] text-[40px] font-semibold">
        OUR <span className=" text-[#15BFFD]">STORY </span>
      </h2>
      <div className=" flex justify-around items-center md:h-[800px] h-auto md:flex-row flex-col">
        <div className=" md:w-[800px] w-[95%] md:mx-0 mx-auto">
          <h2 className=" md:text-[32px] text-[18px] font-semibold">
            WELCOME TO THE <span className="text-[#15BFFD]"> BLAST SHARK</span>
          </h2>
          <div className=" text-[#A7A7A7] md:text-[18px] text-[14px]  font-normal leading-[26px]">
            <p className=" my-4">
              We created a unique collection of NFTs, which became the first in
              the BLAST ecosystem. Each picture was drawn by hand. We also have
              a multi-level system of access to purchases during the mint. The
              mint date entirely depends on the release of the Blast mainnet.
            </p>
            <p className=" my-2">
              Blast yield comes from ETH staking and RWA protocols. The yield
              from these decentralized protocols is passed back to Blast users
              automatically. The default interest rate on other L2s is 0%. Blast
              is an EVM-compatible, optimistic rollup that raises the baseline
              yield for users and developers without changing the experience
              cryptonatives expect. Our goal as members is to grow the Blast L2
              ecosystem. Our activities are aimed at promoting users
            </p>
            <p className=" my-2">
            
              who are interested in our topic to join the Blast mission in order
              to have the opportunity to earn Blast Airdrop.
            </p>
          </div>
          <div className=" my-[3rem]">
            <Btn text={"Join our Discord"} style={" w-[230px] "} />
          </div>
        </div>
        <div className=" flex gap-[4rem] md:flex-row flex-col">
          <div className=" md:w-[330px] w-[320px] border rounded-[2px] h-[433px] shadow-xl rounded-br-[80px] border-[#4bb5dc] cursor-pointer md:hover:scale-105 transition-all ease-linear delay-150 ">
            <p className=" text-[14px] text-center">210 Digital Artwork</p>
            <p className=" text-[14px] text-[#15BFFD] flex justify-center items-center my-2 ">
              {" "}
              <FaEthereum /> 3.2 ETH
            </p>
            <img src="/landinpage/cardShark2.svg" alt="" />
          </div>
          <div className=" md:w-[330px] w-[320px] border rounded-[2px] h-[433px] shadow-xl rounded-br-[80px] border-[#4bb5dc] md:rotate-12 bg-[#15BFFD] my-[4rem] cursor-pointer md:hover:scale-105 transition-all ease-linear delay-150 ">
            <p className=" text-[14px] text-center">210 Digital Artwork</p>
            <p className=" text-[14px] text-[#000] flex justify-center items-center my-2 ">
              {" "}
              <FaEthereum /> 3.2 ETH
            </p>
            <img src="/landinpage/cardShark1.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
