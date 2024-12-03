import React from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";

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

    .join-room {
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
    rooms,
    setIsAddRoomVisible,
    setSelectedRoomId,
    setIsJoinRoomVisible,
  } = React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };
  const handleJoinRoom = () => {
    setIsJoinRoomVisible(true);
  };

  return (
    <div>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header="Room List" key="1">
          {rooms.map((room) => (
            <LinkStyled
              key={room.id}
              onClick={() => setSelectedRoomId(room.id)}
            >
              {room.name}
            </LinkStyled>
          ))}
        </PanelStyled>
      </Collapse>
      <Button
        type="text"
        icon={<PlusSquareOutlined />}
        className="add-room"
        onClick={handleAddRoom}
        style={{ color: "white" }}
      >
        Add room
      </Button>
      <Button
        type="text"
        icon={<PlusSquareOutlined />}
        className="join-room"
        onClick={handleJoinRoom}
        style={{ color: "white" }}
      >
        Join room
      </Button>
    </div>
  );
}
