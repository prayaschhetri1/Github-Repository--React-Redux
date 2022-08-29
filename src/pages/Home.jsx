import {
  Box,
  Flex,
  Input,
  Heading,
  Avatar,
  Center,
  Text,
  Stack,
  Button,
  Spinner,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Users from "../components/Users";
import { getData, getFollowers } from "./../redux/action";

const Home = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app?.user);
  const followers = useSelector((state) => state.app.followers);
  const isLoading = useSelector((state) => state.app.isLoading);
  const [allData, setAllData] = useState([]);
  const [repInput, setRepInput] = useState("");
  const handleInput = (e) => {
    if (e.charCode == 13) {
      dispatch(getData(task));
    }
  };
  useEffect(() => {
    if (data.length) {
      dispatch(getFollowers(data[0].owner.followers_url));
    }
  }, [data.length, dispatch, data]);

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/followers");
  };

  useEffect(() => {
    setAllData(data);
  }, [data]);

  if (isLoading) {
    return (
      <Flex m={"150px auto"} align={"center"} flexDirection="column">
        <Spinner size="xl" color="blue" />
        <Heading mt="10px" color={"blue"}>
          Loading...
        </Heading>
      </Flex>
    );
  }

  // Sort Functionality;
  const handleSort = (e) => {
    let value = e.target.value;
    if (value == "htl") {
      let newArr = data?.sort((a, b) => {
        return a.created_at - b.created_at;
      });
      setAllData([...newArr]);
    } else {
      let newArr = data?.sort((a, b) => {
        return b.created_at - a.created_at;
      });
      setAllData([...newArr]);
      console.log(newArr)

    }
  };
  return (
    <>
      <Box>
        <Flex
          p="15px 25px"
          bg="black"
          m="auto"
          justify={"space-between"}
          align="center"
        >
          <i className="fa-brands fa-github icon"></i>
          <Input
            width={{ base: "260px", md: "420px", lg: "500px" }}
            color={"white"}
            type="text"
            value={task}
            border="0.2px solid white"
            onChange={(e) => setTask(e.target.value)}
            placeholder="Search or jum to..."
            onKeyPress={(e) => handleInput(e)}
          />
          <Avatar
            src={data.length && data[0].owner.avatar_url}
            alt={"Avatar Alt"}
            width="37px"
            height={"37px"}
            pos={"relative"}
            _after={{
              content: '""',
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
        </Flex>
        {data.length > 0 ? (
          <Flex direction={"column"}>
            <Box width={"100%"}>
              <Center py={6}>
                <Box
                  maxW={"320px"}
                  w={"full"}
                  bg="grey.100"
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  p={6}
                  textAlign={"center"}
                >
                  <Avatar
                    size={"xl"}
                    src={data.length && data[0].owner.avatar_url}
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
                  />
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {data.length && data[0].owner.login}
                  </Heading>

                  <Text textAlign={"center"} color="grey" px={3}>
                    {data.length && data[0].owner.login}
                  </Text>

                  <Stack mt={8} direction={"row"} align="center" spacing={4}>
                    <Button
                      flex={1}
                      fontSize={"sm"}
                      rounded={"full"}
                      _focus={{
                        bg: "gray.200",
                      }}
                    >
                      following
                    </Button>
                    <Button
                      onClick={handleRedirect}
                      fontWeight={"700"}
                      cursor={"pointer"}
                    >
                      Followers {followers.length && followers.length}
                    </Button>
                  </Stack>
                </Box>
              </Center>
            </Box>
            <Flex
              justify={"space-between"}
              gap="10px"
              w={{ sm: "90%", md: "70%", lg: "50%" }}
              m="auto"
            >
              <Input
                type={"text"}
                border="none"
                width={"60%"}
                onChange={(e) => setRepInput(e.target.value)}
                borderBottom={"1px solid grey"}
                borderRadius="0px"
                placeholder="Search repository"
              />

              <Select flex={"1"} onChange={handleSort}>
                <option value="">Sort By Date</option>
                <option value="htl">Recent</option>
                <option value="lth">Oldest</option>
              </Select>
            </Flex>
            {allData.length &&
              allData
                .filter((item) => {
                  if (repInput === "") {
                    return item;
                  } else if (
                    item.name.toLowerCase().includes(repInput.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => {
                  return <Users key={item.id} item={item} />;
                })}
          </Flex>
        ) : null}
      </Box>
    </>
  );
};

export default Home;
