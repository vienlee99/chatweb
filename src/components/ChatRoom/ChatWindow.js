import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip, Form, Input, Alert } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import React from "react";
import styled from "styled-components";
import Message from "./Message";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgba(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  padding: 2px 2px 2px 0;
  justify-content: between;
  align-items: center;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow({
  rooms,
  selectedRoomId,
  setSelectedRoomId,
  isOnclickRoomList,
}) {
  let selectedRoom = null;

  if (isOnclickRoomList) {
    selectedRoom = rooms.find((room) => room.id === selectedRoomId);
    // React.useMemo(
    //   () => rooms.find((room) => room.id === selectedRoomId),
    //   [rooms, selectedRoomId]
    // );
    console.log("SelectedRoom: ", selectedRoom);
  }

  return (
    <WrapperStyled>
      {isOnclickRoomList ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button icon={<UserAddOutlined />} type="text">
                Add
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                <Tooltip title="A">
                  <Avatar>A</Avatar>
                </Tooltip>
                <Tooltip title="B">
                  <Avatar>B</Avatar>
                </Tooltip>
                <Tooltip title="C">
                  <Avatar>C</Avatar>
                </Tooltip>
                <Tooltip title="D">
                  <Avatar>D</Avatar>
                </Tooltip>
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>

          <ContentStyled>
            <MessageListStyled>
              <Message
                text="test"
                photoURL={null}
                displayName="Cadis"
                createAt={323213123}
              ></Message>
              <Message
                text="test"
                photoURL={null}
                displayName="Cadis1"
                createAt={323213123}
              ></Message>
              <Message
                text="test"
                photoURL={null}
                displayName="Cadis2"
                createAt={323213123}
              ></Message>
              <Message
                text="test"
                photoURL={null}
                displayName="Cadis3"
                createAt={323213123}
              ></Message>
            </MessageListStyled>
            <FormStyled>
              <Form.Item>
                <Input
                  placeholder="Type your message"
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button type="primary">Send</Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Please select your room"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
