import Logo from "../Assets/Images/NCA_Steps.png";
import StepsCard from "./stepsCard";

const Steps = () => {
  return (
    <section className="my-6">
      <div className="mx-4 md:mx-auto w-[95%] lg:w-[59%]">
        <p className="font-dmSerif tracking-wider text-4xl md:text-6xl leading-[60px] md:leading-[70px] font-bold text-center">
          Follow the instructions to cast your vote;
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-[90%] mx-auto my-4">
        <StepsCard
          count="1"
          content="Click Vote"
          className="lg:col-start-6 lg:col-span-2 lg:row-start-1 lg:row-end-2"
        />
        <div className="w-fit h-full lg:col-span-3 lg:row-start-1 lg:row-end-6">
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
          content="Select your District"
          className="lg:col-start-1 lg:col-span-2 lg:row-start-2 lg:row-end-3"
        />
        <StepsCard
          count="3"
          content="Click on the group you want to vote"
          className="lg:row-start-3 lg:row-span-1 lg:col-start-6 lg:col-span-2 "
        />
        <StepsCard
          count="4"
          content="Put in your email address and the amount you want to pay"
          className="lg:row-start-4 lg:row-span-1 lg:col-start-1 lg:col-span-2 "
        />
        <StepsCard
          count="5"
          content="Select your preferred payment method and make your payment"
          className="lg:row-start-5 lg:row-span-1 lg:col-start-6 lg:col-span-2 "
        />
      </div>
    </section>
  );
};

export default Steps;
