import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/service";
import { AuthContext } from "../../Context/AuthProvider";
import { db } from "../../firebase/config";

export default function JoinRoomModal() {
  const { isJoinRoomVisible, setIsJoinRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    const rId = form.getFieldsValue().rId;
    // update members in current room
    const roomRef = db.collection("rooms").where("rId", "==", rId);

    roomRef
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const roomDoc = querySnapshot.docs[0];
          const currentMembers = roomDoc.data().members || [];
          const updatedMembers = [...currentMembers, uid];

          // Update room with new member
          roomDoc.ref
            .update({
              members: updatedMembers,
            })
            .then(() => {
              console.log("Members updated successfully");
            })
            .catch((error) => {
              console.error("Error updating members: ", error);
            });
        } else {
          console.log("No matching room found");
        }
      })
      .catch((error) => {
        console.error("Error getting room: ", error);
      });

    // reset form value
    form.resetFields();

    setIsJoinRoomVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();

    setIsJoinRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Join room"
        visible={isJoinRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room Id" name="rId">
            <Input placeholder="Input your room id" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
