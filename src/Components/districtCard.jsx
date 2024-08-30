import PropTypes from "prop-types"

const DistrictCard = ({name, onClick, churchImage}) => {


  return (
    <div className="bg-[#000] rounded-[14px] w-full h-fit flex justify-evenly px-4 md:justify-center gap-3 items-center py-4 cursor-pointer" onClick={onClick}>
      <div className="rounded-[19px] w-32 h-32">
        <img
          src={churchImage}
          alt={name}
          width={150}
          height={150}
          className="rounded-[19px] w-full h-full object-cover"
        />
      </div>
      <p className="font-poppins font-medium text-white text-xl lg:text-[28px] leading-[65px] w-full ">
        {name}
      </p>
    </div>
  );
};

DistrictCard.propTypes = {
    name: PropTypes.string,
    churchImage: PropTypes.string,
    onClick: PropTypes.func
}
export default DistrictCard;
