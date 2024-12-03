import React, { useContext, useState } from "react";
import { Form, Modal, Input } from "antd";
import AppContext from "antd/es/app/context";
import { addDocument } from "../../firebase/service";
import { AuthContext } from "../../Context/AuthProvider";

export default function AddRoomModals({ isVisible, setIsVisible }) {
  //const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log({ FormData: form.getFieldValue() });
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });

    form.resetFields();
    setIsVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsVisible(false);
  };
  return (
    <div>
      <Modal
        title="Create room"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room name" name="name">
            <Input placeholder="Type your room name"></Input>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input placeholder="Type your description"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
