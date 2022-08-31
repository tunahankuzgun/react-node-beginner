import { Button, Space, Table } from 'antd';
import { CheckOutlined, PlusOutlined, EditFilled , DeleteOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import "antd/dist/antd.css"; 
import axios from 'axios';
import MyModal from "./MyModal";
import { Link } from 'react-router-dom';

export const Add = ({ onSuccess }) => {
  const [details, setDetails] = useState({
    title: "",
    name: "",
    description: "",
    content: "",
    image: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const onPostAdd = useCallback(
    (details) => {
      try {
        setModalLoading(true);

        axios
          .post("http://localhost:3333/posts/", {
            title: details.title,
            description: details.description,
            name: details.name,
            content: details.content,
            image: details.image,
          })
          .then(function (response) {
            console.log(response);
            onSuccess();
          })
          .catch(function (error) {
            console.error(error);
          })
          .finally(function () {
            setTimeout(() => {
              setModalLoading(false);
              setModalVisible(false);
            }, 300);            
          });
      } catch (error) {
        console.error(error);
      }
    },
    [onSuccess]
  );

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(!modalVisible)}>
        Add <PlusOutlined />
      </Button>

      {modalVisible && (
        <MyModal
          modalSubmitType="primary"
          modalSubmitText="Add New"
          modalSubmitIcon={<PlusOutlined />}
          modalBackType="primary"
          modalBackText="Back"
          modalTitle="Please fill all blanks!"
          visible={modalVisible}
          loading={modalLoading}
          onClick={() => onPostAdd(details)}
          onClose={() => setModalVisible(false)}
        >
          <div>
            <p>Title:</p>
            <input
              placeholder="Title"
              value={details.title}
              onChange={(e) => {
                setDetails({ ...details, title: e.target.value });
              }}
            />

            <p>Name:</p>
            <input
              placeholder="Name"
              value={details.name}
              onChange={(e) => {
                setDetails({ ...details, name: e.target.value });
              }}
            />

            <p>Description:</p>
            <input
              placeholder="Description"
              value={details.description}
              onChange={(e) => {
                setDetails({ ...details, description: e.target.value });
              }}
            />

            <p>Content:</p>
            <input
              placeholder="Content"
              value={details.content}
              onChange={(e) => {
                setDetails({ ...details, content: e.target.value });
              }}
            />

            <p>Image:</p>
            <input
              placeholder="Image"
              value={details.image}
              onChange={(e) => {
                setDetails({ ...details, image: e.target.value });
              }}
            />
          </div>
        </MyModal>
      )}
    </>
  );
};

const Update = ({ defaultDetails, modalVisible, onSuccess, onClose }) => {
  const [details, setDetails] = useState({
    id: 0,
    title: "",
    name: "",
    description: "",
    content: "",
    image: "",
  });

  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setDetails(defaultDetails);
  }, [defaultDetails]);

  const onPostUpdate = useCallback(
    (details) => {
      try {
        setModalLoading(true);

        axios
          .put(`http://localhost:3333/posts/${details.id}`, {
            title: details.title,
            description: details.description,
            name: details.name,
            content: details.content,
            image: details.image,
          })
          .then(function (response) {
            console.log(response);
            onSuccess();
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            setTimeout(() => {
              setModalLoading(false);
              onClose();
            }, 300);
          });
      } catch (error) {
        console.error(error);
      }
    },
    [onSuccess, onClose]
  );

  return (
    <>
      {modalVisible && (
        <MyModal
          visible={modalVisible}
          loading={modalLoading}
          onClick={() => onPostUpdate(details)}
          onClose={onClose}
          modalSubmitType="primary"
          modalSubmitText="Update"
          modalSubmitIcon={<CheckOutlined />}
          modalBackType="primary"
          modalBackText="Back"
          modalTitle="Please fill all blanks!"
        >
          <div>
            <p>Title:</p>
            <input
              placeholder="Title"
              value={details.title}
              onChange={(e) => {
                setDetails({ ...details, title: e.target.value });
              }}
            />


            <p>Name:</p>
            <input
              placeholder="Name"
              value={details.name}
              onChange={(e) => {
                setDetails({ ...details, name: e.target.value });
              }}
            />
              
              <p>Description:</p>
              <input
                placeholder="Description"
                value={details.description}
                onChange={(e) => {
                  setDetails({ ...details, description: e.target.value });
                }}
              />

              <p>Content:</p>
              <input
                placeholder="Content"
                value={details.content}
                onChange={(e) => {
                  setDetails({ ...details, content: e.target.value });
                }}
              />

            <p>Image:</p>
            <input
              placeholder="Image"
              value={details.image}
              onChange={(e) => {
                setDetails({ ...details, image: e.target.value });
              }}
            />
          </div>
        </MyModal>
      )}
    </>
  );
};

const Delete = ({ record, modalVisible, onSuccess, onClose }) => {
  const [modalLoading, setModalLoading] = useState(false);

  const onPostDelete = useCallback(
    (recordId) => {
      try {
        setModalLoading(true);

        axios
          .delete(`http://localhost:3333/posts/${recordId}`)
          .then(function (response) {
            console.log(response);
            onSuccess();
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            setTimeout(() => {
              setModalLoading(false);
              onClose();
            }, 300);
          });
      } catch (error) {
        console.error(error);
      }
    },
    [onSuccess, onClose]
  );

  return (
    <>
      {modalVisible && (
        <MyModal
          visible={modalVisible}
          loading={modalLoading}
          onClick={() => onPostDelete(record.id)}
          onClose={onClose}
          modalSubmitType="danger"
          modalSubmitText="Delete"
          modalSubmitIcon={<DeleteOutlined />}
          modalBackType="primary"
          modalBackText="Back"
          modalTitle={`Delete post with id ${record.id}!`}
        >
          Do you really?
        </MyModal>
      )}
    </>
  );
};

const Tables = ({ dataSource, onSuccess = () => {} }) => {
  const [currentRecord, setCurrentRecord] = useState({});
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, record) => <Link to={"/posts/"+record.id}>{record.id}</Link> 
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setCurrentRecord({ ...record });
              setEditVisible(true);
            }}
          >
            Update <EditFilled  />
          </Button>
          <Button
            type="danger"
            onClick={() => {
              setCurrentRecord({ ...record });
              setDeleteVisible(true);
            }}
          >
            Delete <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Add onSuccess={onSuccess} />

      {editVisible && (
        <Update
          onSuccess={onSuccess}
          defaultDetails={currentRecord}
          modalVisible={editVisible}
          onClose={() => setEditVisible(false)}
        />
      )} 
      
      {deleteVisible && (
        <Delete
          onSuccess={onSuccess}
          record={currentRecord}
          modalVisible={deleteVisible}
          onClose={() => setDeleteVisible(false)}
        />
      )}

      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}; 

export default Tables;
