// src/components/totalEarnings.js

import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const TotalEarnings = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);

  const calculateTotalEarnings = async () => {
    try {
      const districtRef = collection(db, "districtData");
      const districtSnap = await getDocs(districtRef);

      let total = 0;

      for (const districtDoc of districtSnap.docs) {
        const districtName = districtDoc.id.replace(/\s+/g, "");
        const churchesRef = collection(
          db,
          `districtData/${districtName}/churches`
        );
        const churchesSnap = await getDocs(churchesRef);

        churchesSnap.forEach((doc) => {
          const church = doc.data();
          total += church.amount;
        });
      }

      setTotalEarnings(total);
    } catch (error) {
      console.error("Error fetching earnings data:", error);
    }
  };

  useEffect(() => {
    calculateTotalEarnings();
  }, []);

  return (
      <section className="flex m-4 p-4 justify-between gap-4 items-center ">
        <div className="shadow-md rounded-md w-full h-64 flex flex-col justify-center items-start p-4">
          <p className="font-bold text-3xl font-dmSerif tracking-wider py-2">
            Total Earnings
          </p>
          <p className="font-medium text-xl font-poppins">
            ₦ {totalEarnings.toLocaleString()}
          </p>
        </div>
    </section>
  );
};

export default TotalEarnings;
