import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";

const RoomManagement = () => {
  const [room, setRoom] = useState([]);
  const [status, setStatus] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [index, setIndex] = useState(null);
  const [inputData, setInputData] = useState("");

  async function getAllRooms(data) {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const rs = await axios.get(`${backend}/rooms?keywords=${data}`);
      // console.log(rs.data.data);
      setRoom(rs.data.data);

      const tempStatus = [];
      for (let i = 0; i < rs.data.data.length; i++) {
        tempStatus.push(rs.data.data[i].room_status);
        setStatus(tempStatus);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getAllRooms(inputData);
  }, [inputData]);

  // console.log(status);

  function updateStatusArr(strStatus, index) {
    const newStatus = [...status]; // create a copy of the Status array
    newStatus[index] = strStatus; // modify the copy
    setStatus(newStatus); // update the state with the modified copy
  }

  // function search input แล้วแสดงข้อมูลหน้า page admin

  function handleSearch(event) {
    const input = event.target.value;
    setInputData(input);
    if (input === "") {
      setRoom([]);
      setInputData("");
    } else {
      getAllRooms(`%${input}%`);
    }
  }

  async function updateStatus(room_id, index) {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.put(`${backend}/rooms/${room_id}`, {
        room_status: status[index],
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    updateStatus(roomId, index);
  }, [status]);

  return (
    <Flex h="100vh" flexDirection="column">
      <Flex
        w="1200px"
        h="10%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text ml={20} textStyle="h5" color="black">
          Room Management
        </Text>
        <Box
          display="flex"
          w="320px"
          h="48px"
          border="1px solid"
          borderColor="gray.400"
          borderRadius={5}
          alignItems="center"
        >
          <Search2Icon boxSize={5} ml={3} color="#646D89" />
          <Input
            mr={20}
            w="320px"
            placeholder="Search..."
            border="none"
            value={inputData}
            onChange={handleSearch}
          ></Input>
        </Box>
      </Flex>

      <Flex
        bg="bg"
        h="90%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        pb={20}
        overflow="auto"
      >
        <Box w="1080px" display="flex" flexDirection="column" mt={55}>
          <Box
            display="flex"
            alignItems="center"
            bg="gray.300"
            w="1080px"
            h="41px"
            py={30}
          >
            <Box w="120px">
              <Text textAlign="center" textStyle="b2">
                Room no.
              </Text>
            </Box>
            <Box w="367px">
              <Text textAlign="center" textStyle="b2">
                Room type
              </Text>
            </Box>
            <Box w="300px">
              <Text textAlign="center" textStyle="b2">
                Bed Type
              </Text>
            </Box>
            <Box w="293px">
              <Text textAlign="center" textStyle="b2">
                Status
              </Text>
            </Box>
          </Box>
          {room.map((room, index) => {
            return (
              <Box
                display="flex"
                alignItems="center"
                bg="white"
                w="1080px"
                h="72px"
                borderBottom="1px solid"
                borderColor="gray.300"
                key={index}
                py={43}
              >
                <Box w="120px" border>
                  <Text textStyle="b1" color="black" textAlign="center">
                    {room.room_number}
                  </Text>
                </Box>
                <Box w="367px">
                  <Text textStyle="b1" color="black" textAlign="center">
                    {room.room_type_name}
                  </Text>
                </Box>
                <Box w="300px">
                  <Text textStyle="b1" color="black" textAlign="center">
                    {room.bed_type[0].toUpperCase() + room.bed_type.slice(1)}
                  </Text>
                </Box>
                <Box>
                  <Menu>
                    {status[index] === "Vacant" ? (
                      <MenuButton ml={110}>
                        <Box
                          h="29px"
                          bg="#E5FFFA"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          cursor="pointer"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#006753">
                            {status[index]}
                          </Text>
                        </Box>
                      </MenuButton>
                    ) : status[index] === "Dirty" ? (
                      <MenuButton ml={110}>
                        <Box
                          h="29px"
                          bg="#FFE5E5"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#A50606" cursor="pointer">
                            {status[index]}
                          </Text>
                        </Box>
                      </MenuButton>
                    ) : status[index] === "Out of Service" ? (
                      <MenuButton ml={110}>
                        <Box
                          h="29px"
                          bg="#F0F1F8"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#6E7288" cursor="pointer">
                            {status[index]}
                          </Text>
                        </Box>
                      </MenuButton>
                    ) : status[index] === "Occupied" ? (
                      <MenuButton ml={110}>
                        <Box
                          h="29px"
                          bg="#E4ECFF"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#084BAF" cursor="pointer">
                            {status[index]}
                          </Text>
                        </Box>
                      </MenuButton>
                    ) : null}

                    <MenuList boxShadow="2xl">
                      <MenuItem
                        onClick={() => {
                          updateStatusArr("Vacant", index);
                          setRoomId(room.room_id);
                          setIndex(index);
                        }}
                      >
                        <Box
                          h="29px"
                          bg="#E5FFFA"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          cursor="pointer"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#006753">
                            Vacant
                          </Text>
                        </Box>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          updateStatusArr("Dirty", index);
                          setRoomId(room.room_id);
                          setIndex(index);
                        }}
                      >
                        <Box
                          h="29px"
                          bg="#FFE5E5"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#A50606" cursor="pointer">
                            Dirty
                          </Text>
                        </Box>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          updateStatusArr("Out of Service", index);
                          setRoomId(room.room_id);
                          setIndex(index);
                        }}
                      >
                        <Box
                          h="29px"
                          bg="#F0F1F8"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#6E7288" cursor="pointer">
                            Out of Service
                          </Text>
                        </Box>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          updateStatusArr("Occupied", index);
                          setRoomId(room.room_id);
                          setIndex(index);
                        }}
                      >
                        <Box
                          h="29px"
                          bg="#E4ECFF"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px 10px"
                          borderRadius={5}
                        >
                          <Text textStyle="b1" color="#084BAF" cursor="pointer">
                            Occupied
                          </Text>
                        </Box>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Flex>
  );
};

export default RoomManagement;
