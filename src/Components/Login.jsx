// rafce
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = ChatState();

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const data2pass = {
        email,
        password,
      };
      await fetch(`https://cc-yqsx.onrender.com/api/user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data2pass),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "User not found") {
            toast({
              title: "You can Register yourself with this Email",
              status: "info",
              duration: 3000,
              isClosable: true,
              position: "top-left",
            });
            toast({
              title: "No User found with this EmailID",
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top-left",
            });
          }
          if (data.message === "Login Successful") {
            toast({
              title: "Login Successful",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setTimeout(() => {
              navigate("/chat");
            }, 1500);
          }
        })
        .catch((err) => {
          toast({
            title: "Error Occured",
            description: err.message,
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
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Choose a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4rem">
            <Button
              size="sm"
              h="1.7rem"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="twitter"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="cyan"
        width="100%"
        onClick={() => {
          alert("On going process");
        }}
      >
        <img
          style={{ width: "42px" }}
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="Google"
        />
        Login with Google
      </Button>
      <Button
        variant="solid"
        colorScheme="blackAlpha"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Try as a Guest
      </Button>
    </VStack>
  );
};

export default Login;
