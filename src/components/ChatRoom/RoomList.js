import React, { useContext, useState } from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import useFirestore from "../../hooks/useFirestore";
import { AuthContext } from "../../Context/AuthProvider";
import AppContext from "antd/es/app/context";
import AddRoomModals from "../Modals/AddRoomModals";
import ChatWindow from "./ChatWindow";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  // const { rooms } = React.useContext(AppContext);
  // console.log("Rooms is: ", { rooms });
  // const { isAddRoomVisible, setIsAddRoomVisible } =
  //   React.useContext(AppContext);

  // console.log("AppContext values:", {
  //   isAddRoomVisible,
  //   setIsAddRoomVisible,
  //   rooms,
  // });
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  let isOnclickRoomList = false;
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };
  return (
    <Collapse ghost defaultActiveKey={[1]}>
      <PanelStyled header="List of room" key="1">
        {rooms.map((room) => (
          <LinkStyled
            key={room.id}
            onClick={() => {
              isOnclickRoomList = true;
              setSelectedRoomId(room.id);
            }}
          >
            {room.name}
          </LinkStyled>
        ))}
        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          Add room
        </Button>
        <AddRoomModals
          isVisible={isAddRoomVisible}
          setIsVisible={setIsAddRoomVisible}
        />
        <ChatWindow
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
          rooms={rooms}
          isOnclickRoomList={isOnclickRoomList}
        />
      </PanelStyled>
    </Collapse>
  );
}
