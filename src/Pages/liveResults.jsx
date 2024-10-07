import { useState, useEffect } from "react";
import Select from "react-select";
import LiveResultsCard from "../Components/liveResultsCard";
import { customStyles } from "../Data/data";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const LiveResults = () => {
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

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
            const formattedName = doc.id.replace(/District$/, "District");
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

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <section>
      <section className="flex justify-center items-center bg-slate-200 h-[300px] lg:h-[500px] rounded-[10px]">
        <p
          className="font-dmSerif tracking-wider leading-[65px] text-center font-bold text-5xl md:text-6xl lg:text-8xl relative flex justify-center items-center pl-6 text-[32px] lg:text-[59px] viewLive"
          id="liveCard"
        >
          Live Results
        </p>
      </section>
      <section className="flex flex-col justify-center gap-4 items-center w-[90%] lg:w-[80%] mx-auto">
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
            placeholder="Please Select...."
            onChange={handleChange}
          />
        </>
        {selectedOption && <LiveResultsCard text={selectedOption.label} />}
      </section>
    </section>
  );
};

export default LiveResults;
