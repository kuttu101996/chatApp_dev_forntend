import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideComing from "../miscellaneous/SideComing";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, setUser } = ChatState();
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
      navigate("/chat");
    } else navigate("/");
  }, [navigate]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideComing />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        w={"100%"}
        h={"91vh"}
        p={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
