import PropTypes from "prop-types";
import InputField from "./inputField";
import { FaTimes } from "react-icons/fa";

const VotingModal = ({ handlePopupSubmit, handlePopupCancel}) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white p-8 rounded shadow-md flex flex-col">
        <div className="self-end cursor-pointer" onClick={handlePopupCancel}>
          <FaTimes className="text-red-700" size={24} />
        </div>
        <p className="font-syne font-bold text-[32px] text-[#0D0000]">
          Enter your contact details
        </p>
        <div className="my-2">
          <InputField
            type="tel"
            title="Phone"
            // props={{ ...register("firstName") }}
          />
          <InputField
            type="email"
            title="Email Address"
            // props={{ ...register("firstName") }}
          />
          {/* {errors.firstName && <Error error={errors.firstName.message} />} */}
          <InputField
            type="text"
            title="Amount"
            note="(₦50 per vote)"
            // props={{ ...register("firstName") }}
          />
        </div>
        <div className="w-full">
          <button
            onClick={handlePopupSubmit}
            className="bg-[#49097B] text-white font-semibold py-2 px-4 rounded mr-2 text-[30px] w-full font-inter"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};


VotingModal.propTypes = {
  handlePopupSubmit: PropTypes.func,
  handlePopupCancel: PropTypes.func
};
export default VotingModal;
