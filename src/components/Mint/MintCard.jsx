import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { GiCheckMark } from "react-icons/gi";
import Btn from "../Btn";
import ConnectWallet from "../../pages/ConnectWallet/ConnectWallet";
import { useEffect } from "react";
import {
  CONTRACT_ADDRESS,
  mint,
  mintOg,
  mintShark,
} from "../../utils/contract";
import { config } from "../../utils/config";
import { readContract } from "wagmi/actions";
import { ABI } from "../../utils/abi";
import { Step } from "./Step";
import { toast } from "react-toastify";

const MintCard = () => {
  const [current_step, setStep] = useState(0);

  const [minting, setMinting] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [totalSupply, setTotalSupply] = useState("0");
  const [ogStarted, setOGStarted] = useState(false);
  const [ogEnded, setOGEnded] = useState(false);
  const [sharkStarted, setSharkStarted] = useState(false);
  const [sharkEnded, setSharkEnded] = useState(false);
  // const { data: ensName } = useEnsName({ address });
  // const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const [showConnectBox, setShowConnectBox] = useState(false);
  async function read() {
    const totalSupply = await readContract(config, {
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "totalSupply",
    });
    const _ogStarted = await readContract(config, {
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "ogStarted",
    });
    const _ogEnded = await readContract(config, {
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "ogEnded",
    });
    const _sharkStarted = await readContract(config, {
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "sharkStarted",
    });
    const _sharkEnded = await readContract(config, {
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "sharkEnded",
    });

    setOGStarted(_ogStarted);
    setOGEnded(_ogEnded);
    setSharkStarted(_sharkStarted);
    setSharkEnded(_sharkEnded);

    setTotalSupply(BigInt(totalSupply).toString());
  }
  useEffect(() => {
    read();
  }, []);

  useEffect(() => {
    if (address) setStep(0);
  }, [address]);

  // eslint-disable-next-line react/prop-types
  const OgMintStep = ({ step: _step, mintFn, title }) => {
    return (
      <div
        className={`${
          current_step === _step
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
          3333 / {totalSupply}
        </p>
        <p className="text-center md:text-[18px] text-[12px]">Mint is closed</p>
        <p className="text-center md:text-[18px] text-[12px]">
          You don&lsquo;t have allowist
        </p>
        <p className="text-center   text-[12px] my-4">
          Contract Address <br /> {CONTRACT_ADDRESS}
        </p>
        <Btn
          disabled={minting}
          onClick={() => {
            mintFn();
          }}
          text={minting ? "Minting a Shark!" : title}
          style={`w-[230px] my-[2rem]  ${minting && "bg-gray-400"}`}
        />
      </div>
    );
  };

  const ConnectWalletStep = () => {
    return address ? (
      <div
        className={
          " flex flex-col justify-center items-center absolute right-4 bottom-4"
        }
      >
        <button
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </button>
      </div>
    ) : (
      <div
        className={`${
          current_step === 0
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
    );
  };

  return showConnectBox && !address ? (
    <ConnectWallet />
  ) : (
    <div className="py-8 md:w-[800px] w-[95%] mx-auto md:mx-0 md:h-[650px] h-auto border-2 border-[#15BFFD] rounded-[30px] flex flex-col justify-between  items-center  px-4">
      <div className="flex gap-6 flex-col items-center">
        <p className="md:text-[40px] text-[24px]">Sharklist Mint site</p>
        <div className=" flex md:gap-[2rem] gap-[0.5rem]">
          <Step
            step={current_step}
            setStep={setStep}
            steps={[
              {
                title: "First",
                description: "OG Mint",
                icon: <GiCheckMark />,
              },
              { title: "Second", description: "Shark Mint" },
              { title: "Third", description: "Public Mint" },
            ]}
          />
        </div>
      </div>
      {!current_step && <ConnectWalletStep />}
      {address && (
        <>
          {current_step == 0 ? (
            ogStarted && !ogEnded ? (
              <OgMintStep
                mintFn={async () => {
                  setMinting(true);
                  const data = await mintOg();
                  toast(data.reason, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  setMinting(false);
                  console.log("mint og data", data);
                }}
                title={"OG Mint"}
                step={0}
              />
            ) : (
              <div className={"flex-1 flex justify-center items-center"}>
                <h1 className={"text-3xl"}>
                  {!ogStarted
                    ? "OG mint not started yet!"
                    : ogStarted && ogEnded
                    ? "OG Mint has ended!"
                    : ""}
                </h1>
              </div>
            )
          ) : (
            <></>
          )}
          {current_step == 1 ? (
            sharkStarted && !sharkEnded ? (
              <OgMintStep
                mintFn={async () => {
                  setMinting(true);

                  const data = await mintShark();
                  toast(data.reason, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  console.log("mintShark data", data);
                  setMinting(false);
                }}
                title={"Shark Mint"}
                step={1}
              />
            ) : (
              <div className={"flex-1 flex justify-center items-center"}>
                <h1 className={"text-3xl"}>
                  {!sharkStarted
                    ? "Shark mint not started yet!"
                    : sharkStarted && sharkEnded
                    ? "Shark Mint has ended!"
                    : ""}
                </h1>
              </div>
            )
          ) : (
            <></>
          )}
          {current_step == 2 ? (
            sharkEnded ? (
              <OgMintStep
                mintFn={async () => {
                  const data = await mint();
                  toast(data.reason, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  console.log("mintShark data", data);
                }}
                title={"Public Mint"}
                step={2}
              />
            ) : (
              <div className={"flex-1 flex justify-center items-center"}>
                <h1 className={"text-3xl"}>Public mint not started yet!</h1>
              </div>
            )
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default MintCard;
