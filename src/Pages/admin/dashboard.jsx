import TableOverview from "./components/tableOverview";
import Select from "react-select";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { customStyles } from "../../Data/data";
import { ImSpinner4 } from "react-icons/im";
import { Spin} from "antd";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrendingDistricts from "../../Components/trendingDistricts";
import TotalEarnings from "./components/totalEarnings";

const Dashboard = () => {
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Ikorodu District");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [, setIsModalOpen] = useState(false);

  const fetchChurchData = async (districtName) => {
    setIsLoading(true);
    try {
      const districtValue = districtName.replace(/\s+/g, "");
      const churchesRef = collection(
        db,
        `districtData/${districtValue}/churches`
      );
      const churchesSnap = await getDocs(churchesRef);

      const churchData = [];
      churchesSnap.forEach((doc) => {
        const church = doc.data();
        churchData.push({
          key: doc.id, 
          name: church.name,
          amount: `₦ ${church.amount}`,
          votes: church.votes,
        });
      });

      setData(churchData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching churches data:", error);
      setIsLoading(false);
    }
  };

  const handleChange = async (selectedOption) => {
    setSelectedOption(selectedOption.value);
    fetchChurchData(selectedOption.value);
  };


  
  useEffect(() => {
    const getDistrictList = async () => {
      try {
        const DistrictRef = collection(db, "districtData");
        const dataSnap = await getDocs(DistrictRef);

        const districtOption = [];
        dataSnap.forEach((doc) => {
          const formattedName = doc.id.replace(/District$/, " District");
          districtOption.push(formattedName);
        });

        setDistrictOptions(districtOption);

        // Fetch initial data for "Ikorodu District"
        fetchChurchData("Ikorodu District");
      } catch (error) {
        console.error("Error fetching district data:", error);
      }
    };

    getDistrictList();
  }, []); // Empty dependency array to run effect only once


  const handleOk = async (data, index) => {
    setConfirmLoading(true);
    const churchKey = data[index].key; // Retrieve the document ID
    const districtValue = selectedOption.replace(/\s+/g, "");

    try {
      // Delete the document using the document ID
      await deleteDoc(
        doc(db, `districtData/${districtValue}/churches`, churchKey)
      );
      setIsModalOpen(false);
      setConfirmLoading(false);
      console.log(`Deleted church: ${data[index].name}`);
      toast.success(`Successfully deleted! `, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Refresh data after deletion
      fetchChurchData(selectedOption);
    } catch (e) {
      console.error("Error deleting document:", e);
      setConfirmLoading(false);
      toast.error(`An error occurred! `, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section>
      <TotalEarnings />
      <hr />

      <section className="m-4 p-4">
        <p className="font-bold text-3xl font-syne py-2">Trending Districts</p>
        <TrendingDistricts />
      </section>

      <hr className="my-4" />

      <section className="m-4 p-4">
        <div>
          <p className="my-4 font-syne text-4xl font-bold">Voting Table</p>
          <Select
            options={districtOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            styles={customStyles}
            className="w-full text-center font-syne font-medium text-[#040000] text-[20px] md:text-[20px] lg:text-[20px] lg:leading-[40px] mb-10 h-full"
            placeholder="Please Select...."
            onChange={handleChange}
            value={{ label: selectedOption, value: selectedOption }} // Set initial value
          />
        </div>
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
          <TableOverview
            data={data}
            confirmLoading={confirmLoading}
            handleOk={handleOk}
          />
        )}
      </section>
    </section>
  );
};

export default Dashboard;
