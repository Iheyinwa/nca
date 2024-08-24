export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#DCDCDC",
    borderRadius: "15px",
    padding: "2px",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Syne",
    color: "#040000",
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
    fontSize: "20px",
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
    zIndex: 9999
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: "15px",
    marginBottom: "10px",
  }),
};
