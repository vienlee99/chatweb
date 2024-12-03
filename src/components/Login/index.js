import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Button } from "antd";
import firebase, { auth, db } from "../../firebase/config";
import {
  FacebookAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { addDocument } from "../../firebase/service";

const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const handleFbLogin = async () => {
    const data = await signInWithPopup(auth, fbProvider);
    const user = data.user;
    const isNewUser = getAdditionalUserInfo(data).isNewUser;
    const providerId = getAdditionalUserInfo(data).providerId;

    if (isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.displayName,
        providerId: providerId,
      });
    }
  };

  return (
    <div>
      <Row justify={"center"} style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Login with Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
