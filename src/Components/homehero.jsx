import Logo from "../Assets/Images/NCA_HomeHero.png";
import HomeButton from "./homeButton";

const HomeHero = () => {
  return (
    <section className="flex justify-end items-center">
      <div className="flex lg:justify-between flex-col lg:flex-row lg:items-center md:w-[95%] lg:w-[90%] lg:gap-10">
        <section className="w-[93%] lg:w-[50%]">
          <p className="font-syne leading-[58px] text-[32px] md:text-[50px] font-extrabold">
            Cast Your Vote; Follow The Results
          </p>
          <div className="flex justify-start gap-4 items-center w-full my-6">
            <HomeButton
              text={"Vote"}
              color={"bg-[#000814]"}
              border={"border-[#000814]"}
              textColor={"text-white"}
              route={'vote'}
            />
            <HomeButton
              text={"Live Results"}
              border={"border-[#040EFF]"}
              textColor={"text-[#040EFF]"}
              route={'liveResults'}
              
            />
          </div>
        </section>
        <div className="w-full lg:w-fit h-fit ml-4 md:ml-0">
          <img
            src={Logo}
            alt="NCA"
            width={500}
            height={500}
            className="text-white w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
