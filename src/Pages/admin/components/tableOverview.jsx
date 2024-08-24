import { Table, Button, Modal } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

const TableOverview = ({ data, handleOk, confirmLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState(null);

  const showModal = (index) => {
    setIsModalOpen(true);
    setSelectedChurch(index);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Churches",
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
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <>
          <Button
            danger
            ghost
            className="cursor-pointer inline-flex items-center border border-white shadow-md p-1 rounded-md"
            onClick={() => showModal(index)}
          >
            <MdDelete size={25} color="red" />
            <p className="text-red-700">Delete</p>
          </Button>
          <Modal
            title="Confirm Deletion"
            open={isModalOpen && selectedChurch === index}
            onOk={() => handleOk(data, selectedChurch)} // Pass data and index
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>Are you sure you want to delete {record.name}?</p>
          </Modal>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

TableOverview.propTypes = {
  data: PropTypes.array.isRequired,
  handleOk: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool,
};

export default TableOverview;
