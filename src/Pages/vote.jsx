import { useState } from "react";
import Select from "react-select";
import SelectedDistrict from "../Components/selectedDistrict";

const Vote = () => {
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
      fontSize: "32px",
      lineHeight: "65px",
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
      <section className="flex justify-center items-end absolute w-full bg-[#000012] h-[300px] my-6">
        <div className="flex flex-col justify-center items-center relative top-12 h-fit w-[90%] p-4 lg:w-[80%] xl:w-[50%] bg-[#49097B] rounded-[23px]">
          <p className="font-syne leading-[65px] text-center font-bold text-white text-[30px] md:text-[59px]">
            Cast your vote now
          </p>
          <div className="flex justify-center items-center my-4 gap-4 w-[90%]">
            <button className="bg-[#FF4545] p-4 h-full rounded-[12px] inline-flex items-center gap-2 w-fit">
              <div className="bg-white rounded-full w-3 h-3"></div>
              <p className="text-white font-poppins font-semibold text-xl md:text-[28px] text-center">
                Live
              </p>
            </button>
            <p className="text-white font-poppins font-medium text-xl md:text-[28px] lg:leading-[65px]">
              Follow Live Results
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center gap-4 relative top-[30rem] items-center w-[90%] lg:w-[80%] xl:w-[50%] mx-auto">
        {selectedOption ? (
          <SelectedDistrict text={selectedOption.label} />
        ) : (
          <>
            <p className="font-syne leading-[65px] text-center font-bold text-[30px] md:text-[59px]">
              Choose your District
            </p>
            <Select
              options={options}
              styles={customStyles}
              className="w-full text-center font-syne font-semibold text-[#040000] text-[32px] leading-[65px] mb-10 h-full"
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
