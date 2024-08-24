import PropTypes from "prop-types";
import { db } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

const LiveResultsCard = ({ text }) => {
  const [newDistricts, setNewDistricts] = useState([]);
  const [noVotes, setNoVotes] = useState(false);

  useEffect(() => {
    const getVotes = async () => {
      try {
        const cleanedText = text.replace(/\s+/g, "");
        const districtRef = doc(db, "districtData", cleanedText);
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
      } catch (err) {
        console.error("Error getting documents:", err);
      }
    };

    console.log("Text prop:", text);
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
        <p className="text-center font-semibold text-xl">
          No voting accumulated
        </p>
      ) : (
        newDistricts.map((district, index) => (
          <div key={index}>
            {district && (
              <div
                className="rounded-[10px] flex flex-col justify-center items-center border-2 w-full py-4 my-5"
                style={{
                  boxShadow: "0px 4px 4px 0px #00000040",
                  borderColor: getRandomColor(),
                }}
              >
                <div className="w-[80%] md:w-[50%] flex flex-col justify-center items-center gap-3">
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
        ))
      )}
    </section>
  );
};

LiveResultsCard.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LiveResultsCard;
