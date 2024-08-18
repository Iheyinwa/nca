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
      <form onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md flex flex-col"
        style={{
          boxShadow: "0px 10px 4px 0px #00000040",
        }}
      >
        <div className="self-end cursor-pointer" onClick={handlePopupCancel}>
          <FaTimes className="text-red-700" size={24} />
        </div>
        <p className="font-syne font-bold text-lg md:text-2xl lg:text-[32px] text-[#0D0000]">
          Enter your contact details
        </p>
        <div className="my-2">
          <InputField
            type="tel"
            title="Phone"
            // onChange={(e) => setPhoneNumber(e.target.value)}

            // props={{ ...register("firstName") }}
          />
          <InputField
            type="email"
            title="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            // props={{ ...register("firstName") }}
          />
          {/* {errors.firstName && <Error error={errors.firstName.message} />} */}
          <InputField
            type="text"
            title="Amount"
            note="(₦50 per vote)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}

            // props={{ ...register("firstName") }}
          />
        </div>
          <button
            
            className="bg-[#49097B] text-white font-semibold py-2 px-4 rounded text-xl md:text-[30px] w-full font-inter"
          >
            Pay Now
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
