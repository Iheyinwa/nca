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
  const [, setFormData] = useState({});
  const navigate = useNavigate();

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
    const formData = {
      amount: data.amount,
      votes: data.amount / 50,
      church: districts[selectedDistrictIndex].name,
    };

    setFormData(formData);
    console.log(`Data: ${JSON.stringify(formData)}`);

    const paystackKey = import.meta.env.VITE_PUBLIC_KEY;
    const paystack = new PaystackPop();
    setShowPopup(false);

    const cleanedText = text.replace(/\s+/g, "");
    const cleanedChurchName = districts[selectedDistrictIndex].name.replace(
      /\s+/g,
      ""
    );

    paystack.newTransaction({
      key: paystackKey,
      email: data.email,
      amount: data.amount * 100,
      onSuccess: async (transaction) => {
        console.log(`Payment successful reference ${transaction.reference}`);
        setShowSuccess(true);

        // Update Firebase
        try {
          const districtRef = doc(db, "districtData", cleanedText);
          const churchRef = doc(districtRef, "churches", cleanedChurchName);

          // Create or update the district document
          await setDoc(districtRef, {}, { merge: true });

          // Update or create the church document
          await setDoc(
            churchRef,
            {
              amount: increment(data.amount),
              votes: increment(data.amount / 50),
            },
            { merge: true }
          );

          console.log(
            `Updated ${districts[selectedDistrictIndex].name} in ${cleanedText} district`
          );
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
            className="bg-[#49097B] justify-self-start rounded-full p-3 cursor-pointer"
            onClick={handleBackButtonClick}
          >
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
};

export default SelectedDistrict;
