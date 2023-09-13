import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Container,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

function LandingPage() {
  const { setUser } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUser(userInfo);
      navigate("/chat");
    } else navigate("/");
  }, [navigate]);

  return (
    <div style={{ width: "100%" }}>
      <Box
        bgGradient="linear(to-r, #ff0066, #ffcc33)"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Container maxW="container.lg" textAlign="center">
          <Image src="" alt="Company Logo" mb="4" width="100px" />
          <Heading as="h1" size="2xl" color="white">
            Welcome to the Home Page of <br /> Commu Cate
          </Heading>
          <Text mt={"2"} fontSize={"larger"} color={"MenuText"} fontWeight={"bold"}>Creating Connections that matter.</Text>
          <Text mt="4" fontSize="xl" color="white">
            Discover the amazing features of our product.
          </Text>
          <Stack direction="row" mt="8" spacing="4">
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => navigate("/home")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              colorScheme="white"
              size="lg"
              onClick={() => alert("Button clicked!")}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>
      <Box bg="white" py="8">
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h2" size="xl" mb="6">
            Key Features
          </Heading>
          <Stack
            direction={["column", "row"]}
            spacing={["6", "8"]}
            justifyContent="center"
            alignItems="center"
          >
            <FeatureCard
              title="Feature 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              icon=""
            />
            <FeatureCard
              title="Feature 2"
              description="Nullam eget ex nec urna placerat hendrerit."
              icon=""
            />
            <FeatureCard
              title="Feature 3"
              description="Praesent vel nisi vel lacus ultricies dictum."
              icon=""
            />
          </Stack>
        </Container>
      </Box>
      {/* Subscribe Section */}
      <Box bg="purple.900" color="white" py="8">
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h2" size="xl" mb="6">
            Subscribe to Our Newsletter
          </Heading>
          <Text fontSize="lg" mb="4">
            Stay up-to-date with our latest news and updates.
          </Text>
          <Button
            colorScheme="purple"
            size="lg"
            onClick={() => alert("Subscribe button clicked!")}
          >
            Subscribe Now
          </Button>
        </Container>
      </Box>
      {/* Testimonials Section */}
      <Box bg="gray.100" py="8">
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h2" size="xl" mb="6">
            Testimonials
          </Heading>
          <Stack
            direction={["column", "row"]}
            spacing={["6", "8"]}
            justifyContent="center"
          >
            <TestimonialCard
              name="John Doe"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ex nec urna placerat hendrerit."
            />
            <TestimonialCard
              name="Jane Smith"
              text="Praesent vel nisi vel lacus ultricies dictum."
            />
          </Stack>
        </Container>
      </Box>
      {/* Contact Section */}
      <Box bg="blue.900" color="white" py="8">
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h2" size="xl" mb="6">
            Contact Us
          </Heading>
          <Text fontSize="lg" mb="4">
            Have questions or need assistance? Contact us!
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => alert("Contact button clicked!")}
          >
            Contact Now
          </Button>
          <Flex mt="8" justifyContent="center">
            <SocialLink
              href="#"
              icon="data:image/png;base64,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"
              label="Twitter"
            />
            <SocialLink
              href="#"
              icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNpBlNOcLPLJQoAPZn6gj9JSuoZMbWXularg&usqp=CAU"
              label="Facebook"
            />
          </Flex>
        </Container>
      </Box>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <Box
      maxW="sm"
      bg="white"
      p="6"
      boxShadow="lg"
      rounded="lg"
      textAlign="center"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Image src={icon} alt={title} width="64px" height="64px" mb="4" />
      <Heading as="h3" size="lg" mb="2">
        {title}
      </Heading>
      <Text fontSize="md">{description}</Text>
    </Box>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <Link href={href} isExternal mx="2">
      <Image src={icon} alt={label} w="24px" h="24px" />
    </Link>
  );
}

function TestimonialCard({ name, text }) {
  return (
    <Box
      maxW="md"
      bg="white"
      p="6"
      boxShadow="lg"
      rounded="lg"
      textAlign="center"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Text fontSize="lg" mb="4">
        "{text}"
      </Text>
      <Text fontWeight="bold">{name}</Text>
    </Box>
  );
}

export default LandingPage;
