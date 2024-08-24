import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomeButton = ({text, color, border, textColor, route}) => {
  return (
    <button
      className={`rounded-[10px] p-3 font-syne w-full lg:w-[40%] ${color} border ${border} ${textColor} text-[22px] leading-[33px] font-medium text-center`}
    >
      <Link to={route}>{text}</Link>
    </button>
  );
};

HomeButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  textColor: PropTypes.string,
  route: PropTypes.string,

};
export default HomeButton;
