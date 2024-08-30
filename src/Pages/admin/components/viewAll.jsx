import { Table, Image, Spin } from "antd";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ViewAll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const districtRef = collection(db, "districtData");
      const districtSnap = await getDocs(districtRef);

      let allData = [];

      for (const districtDoc of districtSnap.docs) {
        const districtName = districtDoc.id.replace(/\s+/g, "");
        const churchesRef = collection(
          db,
          `districtData/${districtName}/churches`
        );
        const churchesSnap = await getDocs(churchesRef);

        churchesSnap.forEach((doc) => {
          const church = doc.data();
          allData.push({
            key: doc.id,
            name: church.name,
            imageUrl: church.imageUrl,
            amount: church.amount, // Assuming amount is a number
            votes: church.votes,
          });
        });
      }

      setData(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Church Image",
      dataIndex: "imageUrl",
      render: (imageUrl) => (
        <Image
          width={100}
          src={imageUrl}
          alt="Church Image"
          preview={false}
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        />
      ),
    },
    {
      title: "Church",
      dataIndex: "name",
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Votes",
      dataIndex: "votes",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.votes - b.votes,
    },
  ];

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          style={{
            fontFamily: "Poppins",
          }}
          pagination={{ pageSize: 10 }} // Adjust page size if needed
          scroll={{ x: "max-content" }} // Enable horizontal scroll
        />
      )}
    </div>
  );
};

ViewAll.propTypes = {
  // No props needed as the data is fetched within the component
};

export default ViewAll;
