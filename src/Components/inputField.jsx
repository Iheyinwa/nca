import PropTypes from "prop-types";
const InputField = ({ type, title, props, onChange, note }) => {
  return (
    <div className="my-2 flex flex-col gap-1 w-full">
      <div className="inline-flex gap-1 items-center w-fit">
        <label className="font-semibold text-[15px] font-syne">{title}</label>
        <p className="text-[14px] text-red-600 font-syne font-semibold">{note}</p>
      </div>
      <input
        type={type}
        className="border border-[#000000C4] font-syne rounded-[5px] h-[50px] p-2"
        {...props}
        onChange={onChange}
      />
    </div>
  );
};

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  note: PropTypes.string,
  type: PropTypes.string.isRequired,
  props: PropTypes.object,
  onChange: PropTypes.func,
};
export default InputField;
