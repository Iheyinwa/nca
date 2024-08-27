import PropTypes from "prop-types";
import successIcon from "../Assets/Images/NCA_successIcon.png";

const SuccessModal = ({handleSuccessYes, handleSuccessNo}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-[#fff] p-4 md:p-8 w-[100%] md:w-[50%] rounded shadow-md flex flex-col gap-3">
        <div className="flex flex-col justify-center items-center">
          <div className="w-fit h-fit">
            <img
              src={successIcon}
              alt="Success"
              width={500}
              height={500}
              className="w-full h-full"
            />
          </div>
          <p className="font-syne font-extrabold md:text-[32px] text-[#000] lg:leading-[33px] my-2 text-center lg:w-[60%]">
            Congratulations! You have cast your vote
          </p>
        </div>
        <div
          className="bg-[#fff] flex flex-col h-fit justify-center items-center p-4 rounded-[10px]"
          style={{
            boxShadow: "0px 10px 4px 0px #00000040",
          }}
        >
          <p className="font-syne font-semibold md:text-2xl text-black lg:leading-[65px] my-2 text-center">
            Would you like to vote again?
          </p>
          <div className="flex justify-between items-center ">
            <button
              onClick={handleSuccessYes}
              className="bg-black text-[#fff] font-semibold py-2 px-4 rounded mr-2 md:text-[24px] w-full font-syne blackButtons"
            >
              Yes
            </button>
            <div className="w-full">
              <button
                onClick={handleSuccessNo}
                className="bg-black text-[#fff] font-semibold py-2 px-4 rounded mr-2 md:text-[24px] w-full font-syne blackButtons"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  handleSuccessYes: PropTypes.func,
  handleSuccessNo: PropTypes.func,
};
export default SuccessModal;
