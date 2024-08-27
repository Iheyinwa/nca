import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomeButton = ({text, color, border, textColor, route, id, onClick}) => {
  return (
    <button
    id={id}
      className={`rounded-full p-3 w-full ${color} border ${border} ${textColor} shadow-md text-[22px] leading-[33px] font-bold text-center`}
      onClick={onClick}
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
  id: PropTypes.string,
  onClick: PropTypes.func,

};
export default HomeButton;
