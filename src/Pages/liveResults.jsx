import { useState } from "react";
import Select from "react-select";
import LiveResultsCard from "../Components/liveResultsCard";

const LiveResults = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#DCDCDC",
      borderRadius: "15px",
      padding: "4px",
      textAlign: "center",
      fontWeight: "bold",
      fontFamily: "Syne",
      color: "#040000",
      marginBottom: "10px",
      height: "full",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#040000",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#040000",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      fontSize: "30px",
      color: "#040000",
    }),
    option: (provided) => ({
      ...provided,
      color: "#040000",
      backgroundColor: "#DCDCDC",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "15px",
      backgroundColor: "#DCDCDC",
      marginBottom: "10px",
    }),
    menuList: (provided) => ({
      ...provided,
      borderRadius: "15px",
      marginBottom: "10px",
    }),
  };

  const options = [
    { value: "Sango district", label: "Sango District" },
    { value: "Ikorodu District", label: "Ikorodu District" },
    { value: "Mainland District", label: "Mainland District" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <section>
      <section className="flex justify-center items-center absolute w-full bg-[#000012] h-[300px] my-6">
        <p className="text-white font-syne text-[32px] lg:text-[59px] leading-[65px] font-bold">
          Results
        </p>
      </section>
      <section className="flex flex-col justify-center gap-4 relative top-[30rem] items-center w-[90%] lg:w-[80%] xl:w-[50%] mx-auto">
        <>
          <p className="font-syne leading-[65px] text-center font-bold text-2xl md:text-[30px] lg:text-[59px]">
            Choose your District
          </p>
          <Select
            options={options}
            styles={customStyles}
            className="w-full text-center font-syne font-semibold text-[#040000] text-[20px] md:text-[30px] lg:text-[32px] lg:leading-[65px] mb-10 h-full"
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
