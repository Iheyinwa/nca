import PropTypes from "prop-types";

const LiveResultsCard = ({ text }) => {
  const districts = [
    {
      districtName: "Sango District",
      churches: [
        {
          name: "church one",
          votes: "273 votes",
        },
        {
          name: "church two",
          votes: "300 votes", 
        },
      ],
    },
    {
      districtName: "Ikorodu District",
      churches: [
        {
          name: "church one ikorodu",
          votes: "273 votes",
        },
        {
          name: "church two ikorodu",
          votes: "400 votes",
        },
      ],
    },
  ];

   const getRandomColor = () => {
     const letters = "0123456789ABCDEF";
     let color = "#";
     for (let i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
     }
     return color;
   };

  return (
    <section className="w-full my-2">
      {districts.map((district, index) => {
        if (district.districtName === text) {
          return (
            <div
              key={index}
            >
              {district.churches.map((church, churchIndex) => (
                <div
                  key={churchIndex}
                  className="rounded-[10px] flex flex-col justify-center items-center border-2 w-full py-4 my-5"
                  style={{
                    boxShadow: '0px 4px 4px 0px #00000040',
                    borderColor: getRandomColor(),
                  }}
                >
                  <div className="w-[80%] md:w-[50%] flex flex-col justify-center items-center gap-3">
                    <p className="font-semibold text-xl md:text-[40px] text-center md:leading-[65px] font-poppins">
                      {church.name}
                    </p>
                    <div className="border border-black w-full"></div>
                    <p className="font-semibold text-xl md:text-[40px] text-center md:leading-[65px] font-poppins">
                      {church.votes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </section>
  );
};

LiveResultsCard.propTypes = {
  text: PropTypes.string,
};

export default LiveResultsCard;
