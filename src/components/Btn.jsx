
// eslint-disable-next-line react/prop-types
const Btn = ({style , onClick , text,disabled=false}) => {
  return (
    <button disabled={disabled}  className={`flex text-[#15BFFD] md:text-[22px] text-[14px] h-[68px] border border-[#15BFFD] justify-center items-center  rounded-[10px] hover:bg-[#15BFFD] hover:text-[#fff] transition-all ease-in delay-200        hover:shadow-2xl hover:border-none md:mx-0 mx-auto ${style}`}   onClick={onClick}>{text}</button>
  )
}

export default Btn
