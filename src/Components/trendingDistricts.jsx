import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ImSpinner4 } from "react-icons/im";
import { Spin } from "antd";

const TrendingDistricts = () => {
    const [trendingDistricts, setTrendingDistricts] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingDistricts = async () => {
        setIsLoading(true)
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
      } finally{
        setIsLoading(false)
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
                key={index}
                className="rounded-md w-full h-64 flex flex-col justify-center items-start border-2 p-4"
                style={{
                  boxShadow: "0px 4px 4px 0px #00000040",
                  borderColor: getRandomColor(),
                }}
              >
                <p className="font-bold text-2xl font-syne">
                  {district.districtName}
                </p>
                <p className="font-medium text-xl font-syne">
                  {district.churchName}
                </p>
                <p className="font-medium text-xl font-syne">
                  {district.votes} votes
                </p>
              </div>
            ))}
          </section>
          {trendingDistricts.length > 4 && (
            <button
              onClick={() => setViewMore(!viewMore)}
              className="text-blue-500 rounded-md float-right mt-4 p-4 font-medium text-lg"
            >
              {viewMore ? "View Less" : "View More"}
            </button>
          )}
        </>
      )}
    </>
  );
};

export default TrendingDistricts;
