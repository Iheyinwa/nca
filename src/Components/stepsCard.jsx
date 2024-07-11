import PropTypes from 'prop-types'

const StepsCard = ({count, content}) => {
  return (
    <div>
      <p className="font-syne font-bold text-[29px] leading-[65px]">Step {count}</p>
      <p className="font-poppins text-lg md:text-[21px] leading-[27px]">
        {content}
      </p>
    </div>
  );
}

StepsCard.propTypes = {
  count: PropTypes.string,
  content: PropTypes.string

};
export default StepsCard