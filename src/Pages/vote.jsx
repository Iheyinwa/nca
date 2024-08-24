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

      const churchOptionsArray = [];
      churchNames.forEach((doc) => {
        churchOptionsArray.push(doc.id);
      });

      setChurchOptions(churchOptionsArray); // Update state here
      console.log(churchOptionsArray);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section>
      <section className="flex justify-center items-end absolute w-full bg-[#000012] h-[300px] my-6">
        <div className="flex flex-col justify-center items-center relative top-12 h-fit w-[90%] p-4 lg:w-[80%] xl:w-[50%] bg-[#49097B] rounded-[23px]">
          <p className="font-syne leading-[65px] text-center font-bold text-white text-2xl md:text-[30px] lg:text-[59px]">
            Cast your vote now
          </p>
          <div className="flex justify-center items-center my-4 gap-4 w-[90%]">
            <Link to="/liveResults">
              <button className="bg-[#FF4545] p-4 h-full rounded-[12px] inline-flex items-center gap-2 w-fit">
                <div className="bg-white rounded-full w-3 h-3"></div>
                <p className="text-white font-syne font-semibold text-xl md:text-[28px] text-center">
                  Live
                </p>
              </button>
            </Link>

            <p className="text-white font-syne font-medium text-xl md:text-[28px] lg:leading-[65px]">
              <Link to="/liveResults"> Follow Live Results</Link>
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center gap-4 relative top-[30rem] items-center w-[90%] lg:w-[80%] xl:w-[50%] mx-auto">
        {selectedOption ? (
          <SelectedDistrict text={selectedOption} churches={churchOptions} />
        ) : (
          <>
            <p className="font-syne leading-[65px] text-center font-bold text-2xl md:text-[30px] lg:text-[59px]">
              Choose your District
            </p>
            <Select
              options={districtOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              styles={customStyles}
              className="w-full text-center font-syne font-semibold text-[#040000] text-[20px] md:text-[30px] lg:text-[32px] lg:leading-[65px] mb-10 h-full"
              placeholder="Please Select..."
              onChange={handleChange}
            />
          </>
        )}
      </section>
    </section>
  );
};

export default Vote;
