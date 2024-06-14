import "../styles.css";
import metamask from "/mintpage/metamask.svg";
import coinbase from "/mintpage/coinbase.svg";
import walletconnect from "/mintpage/walletconnect.svg";
// import { WalletOptions } from "./WalletOptions";
import { useConnect } from "wagmi";

const ConnectWallet = () => {
  const { connectors, connect } = useConnect();



  const logos = {
    "MetaMask": metamask,
    "Coinbase Wallet": coinbase,
    "WalletConnect": walletconnect,
  }


  return (

      <div className=" flex md:flex-row flex-col items-center justify-center md:h-[700px] h-auto md:gap-0 gap-[2rem]">
        <div className=" md:w-[430px] w-[98%] mx-auto h-[350px] border-2 border-[#15BFFD] rounded-[30px] flex flex-col justify-center items-center py-[1rem] px-[3rem] shadow-2xl">
          <p className=" md:text-[24px] text-[22px] font-semibold text-[#15BFFD]">
            connect with
          </p>
          <div className=" flex flex-col gap-[1rem] my-[1rem]">
            {connectors.filter((connector)=>connector.name!== "Phantom").map((connector) => (
              <button
                key={connector.uid}
                className=" md:w-[370px] w-[315px] mx-auto flex justify-between px-8 items-center bg-[#161616] h-[70px] rounded-[10px] border  border-[#15BFFD] hover:bg-[#040404] cursor-pointer transition-all ease-out delay-150 md:hover:scale-105 "
                onClick={() => connect({ connector })}
              >
                   <img src={logos[connector.name]} alt="" />
                  <p>{connector.name}</p>
              </button>
            ))}

          </div>
        </div>
      </div>

  );
};

export default ConnectWallet;
