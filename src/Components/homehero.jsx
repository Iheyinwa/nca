// import Logo from "../Assets/Images/NCA_HomeHero.png";
// import HomeButton from "./homeButton";

const HomeHero = () => {
  return (
    <section className="flex lg:flex-row flex-col justify-center items-center gap-4  p-4 hero mx-4 rounded-[10px] lg:mx-10 h-screen">
      <div className="flex justify-center flex-col items-center w-full lg:w-1/2 h-full ">
        <section className="w-full">
          <p className=" leading-[58px] text-center lg:leading-[88px] text-4xl md:text-9xl font-extrabold font-poppins w-full ">
            IT&apos;S{" "}
            <span className="">
              TIME <div className="bg-[#D77709] w-full my-2 h-2"
              style={{
                backdropFilter: 'blur(4px)'
              }}
              ></div>
            </span>
          </p>
          <p className=" lg:leading-[88px]  text-center text-2xl md:text-4xl font-poppins">
            Cast Your Vote; Follow The Results
          </p>
          {/* <p className=" leading-[58px] text-center text-white text-4xl md:text-6xl font-extrabold ">
            Follow The Results
          </p> */}
          {/* <div className="flex justify-center gap-4 items-center w-full my-6">
            <HomeButton
              text={"Vote"}
              color={"bg-[#000]"}
              border={"border-[#000]"}
              textColor={"text-white"}
              route={"vote"}
              id={"voteButton"}
            />
            <HomeButton
              text={"Live Results"}
              border={"border-[#FF1010]"}
              textColor={"text-[#FF1010]"}
              route={"liveResults"}
              id="primaryButton"
            />
          </div> */}
        </section>
      </div>
      {/* <div className="w-full lg:w-1/2 h-full mx-auto">
        <img
          src={Logo}
          alt="NCA"
          width={200}
          height={200}
          className="text-white w-fit h-fit"
        />
      </div> */}
    </section>
  );
};

export default HomeHero;
