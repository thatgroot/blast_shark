import { GiCheckMark } from "react-icons/gi";

// eslint-disable-next-line react/prop-types
export const Step = ({ step, setStep, steps = [] }) => {
  return (
    <div className="flex md:gap-[2rem] gap-[0.5rem] cursor-pointer">
      {steps.map((item, index) => (
        <div
          key={index}
          onClick={() => setStep(index)}
          className="flex gap-[0.5rem]"
        >
          {step === index ? (
            <div className="  border-2 border-[#15BFFD] hover:bg-[#15BFFD] transition-all ease-linear delay-150 cursor-pointer md:w-[60px] md:h-[60px] h-[40px] w-[40px] rounded-full flex justify-center items-center md:text-[30px] text-[20px]">
              <p>{step}</p>
            </div>
          ) : (
            <div
              className={`bg-${
                step === index? "#15BFFD" : "inherit"
              } md:w-[60px] md:h-[60px] h-[40px] w-[40px] rounded-full flex justify-center items-center md:text-[30px] text-[20px]`}
            >
              <GiCheckMark />
            </div>
          )}
          <div>
            <h2 className="md:text-[30px] text-[16px] font-semibold">
              {item.title}
            </h2>
            <p className="text-[14px]">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
