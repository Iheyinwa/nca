import PropTypes from 'prop-types'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const StepsCard = ({count, content}) => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div data-aos="fade-right" data-aos-delay="50">
      <p className="font-syne font-bold text-[29px] leading-[65px]">
        Step {count}
      </p>
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