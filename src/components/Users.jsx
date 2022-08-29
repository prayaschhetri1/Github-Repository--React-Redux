import React from "react";

import { useNavigate } from "react-router-dom";
import {
  Heading,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

const Users = ({ item }) => {
  const navigate = useNavigate();
  const handleRepo = (id) => {
    navigate(`/repository/${id}`);
  };
  return (
    <Center py={6} className="repo" flex={1}>
      <Flex
        onClick={() => handleRepo(item.id)}
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px", lg: "80%" }}
        height={{ base: "400px", md: "340px", lg: "300px" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        boxSizing="border-box"
        padding={4}
      >
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="space-around"
          p={1}
          pt={2}
        >
          <Heading fontSize={"30px"} fontFamily={"body"} width="80%">
            {item.name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {item.description}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {item.created_at}
          </Text>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
              bg="teal"
              color="white"
              onClick={() => handleRepo(item.id)}
            >
              SEE MORE
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Center>
  );
};

export default Users;
