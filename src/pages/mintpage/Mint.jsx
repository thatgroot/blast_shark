import MintCard from "../../components/Mint/MintCard";
import "../styles.css";

const Mint = () => {
  return (
    <div className="bg-banner">
      <div>
        <h2 className="  md:text-[120px] text-[50px] font-bold text-center text-[#15BFFD] py-[2rem]">
          BLAST SHARK
        </h2>
      </div>
      <div className=" flex md:flex-row flex-col items-center md:h-[700px] h-auto md:gap-0 gap-[2rem]">
        <div>
          <img src="/mintpage/shark2.svg" alt="shark image" />
        </div>
        <div className={"relative"}>
            <MintCard/>
        </div>
        <div>
          <img src="/mintpage/shark1.svg" alt="shark image" />
        </div>
      </div>
    </div>
  );
};

export default Mint;
