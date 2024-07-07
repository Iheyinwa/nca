import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa6";
import DistrictCard from "./districtCard";
import { useState } from "react";
import VotingModal from "./votingModal";
import SuccessModal from "./successModal";
import { useNavigate } from "react-router-dom";

const districts = [
  {
    name: "Church One",
    title: "One",
  },
  {
    name: "Church Two",
    title: "Two",
  },
  {
    name: "Church Three",
    title: "Three",
  },
];

const SelectedDistrict = ({ text }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(null);

  const navigate = useNavigate();

  const handleVoting = (index) => {
    console.log(`clicked ${index}`);
    setSelectedDistrictIndex(index);
    setShowPopup(true);
  };

  const handlePopupSubmit = () => {
    setShowPopup(false);
    setShowSuccess(true);
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  const handleSuccessYes = () => {
    setShowSuccess(false);
    navigate("/vote");
  };

  const handleSuccessNo = () => {
    setShowSuccess(false);
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10 w-full">
        <div className="flex w-full items-center">
          <div className="bg-[#49097B] justify-self-start rounded-full p-3">
            <FaArrowLeft color="white" size={25} />
          </div>
          <p className="font-syne leading-[65px] font-bold text-[30px] md:text-[59px] mx-auto">
            {text}
          </p>
        </div>
        <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-3 my-4">
          {districts.map((district, index) => (
            <div key={index}>
              <DistrictCard
                name={district.name}
                onClick={() => handleVoting(index)}
              />
            </div>
          ))}
        </section>
      </div>
      {showPopup && (
        <VotingModal
          index={selectedDistrictIndex}
          handlePopupCancel={handlePopupCancel}
          handlePopupSubmit={handlePopupSubmit}
        />
      )}
      {showSuccess && (
        <SuccessModal
          handleSuccessYes={handleSuccessYes}
          handleSuccessNo={handleSuccessNo}
        />
      )}
    </>
  );
};

SelectedDistrict.propTypes = {
  text: PropTypes.string,
};

export default SelectedDistrict;
