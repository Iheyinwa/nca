import Logo from "../Assets/Images/NCA_Steps.png";
import StepsCard from "./stepsCard";

const Steps = () => {
  return (
    <section className="my-6 md:my-12">
      <div className="mx-4 md:mx-auto w-[95%] lg:w-[59%]">
        <p className="font-syne font-extrabold text-[32px] md:text-[50px] text-center lg:leading-[65px]">
          Follow the instructions to cast your{" "}
          <span className="text-[#003566]"> vote</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 items-center w-[90%] mx-auto">
        <div className="w-fit h-fit">
          <img
            src={Logo}
            alt="NCA Steps"
            width={500}
            height={500}
            className="text-white w-full h-full"
          />
        </div>
        <section className="md:w-[40%]">
          <StepsCard
            count="1"
            content="Let your living waters Flow out of me Let your Holy Spirit overshadow me
        As it was in the beginning So let it be now"
          />
          <StepsCard
            count="2"
            content="Let your living waters Flow out of me Let your Holy Spirit overshadow me
        As it was in the beginning So let it be now"
          />
          <StepsCard
            count="3"
            content="Let your living waters Flow out of me Let your Holy Spirit overshadow me
        As it was in the beginning So let it be now"
          />
        </section>
      </div>
    </section>
  );
};

export default Steps;
