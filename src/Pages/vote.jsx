import { useState, useEffect } from "react";
import Select from "react-select";
import SelectedDistrict from "../Components/selectedDistrict";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { customStyles } from "../Data/data.js";

const Vote = () => {
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [churchOptions, setChurchOptions] = useState([]); // Use state for church options

  useEffect(() => {
    const getDistrictList = async () => {
      try {
        const DistrictRef = collection(db, "districtData");
        const dataSnap = await getDocs(DistrictRef);

        const districtOption = [];
        for (const doc of dataSnap.docs) {
          const churchNamesRef = collection(
            db,
            `districtData/${doc.id}/churches`
          );
          const churchNamesSnap = await getDocs(churchNamesRef);

          if (!churchNamesSnap.empty) {
            // Check if the churches subcollection has any documents
            const formattedName = doc.id.replace(/District$/, " District");
            districtOption.push(formattedName);
          }
        }

        if (districtOption.length > 0) {
          setDistrictOptions(districtOption);
          console.log("District Options with churches:", districtOption);
        } else {
          console.log("No districts with churches found.");
        }
      } catch (error) {
        console.error("Error fetching district data:", error);
      }
    };


    getDistrictList();
  }, []);

  const handleChange = async (selectedOption) => {
    setSelectedOption(selectedOption.value);
    try {
      const churchNamesRef = collection(
        db,
        `districtData/${selectedOption.value.replace(/\s+/g, "")}/churches`
      );
      const churchNames = await getDocs(churchNamesRef);

       const churchOptionsArray = churchNames.docs.map((churchDoc) => {
         const data = churchDoc.data();
         return {
           church: churchDoc.id,
           ...data,
         };
       });

       setChurchOptions(churchOptionsArray);

      console.log(churchOptionsArray);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section>
      <section className="flex justify-center items-center bg-slate-200 h-[300px] lg:h-[500px] rounded-[10px]">
        <div className="flex flex-col justify-center items-center">
          <p className="font-dmSerif tracking-wider leading-[65px] text-center font-bold  text-5xl md:text-6xl lg:text-8xl">
            Cast your vote now
          </p>
          <div className="flex justify-center items-center my-4 gap-4 w-full relative">
            <Link to="/liveResults">
              <button className="bg-[#D70909] px-8 py-4 h-full rounded-[12px] w-full">
                <p className="relative font-poppins font-semibold text-xl md:text-[28px] text-center text-white viewLive flex justify-center items-center pl-6">
                  Live
                </p>
              </button>
            </Link>

            <p className="font-poppins font-medium text-xl md:text-[28px]">
              Follow Live Results
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center gap-4 items-center w-[90%] lg:w-[80%] mx-auto my-4">
        {selectedOption ? (
          <SelectedDistrict text={selectedOption} churches={churchOptions} />
        ) : (
          <>
            <div className="lg:h-[100px]"></div>
            <p className="font-dmSerif tracking-wider leading-[65px] text-center font-bold text-[22px] md:text-[24px] lg:text-[48px]">
              Choose your District
            </p>
            <Select
              options={districtOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              styles={customStyles}
              className="w-full text-center font-poppins font-semibold text-[#040000] text-[20px] md:text-[30px] lg:text-[32px] lg:leading-[65px] mb-10 h-full"
              placeholder="Please Select..."
              onChange={handleChange}
            />
          </>
        )}
      </section>
      <div className="h-[100px]"></div>
    </section>
  );
};

export default Vote;
