import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ImSpinner4 } from "react-icons/im";
import { Spin } from "antd";
import PropTypes from "prop-types";
import HomeButton from "./homeButton";


const TrendingDistricts = ({ dataAos, dataAosDuration, dataAosDelay }) => {
  const [trendingDistricts, setTrendingDistricts] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingDistricts = async () => {
      setIsLoading(true);
      const trendingData = [];
      try {
        const districtRef = collection(db, "districtData");
        const districtSnap = await getDocs(districtRef);

        for (const districtDoc of districtSnap.docs) {
          const districtName = districtDoc.id.replace(/District$/, " District");
          const churchesRef = collection(
            db,
            `districtData/${districtDoc.id}/churches`
          );
          const churchesSnap = await getDocs(churchesRef);

          let maxVotes = -1;
          let topChurch = null;

          churchesSnap.forEach((churchDoc) => {
            const church = churchDoc.data();
            if (church.votes > maxVotes) {
              maxVotes = church.votes;
              topChurch = {
                name: church.name,
                votes: church.votes,
              };
            }
          });

          if (topChurch) {
            trendingData.push({
              districtName,
              churchName: topChurch.name,
              votes: topChurch.votes,
            });
          }
        }

        setTrendingDistricts(trendingData);
      } catch (error) {
        console.error("Error fetching trending districts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingDistricts();
  }, []);

  const displayedDistricts = viewMore
    ? trendingDistricts
    : trendingDistricts.slice(0, 4);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spin
            indicator={
              <ImSpinner4
                style={{
                  fontSize: 24,
                  display: "flex",
                  alignItem: "center",
                }}
                className="animate-spin"
              />
            }
          />
        </div>
      ) : (
        <>
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {displayedDistricts.map((district, index) => (
              <div
                data-aos={dataAos}
                data-aos-duration={dataAosDuration}
                data-aos-delay={dataAosDelay}
                key={index}
                className="rounded-md w-full h-64 flex flex-col justify-center items-center relative overflow-hidden z-[1111]"
                style={{
                  boxShadow: "0px 4px 4px 0px #00000040",
                }}
              >
                <div
                  className="flex flex-col justify-center items-center absolute z-[2] overflow-hidden p-2 w-full h-full rounded-md top-[5px] left-[6px] bottom-[5px]"
                  style={{
                    backdropFilter: "blur(24px)",
                    background: "rgba(255, 255, 255, .95)",
                    outline: '2px solid white'
                  }}
                >
                  <p className="font-bold text-2xl font-poppins">
                    {district.districtName}
                  </p>
                  <p className="font-medium text-xl font-poppins">
                    {district.churchName}
                  </p>
                  <p className="font-medium text-xl font-poppins">
                    {district.votes} votes
                  </p>
                </div>
                <div
                  className="blob"
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                ></div>
              </div>
            ))}
          </section>
          {trendingDistricts.length > 4 && (
            <HomeButton
              text={viewMore ? "View Less" : "View More"}
              color={"bg-[#000]"}
              border={"border-[#000]"}
              textColor={"text-white"}
              id={"more"}
              onClick={() => setViewMore(!viewMore)}
            />
          )}
        </>
      )}
    </>
  );
};

TrendingDistricts.propTypes = {
    dataAos: PropTypes.string,
    dataAosDuration: PropTypes.string,
    dataAosDelay: PropTypes.string,
}
export default TrendingDistricts;
