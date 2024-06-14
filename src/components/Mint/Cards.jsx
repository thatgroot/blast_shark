import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { GiCheckMark } from "react-icons/gi";
import Btn from "../Btn";
import ConnectWallet from "../../pages/ConnectWallet/ConnectWallet";
import { useEffect } from "react";
import { CONTRACT_ADDRESS } from "../../utils/contract";
import { parseEther } from "viem";
import { config } from "../../utils/config";
import {
  readContract,
  watchPendingTransactions,
  writeContract,
} from "wagmi/actions";
import { ABI } from "../../utils/abi";

const Cards = () => {
  const [steps, setStep] = useState(0);

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  // const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const [showConnectBox, setShowConnectBox] = useState(false);
  async function read() {
    const result = await readContract(config, {
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "og_mint_start_time",
    });

    console.log("result", result);
  }
  useEffect(() => {
    read();
  }, []);

  async function mint() {
    try {
      const hash = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "ogtMint",
        args: [
          BigInt(1),
          [
            "0xd1c9116e78ef547bbf6d308c24c15a19c52a03bdd09355bd1156d9e86ae1e685",
            "0xcf70cfe897279b54e0d51253eb276b3f3b49be900000dcfe856d674cde9c1340",
            "0x453296cd8cf5e0d17dbaca902cc2bf83f73dadd9ffc5875d850cd2c2ef0a9698",
            "0x80c399c67ef2db2c96524dcdb36fa1b0989c20eeb3cd7cae158194839e2b393d",
          ],
        ],
        value: parseEther("0.000015"),
      });
      console.log("hash", hash);

      watchPendingTransactions(config, {
        onError(error) {
          console.log("Error", error);
        },
        onTransactions(transactions) {
          console.log("New transactions!", transactions);
        },
      });
    } catch (error) {
      console.log("error", error);
      alert(error.cause.reason);
    }
  }

  async function sharkMint() {
    try {
      const hash = await writeContract(config, {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "sharkMint",
        args: [
          BigInt(2),
          [
            "0x00314e565e0574cb412563df634608d76f5c59d9f817e85966100ec1d48005c0",
            "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63",
            "0x90a5fdc765808e5a2e0d816f52f09820c5f167703ce08d078eb87e2c194c5525",
            "0x51494c771c377610540e8b9b86186216a64dcf73a7ab57ec2c5953286f059f60",
          ],
        ],
        value: parseEther("0.000020"),
      });
      console.log("hash", hash);

      watchPendingTransactions(config, {
        onError(error) {
          console.log("Error", error);
        },
        onTransactions(transactions) {
          console.log("New transactions!", transactions);
        },
      });
    } catch (error) {
      console.log("error", error);
      alert(error.cause.reason);
    }
  }
  useEffect(() => {
    if (address) setStep(1);
  }, [address]);

  return showConnectBox && !address ? (
    <ConnectWallet />
  ) : (
    <div className=" md:w-[800px] w-[95%] mx-auto md:mx-0 md:h-[650px] h-auto border-2 border-[#15BFFD] rounded-[30px] flex flex-col justify-center  items-center  px-4">
      <p className=" my-[2rem] md:text-[40px] text-[24px]">
        Sharklist Mint site
      </p>
      <div className=" flex md:gap-[2rem] gap-[0.5rem]">
        <div className=" flex gap-[0.5rem]  ">
          <div
            className=" bg-[#15BFFD] md:w-[60px] md:h-[60px] h-[40px] w-[40px] rounded-full flex justify-center items-center md:text-[30px] text-[20px]"
            onClick={() => setStep(0)}
          >
            <GiCheckMark />
          </div>
          <div>
            <h2 className="md:text-[30px] text-[16px] font-semibold">First</h2>
            <p className=" text-[14px] ">Connect Wallet</p>
          </div>
        </div>
        <div>
          <div className=" flex gap-[0.5rem] ">
            <div className="  border-2 border-[#15BFFD] hover:bg-[#15BFFD] transition-all ease-linear delay-150 cursor-pointer md:w-[60px] md:h-[60px] h-[40px] w-[40px] rounded-full flex justify-center items-center md:text-[30px] text-[20px]">
              <p onClick={() => setStep(1)}>2</p>
            </div>
            <div>
              <h2 className="md:text-[30px] text-[16px] font-semibold">
                Second
              </h2>
              <p className=" text-[14px] ">Minting</p>
            </div>
          </div>
        </div>
        <div>
          <div className=" flex gap-[0.5rem] ">
            <div className=" border-2 border-[#15BFFD] hover:bg-[#15BFFD] transition-all ease-linear delay-150 cursor-pointer md:w-[60px] md:h-[60px] h-[40px] w-[40px] rounded-full flex justify-center items-center md:text-[30px] text-[20px]">
              3
            </div>
            <div>
              <h2 className="md:text-[30px] text-[16px] font-semibold">
                Final
              </h2>
              <p className=" text-[14px] ">Complete</p>
            </div>
          </div>
        </div>
      </div>
      {address ? (
        <div
          className={`${
            steps === 0
              ? " flex flex-col justify-center items-center"
              : "hidden"
          }`}
        >
          <Btn
            onClick={() => {
              disconnect();
            }}
            text={"Disconnect"}
            style={"w-[230px] my-[2rem] "}
          />
        </div>
      ) : (
        <div
          className={`${
            steps === 0
              ? " flex flex-col justify-center items-center"
              : "hidden"
          }`}
        >
          <Btn
            onClick={() => {
              setShowConnectBox(true);
            }}
            text={"Connect wallet"}
            style={"w-[230px] my-[2rem] "}
          />

          <p className="text-center md:text-[18px] text-[12px]">
            Contract Address <br /> 0x71da4d5805c1f2ecce2a41a9f9e026287f2b1f39
          </p>
        </div>
      )}
      <div
        className={`${
          steps === 1
            ? " flex flex-col justify-center items-center my-[2rem]"
            : "hidden"
        }`}
      >
        <p className="text-center md:text-[18px] text-[12px]">
          Connected <br /> to metamask
        </p>
        <p className="text-center md:text-[18px] text-[12px]">
          Blast maintained network
        </p>
        <p className="text-center md:text-[40px] text-[12px] font-bold text-[#15BFFD]">
          3333 / 3333
        </p>
        <p className="text-center md:text-[18px] text-[12px]">Mint is closed</p>
        <p className="text-center md:text-[18px] text-[12px]">
          You don&lsquo;t have allowist
        </p>
        <p className="text-center  text-[12px] my-4">
          Contract Address <br /> 0x71da4d5805c1f2ecce2a41a9f9e026287f2b1f39
        </p>
        <Btn
          onClick={() => {
            mint();
          }}
          text={"Og Mint"}
          style={"w-[230px] my-[2rem] "}
        />
        <Btn
          onClick={() => {
            sharkMint();
          }}
          text={"Shark Mint"}
          style={"w-[230px] my-[2rem] "}
        />
      </div>
    </div>
  );
};

export default Cards;
