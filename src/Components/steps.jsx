import Logo from "../Assets/Images/NCA_Steps.png";
import StepsCard from "./stepsCard";

const Steps = () => {
  return (
    <section className="my-6">
      <div className="mx-4 md:mx-auto w-[95%] lg:w-[59%]">
        <p className="font-dmSerif tracking-wider text-5xl md:text-6xl leading-[60px] md:leading-[70px] font-bold text-center">
          Follow the instructions to cast your vote;
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:grid-rows-4 w-[90%] mx-auto my-4">
        <StepsCard
          count="1"
          content="Let your living waters Flow out of me Let your Holy Spirit overshadow me
        As it was in the beginning So let it be now"
          className="lg:col-start-6 lg:col-span-2 lg:row-start-1 lg:row-end-2"
        />
        <div className="w-fit h-full lg:col-span-3 lg:row-start-1 lg:row-end-4">
          <img
            src={Logo}
            alt="NCA Steps"
            width={300}
            height={300}
            className="text-white w-full h-full object-contain"
          />
        </div>
        <StepsCard
          count="2"
          content="Let your living waters Flow out of me Let your Holy Spirit overshadow me
        As it was in the beginning So let it be now"
          className="lg:col-start-1 lg:col-span-2 lg:row-start-2 lg:row-end-3"
        />
        <StepsCard
          count="3"
          content="Let your living waters Flow out of me Let your Holy Spirit overshadow me
        As it was in the beginning So let it be now"
          className="lg:row-start-3 lg:row-span-1 lg:col-start-6 lg:col-span-2 "
        />
      </div>
    </section>
  );
};

export default Steps;
