import {
  Heading,
  Center,
  Text,
  Stack,
  Flex,
  Image,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "./../redux/action";

const Repository = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app.user);
  const [currItem, setCurrItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(getData());
    }
  }, [data.length, dispatch]);

  useEffect(() => {
    if (id) {
      let temp = data?.find((item) => {
        return Number(item.id) === Number(id);
      });
      temp && setCurrItem(temp);
    }
  }, [data, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Flex m={"170px auto"} align={"center"} flexDirection="column">
        <Spinner size="xl" color="blue" />
        <Heading mt="10px" color={"blue"}>
          Loading...
        </Heading>
      </Flex>
    );
  }
  return (
    <Center py={6} className="repo">
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        align="center"
        direction={{ base: "column", md: "row" }}
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
          align="center"
        >
          <Heading fontSize={"30px"} fontFamily={"body"} width="80%">
            {currItem.name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {currItem.description}
          </Text>
          <Text textAlign={"center"} px={3}>
            Date : {currItem.created_at}
          </Text>
          <Text textAlign={"center"} px={3}>
            Language : {currItem.language}
          </Text>
          <Image
            width={"90%"}
            src="https://github.com/prayaschhetri1/portfolio-pictures/raw/master/Screenshot%20(172).png?raw=true"
          />
          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            align={"center"}
          ></Stack>
        </Stack>
      </Flex>
    </Center>
  );
};

export default Repository;
