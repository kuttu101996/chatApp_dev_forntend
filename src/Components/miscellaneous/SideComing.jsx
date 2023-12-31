import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../chatCompo/ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import ConfirmationModal from "./ConfirmationModal";

const SideComing = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Write something to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `https://cc-yqsx.onrender.com/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load search result",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `https://cc-yqsx.onrender.com/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      await fetch(`https://cc-yqsx.onrender.com/api/user/deleteAccount`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message ===
            "User and associated chats/messages deleted successfully"
          ) {
            localStorage.removeItem("userInfo");
            toast({
              title:
                "Your account has been successfully deleted. Thank you for being a part of our community. We hope to see you again in the future.",
              status: "info",
              duration: 4000,
              isClosable: true,
              position: "top",
            });
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
        .catch((error) => {
          toast({
            title: "Error Occured",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        });
      setLoading(false);
      return;
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"Background"}
        w={"100%"}
        p={"7px 12px 7px 15px"}
      >
        <Tooltip label="Search User for Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px="10px">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text color={"#1da1f2"} fontSize={"2xl"} fontWeight={"bold"}>
          Communi-Cate
        </Text>
        <div>
          <Menu>
            <MenuButton paddingRight={"10px"}>
              {notification.length > 0 && (
                <h5
                  style={{
                    fontSize: "13px",
                    width: "50%",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    marginBottom: -12,
                    marginTop: "-5px",
                    marginLeft: "12px",
                  }}
                >
                  {notification.length}
                </h5>
              )}
              <BellIcon
                color={"#1da1f2"}
                fontSize={"2xl"}
                m={1}
                marginBottom={0}
                marginTop={0}
              />
            </MenuButton>
            <MenuList p={2}>
              {!notification.length && "No new Messages"}
              {notification.map((ele) => {
                return (
                  <MenuItem
                    key={ele._id}
                    p={1}
                    mb={notification.length > 1 ? 1 : 0}
                    _hover={{ backgroundColor: "#E8E8E8" }}
                    onClick={() => {
                      setSelectedChat(ele.chat);
                      setNotification(
                        notification.filter(
                          (perticularNoti) => perticularNoti !== ele
                        )
                      );
                    }}
                  >
                    {ele.chat.isGroupChat
                      ? `New message in ${ele.chat.chatName}`
                      : `Message from ${ele.sender.name}`}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              marginTop={"3px"}
              padding={2}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.userExist.name}
                src={user.userExist.pic}
              />
            </MenuButton>
            <MenuList color={"grey"}>
              <ProfileModal userExist={user.userExist}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              <MenuDivider />
              <ConfirmationModal handleFunction={() => handleDeleteAccount()}>
                <MenuItem>Delete My Account</MenuItem>
              </ConfirmationModal>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"5px"}>Search User</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by Name or Email"
                mr={2}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              <>
                {searchResult.map((item) => {
                  return (
                    <UserListItem
                      key={item._id}
                      user={item}
                      handleFunction={() => accessChat(item._id)}
                    />
                  );
                })}
              </>
            )}
            {loadingChat && <Spinner display={"flex"} ml={"auto"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideComing;
