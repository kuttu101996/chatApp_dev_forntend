import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../context/ChatProvider";
import EditProfile from "./EditProfile";

const ProfileModal = ({ userExist, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = ChatState();

  return (
    <div>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton icon={<ViewIcon />} display={"flex"} onClick={onOpen} />
      )}
      <Modal
        size={{ base: "xs", md: "xl" }}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent background={"current"} height={"auto"}>
          <ModalHeader
            fontSize={"30px"}
            display={"flex"}
            justifyContent={"center"}
            color={"#1da1f2"}
          >
            Profile View
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={userExist.pic}
              alt={userExist.name}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              mt={{ base: 3, md: 0 }}
              rowGap={{ base: 1.5, md: 3 }}
            >
              <Box
                display={"flex"}
                color={"gray.100"}
                fontSize={{ base: "17px", md: "20px" }}
              >
                <Text>Name : </Text>
                <Text paddingLeft={2} color={"#1da1f2"}>
                  {userExist.name}
                </Text>
              </Box>
              <Box
                display={"flex"}
                color={"gray.100"}
                fontSize={{ base: "17px", md: "20px" }}
              >
                <Text>Email : </Text>
                <Text
                  paddingLeft={2}
                  color={"#1da1f2"}
                  fontSize={{ base: "15px", md: "18px" }}
                >
                  {userExist.email}
                </Text>
              </Box>
              <Box
                display={"flex"}
                color={"gray.100"}
                fontSize={{ base: "17px", md: "20px" }}
              >
                <Text>Mobile : </Text>
                <Text paddingLeft={2} color={"#1da1f2"}>
                  {userExist.mobile ? userExist.mobile : ""}
                </Text>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              size={{ base: "sm", md: "md" }}
              colorScheme="blue"
              mr={2}
              onClick={onClose}
            >
              Close
            </Button>
            {user.userExist._id === userExist._id ? (
              <EditProfile userExist={userExist}>
                <Button size={{ base: "sm", md: "md" }}>Edit</Button>
              </EditProfile>
            ) : (
              ""
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
