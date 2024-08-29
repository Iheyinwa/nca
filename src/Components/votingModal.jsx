import PropTypes from "prop-types";
import InputField from "./inputField";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const VotingModal = ({onSubmit, handlePopupCancel}) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, amount };
    console.log(data)
    onSubmit(data);
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 lg:p-8 rounded shadow-md flex flex-col"
        style={{
          boxShadow: "0px 10px 4px 0px #00000040",
        }}
      >
        <div
          className="self-end cursor-pointer relative"
          onClick={handlePopupCancel}
        >
          <FaTimes className="text-red-700" size={24} />
        </div>
        <p className="font-dmSerif tracking-wider font-bold text-lg md:text-2xl lg:text-[32px] text-[#0D0000] py-2">
          The more votes you give <br />
          the higher the chances of winning
        </p>
        <div className="my-2">
          <InputField
            type="email"
            title="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="text"
            title="Amount"
            note="(₦50 per vote)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          className="bg-[#000] text-white font-semibold py-3 px-4 rounded relative overflow-hidden text-xl w-[100px] h-[40px] self-end font-poppins flex justify-center items-center gap-2 z-[1] blackButtons"
          style={{
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.103)",
            overflow: "hidden",
          }}
        >
          Pay
          <svg className="svgIcon" viewBox="0 0 576 512">
            <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};


VotingModal.propTypes = {
  onSubmit: PropTypes.func,
  handlePopupCancel: PropTypes.func
};
export default VotingModal;
