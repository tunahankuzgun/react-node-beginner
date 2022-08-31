import { Button, Modal } from 'antd';
import React from 'react';

const MyModal = ({
  children,
  modalSubmitIcon = false,
  modalSubmitText = "Save",
  modalSubmitType = "primary",
  modalBackText = "Back",
  modalBackType = "primary",
  modalTitle = "",
  visible = false,
  loading = false,
  onClick = () => {}, // okay tusuna basinca
  onClose = () => {}, // cancel tusuna basinca
}) => {
  const handleOk = () => {
    onClick();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        visible={visible}
        title={modalTitle}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type={modalBackType} onClick={handleCancel}>
            {modalBackText}
          </Button>,
          <Button
            key="submit"
            type={modalSubmitType}
            loading={loading}
            onClick={handleOk}
          >
            {modalSubmitText}
            {modalSubmitIcon}
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};
export default MyModal;
