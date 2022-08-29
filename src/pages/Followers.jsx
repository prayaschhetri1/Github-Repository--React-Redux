import React from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Avatar,
  Center,
  Text,
  Stack,
  Button,
  Link,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Followers = () => {
  const followers = useSelector((state) => state.app.followers);

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Box mt="50px">
      <Button
        onClick={handleRedirect}
        fontWeight={"700"}
        cursor={"pointer"}
        color="white"
        bg="black"
        fontSize={"24px"}
        p="27px"
        ml="10px"
      >
        GO BACK
      </Button>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }}>
        {followers.length &&
          followers.map((item) => {
            return (
              <Center py={6} key={item.id}>
                <Box
                  maxW={"320px"}
                  w={"full"}
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  p={6}
                  textAlign={"center"}
                >
                  <Avatar
                    size={"xl"}
                    alt={"Avatar Alt"}
                    mb={4}
                    pos={"relative"}
                    _after={{
                      content: '""',
                      w: 4,
                      h: 4,
                      bg: "green.300",
                      border: "2px solid white",
                      rounded: "full",
                      pos: "absolute",
                      bottom: 0,
                      right: 3,
                    }}
                    src={item.avatar_url}
                  />
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {item.login}
                  </Heading>

                  <Text textAlign={"center"} px={3}>
                    {item.login}
                  </Text>

                  <Stack
                    mt={8}
                    direction={"row"}
                    align="center"
                    justify={"center"}
                    spacing={4}
                  >
                    <Link href={item.html_url} target="_blank">
                      <Button
                        fontWeight={"700"}
                        cursor={"pointer"}
                        color="white"
                        bg="blue"
                      >
                        SEE PROFILE
                      </Button>
                    </Link>
                  </Stack>
                </Box>
              </Center>
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default Followers;
