import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ userExist, children }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data2Update, setData2Update] = useState({
    name: userExist.name,
    pic: userExist.pic,
    mobile: userExist.mobile ? userExist.mobile : 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = ChatState();

  const postDetails = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select a valid image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "first_chat_app");
      data.append("cloud_name", "dlz45puq4");

      await fetch(
        `https://api.cloudinary.com/v1_1/dlz45puq4/image/upload`,
        // { public_id: `${data}` },
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData2Update({ ...data2Update, pic: data.url.toString("") });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select a valid image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handelUpdate = async () => {
    await fetch(`https://cc-yqsx.onrender.com/api/user/${userExist._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${user.token}`,
      },
      body: JSON.stringify(data2Update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Data updated successfully") {
          toast({
            title: data.msg,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {
            user.userExist = data.user;
            userExist = data.user;
            localStorage.setItem("userInfo", JSON.stringify(user));
            setUser(user);
            navigate("/");
          }, 2000);
        }
      });
  };

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
        <ModalContent>
          <ModalHeader textAlign={"center"} color={"orange.600"}>
            Edit Your Details Here
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={{ base: "34px", md: "5px" }}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter Your Name"
                  value={data2Update.name}
                  onChange={(e) => {
                    const text = e.target.value;
                    if (text.length <= 25) {
                      setData2Update({ ...data2Update, name: text });
                    } else {
                      toast({
                        title: "The maximum limit is 25 letters",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "bottom",
                      });
                    }
                  }}
                  maxLength={25}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Mobile</FormLabel>
                <Input
                  type="email"
                  value={data2Update.mobile}
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    const mobile = e.target.value;
                    setData2Update({ ...data2Update, mobile: Number(mobile) });
                  }}
                />
              </FormControl>
              <FormControl id="pic">
                <FormLabel>Profile Picture</FormLabel>
                <Input
                  type="file"
                  p={1.5}
                  accept="image/*"
                  placeholder="Upload a Profile Picture"
                  onChange={(e) => {
                    postDetails(e.target.files[0]);
                  }}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              size={{ base: "sm", md: "md" }}
              colorScheme="blue"
              onClick={onClose}
              mr={2}
            >
              Close
            </Button>
            <Button
              size={{ base: "sm", md: "md" }}
              colorScheme="orange"
              onClick={() => {
                handelUpdate();
              }}
              isLoading={loading}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProfile;
