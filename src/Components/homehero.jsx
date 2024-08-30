import voteHero from "../Assets/Images/votes.jpg";
import HomeButton from "./homeButton";

const HomeHero = () => {
  return (
    <section className="flex lg:flex-row flex-col justify-center items-center gap-4 p-4 hero mx-4 lg:mx-auto h-full">
      <div className="flex justify-between gap-4 flex-col lg:flex-row items-center lg:w-[85%] h-full">
        <section className="w-full flex justify-start flex-col gap-4">
          <p className="text-6xl md:text-8xl font-extrabold font-dmSerif tracking-wider">
            National
          </p>
          <p className="text-6xl md:text-8xl font-extrabold font-dmSerif tracking-wider relative inline-block w-fit">
            President
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#D77709]"
              style={{
                filter: "blur(15px)",
              }}
            ></div>
          </p>
          <p className="text-6xl md:text-8xl font-extrabold font-dmSerif tracking-wider relative inline-block w-fit">
            Trophy
          </p>
          {/* <p className="text-xl font-poppins tracking-wider">
            Cast Your Vote || Follow The Results
          </p> */}
          <div className="w-full sm:w-1/2 my-4">
            <HomeButton
              text={"Cast your vote"}
              color={"bg-[#D77709]"}
              route={"vote"}
              border={"border-[#D77709]"}
              textColor={"text-white"}
              id={"voteButton"}
            />
          </div>
        </section>
        <div className="w-full h-full rounded-full">
          <img
            src={voteHero}
            alt="vote"
            width={500}
            height={500}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
