import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa6";
import DistrictCard from "./districtCard";
import { useState } from "react";
import VotingModal from "./votingModal";
import SuccessModal from "./successModal";
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Assuming you have your Firebase setup here
import { doc, setDoc, increment } from "firebase/firestore";

const SelectedDistrict = ({ text, churches }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(null);
  const navigate = useNavigate();

  console.log(churches);

  const handleVoting = (index) => {
    console.log(`clicked ${index}`);
    setSelectedDistrictIndex(index);
    setShowPopup(true);
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  const handleSuccessYes = () => {
    setShowSuccess(false);
    navigate("/vote");
    window.location.reload();
  };

  const handleSuccessNo = () => {
    setShowSuccess(false);
    navigate("/");
  };

  const handleBackButtonClick = () => {
    window.location.reload();
  };

  const onSubmit = async (data) => {
    const paystackKey = import.meta.env.VITE_PUBLIC_KEY;
    const paystack = new PaystackPop();
    setShowPopup(false);

    const cleanedChurchName = churches[selectedDistrictIndex].name;

    paystack.newTransaction({
      key: paystackKey,
      email: data.email,
      amount: data.amount * 100,
      onSuccess: async (transaction) => {
        console.log(`Payment successful reference ${transaction.reference}`);
        setShowSuccess(true);

        // Update Firebase
        try {
          const districtRef = doc(db, "districtData", text);
          const churchRef = doc(districtRef, "churches", cleanedChurchName);

          await setDoc(
            churchRef,
            {
              amount: increment(data.amount),
              votes: increment(data.amount / 100),
            },
            { merge: true }
          );

          console.log(`Updated ${cleanedChurchName} in ${text} district`);
        } catch (e) {
          console.error("Error updating information: ", e);
        }
      },
      onCancel: () => {
        console.log("Transaction was not completed");
        setShowSuccess(false);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10 w-full">
        <div className="flex w-full items-center">
          <div
            className="bg-[#000] justify-self-start rounded-full p-3 cursor-pointer"
            onClick={handleBackButtonClick}
          >
            <FaArrowLeft color="white" size={25} />
          </div>
          <p className="font-dmSerif tracking-wider leading-[65px] font-bold text-[30px] md:text-[59px] mx-auto">
            {text}
          </p>
        </div>
        <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-3 my-4 md:my-6">
          {churches.map((church, index) => (
            <div key={index}>
              <DistrictCard
                name={church.name}
                churchImage={church.imageUrl || ""} // Access imageUrl from the church object
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
          onSubmit={onSubmit}
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
  text: PropTypes.string.isRequired,
  churches: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string, // Assuming imageUrl is optional
    })
  ).isRequired,
};

export default SelectedDistrict;
