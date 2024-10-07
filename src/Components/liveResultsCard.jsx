import PropTypes from "prop-types";
import { db } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LiveResultsCard = ({ text }) => {
  const [newDistricts, setNewDistricts] = useState([]);
  const [noVotes, setNoVotes] = useState(false);

  useEffect(() => {
    const getVotes = async () => {
      try {
        const districtRef = doc(db, "districtData", text);
        const churchCollectionRef = collection(districtRef, "churches");

        const churchSnapshot = await getDocs(churchCollectionRef);

        if (churchSnapshot.empty) {
          console.log("No matching churches.");
          setNoVotes(true);
          return;
        }

        const churches = churchSnapshot.docs.map((churchDoc) => {
          const data = churchDoc.data();
          return {
            church: churchDoc.id,
            ...data,
          };
        });

        setNewDistricts(churches);
        setNoVotes(false);
        console.log("Matching Churches:", churches);

        AOS.init({
          duration: 200,
        });
      } catch (err) {
        console.error("Error getting documents:", err);
      }
    };

    getVotes();
  }, [text]);

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
      {noVotes ? (
        <p className="text-center font-poppins font-semibold text-xl">
          No voting accumulated
        </p>
      ) : (
        <div
          className={`grid gap-4 ${
            newDistricts.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {newDistricts.map((district, index) => (
            <div key={index}>
              {district && (
                <div
                  className="rounded-[10px] flex flex-col justify-center items-center border-2 w-full py-4 my-2"
                  style={{
                    boxShadow: "0px 4px 4px 0px #00000040",
                    borderColor: getRandomColor(),
                  }}
                  data-aos="zoom-in"
                  data-aos-duration="700"
                  data-aos-delay="50"
                >
                  <div className="w-[80%] flex flex-col items-center gap-3">
                    <p className="font-semibold text-xl md:text-[40px] text-center md:leading-[65px] font-poppins">
                      {district.church}
                    </p>
                    <div
                      className="border w-full"
                      style={{
                        borderColor: getRandomColor(),
                      }}
                    ></div>
                    <p className="font-semibold text-xl md:text-[40px] text-center md:leading-[65px] font-poppins">
                      {district.votes} votes
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

LiveResultsCard.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LiveResultsCard;
