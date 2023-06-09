import React, { useState, useEffect } from "react";
import Nav_user from "../Components/Nav_user";
import Footer from "../Components/Footer";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import moment from "moment";

const HistoryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const userId = useAuth();
  const [roomData, setRoomData] = useState([]);
  const [roomDetail, setRoomDetail] = useState([]);
  const [cancelIndex, setCancelIndex] = useState(null);
  async function getRoomData() {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(
        `${backend}/booking/${userId.UserIdFromLocalStorage}`
      );
      setRoomData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteRoom() {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      await axios.delete(
        `${backend}/booking/${userId.UserIdFromLocalStorage}/${roomData[cancelIndex].booking_detail_id}`
      );

      const newRoomData = [...roomData];
      newRoomData.splice(cancelIndex, 1);
      setRoomData(newRoomData);

      navigate("/cancel", { state: { cancelIndex, roomData } });
    } catch (error) {
      console.log(error);
    }
  }

  async function getRoomdetail(index) {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(
        `${backend}/rooms/room-type/${roomData[index].room_type_id}`
      );
      setRoomDetail(response.data.data);
      onOpen2(true);
    } catch (error) {
      console.log(error);
    }
  }

  function getBookingRoomdetail(index) {
    navigate("/changedate", { state: { index, roomData } });
  }

  useEffect(() => {
    getRoomData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex flexDirection="column" w="1440px" m="auto" bg="bg">
      <Box position="fixed" zIndex="10">
        <Nav_user />
      </Box>
      <Flex flexDirection="column" w="1440px" h="auto" mt="100px">
        <Text textStyle="h2" color="black" ml="150px" my="50px">
          Booking History
        </Text>
        {roomData?.map((room, index) => {
          const night =
            (new Date(room.check_out_date)?.getTime() -
              new Date(room.check_in_date)?.getTime()) /
            (1000 * 60 * 60 * 24);

          return (
            <Flex
              w="1120px"
              flexDirection="column"
              mt="50px"
              ml="150px"
              borderBottom="2px solid"
              borderColor="gray.300"
              pb={10}
              key={index}
            >
              <Box display="flex" flexDirection="row">
                <Image
                  src={room.room_picture[0]}
                  w="310px"
                  h="210px"
                  objectFit="cover"
                  borderRadius={9}
                />
                <Flex w="769px" flexDirection="column" ml="40px">
                  <Box display="flex" justifyContent="space-between">
                    <Text textStyle="h4" color="black">
                      {room.room_type_name}
                    </Text>
                    {room.cancellation_date === null ? (
                      <Box>
                        <Text textStyle="b1" color="gray.600">
                          Booking date:{" "}
                          {new Date(room.booking_date).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                            }
                          )}
                        </Text>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="end"
                      >
                        <Text textStyle="b1" color="gray.600">
                          Booking date:{" "}
                          {new Date(room.booking_date).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                            }
                          )}
                        </Text>
                        <Text textStyle="b1" color="gray.600">
                          Cancellation date:
                          {new Date(room.cancellation_date).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                            }
                          )}{" "}
                        </Text>
                      </Box>
                    )}
                  </Box>
                  <Box display="flex" mt="20px">
                    <Box>
                      <Text textStyle="b1" fontWeight="600">
                        Check-in
                      </Text>
                      <Text textStyle="b1">
                        {new Date(room.check_in_date).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                          }
                        )}{" "}
                        |{" "}
                        {room.booking_request[0]
                          ? "After 1:00 PM"
                          : "After 2:00 PM"}
                      </Text>
                    </Box>
                    <Box ml="40px">
                      <Text textStyle="b1" fontWeight="600">
                        Check-out
                      </Text>
                      <Text textStyle="b1">
                        {new Date(room.check_out_date).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                          }
                        )}{" "}
                        |{" "}
                        {room.booking_request[1]
                          ? "Before 12:00 PM"
                          : "Before 11:00 AM"}
                      </Text>
                    </Box>
                  </Box>
                  <Box mt="40px">
                    <Accordion allowToggle bg="gray.200" borderRadius="5px">
                      <AccordionItem>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            <Text textStyle="b1" fontWeight="600">
                              Booking Detail
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <Box display="flex" justifyContent="space-between">
                            <Text
                              textStyle="b1"
                              fontWeight="400"
                              color="gray.700"
                            >
                              {room.amount_guests} Guests ({night} Nights)
                            </Text>
                            <Box display="flex">
                              <Text
                                textStyle="b1"
                                fontWeight="400"
                                color="gray.700"
                              >
                                Payment success via
                              </Text>
                              <Text
                                ml={2}
                                textStyle="b1"
                                fontWeight="600"
                                color="gray.700"
                              >
                                {room.payment_type}
                              </Text>
                            </Box>
                          </Box>
                        </AccordionPanel>
                        <AccordionPanel pb={4}>
                          <Box display="flex" justifyContent="space-between">
                            <Flex w="100%" justify="space-between">
                              <Flex w="75%" justify="space-between">
                                <Text textStyle="b1" color="gray.700">
                                  {room.room_type_name}
                                </Text>
                                <Text
                                  w="25%"
                                  textStyle="b1"
                                  fontWeight="600"
                                  color="gray.700"
                                  textAlign="end"
                                >
                                  x {room.amount_rooms}
                                </Text>
                              </Flex>
                              <Text
                                textStyle="b1"
                                fontWeight="600"
                                color="gray.900"
                              >
                                {Number(
                                  room.total_price_per_room
                                ).toLocaleString("th-TH", {
                                  minimumFractionDigits: 2,
                                })}
                              </Text>
                            </Flex>
                          </Box>
                        </AccordionPanel>

                        {room.booking_request.map((arr, index) => {
                          if (typeof arr[1] === "number") {
                            return (
                              <AccordionPanel pb={4} key={index}>
                                <Flex w="100%" justify="space-between">
                                  <Flex w="75%" justify="space-between">
                                    <Text textStyle="b1" color="gray.700">
                                      {arr[0]
                                        .split("_")
                                        .map(
                                          (s) =>
                                            s.charAt(0).toUpperCase() +
                                            s.slice(1)
                                        )
                                        .join(" ")}
                                    </Text>
                                    <Text
                                      w="25%"
                                      textStyle="b1"
                                      fontWeight="600"
                                      color="gray.700"
                                      textAlign="end"
                                    >
                                      x {room.amount_rooms}
                                    </Text>
                                  </Flex>
                                  <Text
                                    textStyle="b1"
                                    fontWeight="600"
                                    color="gray.900"
                                  >
                                    {arr[1].toLocaleString("th-TH", {
                                      minimumFractionDigits: 2,
                                    })}
                                  </Text>
                                </Flex>
                              </AccordionPanel>
                            );
                          }
                        })}

                        <AccordionPanel pb={4}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            borderTop="1px solid"
                            color="gray.400"
                            pt={5}
                          >
                            <Text
                              textStyle="b1"
                              fontWeight="400"
                              color="gray.700"
                            >
                              Total
                            </Text>
                            <Text
                              textStyle="h5"
                              fontWeight="600"
                              color="gray.900"
                            >
                              THB{" "}
                              {(
                                night *
                                room.amount_rooms *
                                (Number(room.total_price_per_room) +
                                  room.booking_request.reduce(
                                    (sum, current) => {
                                      if (typeof current[1] === "number") {
                                        return sum + current[1];
                                      }
                                      return sum;
                                    },
                                    0
                                  ))
                              ).toLocaleString("th-TH", {
                                minimumFractionDigits: 2,
                              })}
                            </Text>
                          </Box>
                        </AccordionPanel>
                        <AccordionPanel
                          bg="gray.300"
                          h="88px"
                          borderBottomRadius="5px"
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-evenly"
                        >
                          <Text
                            textStyle="b1"
                            fontWeight="600"
                            color="gray.700"
                            mt={2}
                          >
                            Additional Request
                          </Text>

                          <Text
                            textStyle="b1"
                            fontWeight="400"
                            color="gray.700"
                            mt={1}
                          >
                            {room.booking_request.length > 0 &&
                            typeof room.booking_request[
                              room.booking_request.length - 1
                            ][1] === "string"
                              ? room.booking_request[
                                  room.booking_request.length - 1
                                ][1]
                              : "-"}
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                </Flex>
              </Box>
              {room.booking_status === "Cancel" ||
              moment().isAfter(moment(room.check_out_date)) ? null : (
                <Box w="1120px" display="flex" mt="20px">
                  <Box w="50%">
                    {moment(room.check_in_date)
                      .subtract(1, "days")
                      .isAfter(moment()) ? (
                      <Button
                        variant="ghost"
                        color="orange.600"
                        onClick={() => {
                          setCancelIndex(index);
                          onOpen();
                        }}
                      >
                        Cancel Booking
                      </Button>
                    ) : null}
                  </Box>

                  <Flex w="50%" justifyContent="flex-end" alignItems="center">
                    <Button
                      variant="ghost"
                      color="orange.500"
                      onClick={() => {
                        getRoomdetail(index);
                      }}
                      mr={5}
                    >
                      Room Detail
                    </Button>
                    {moment(room.check_in_date)
                      .subtract(3, "days")
                      .isAfter(moment()) ? (
                      <Button
                        variant="primary"
                        p="25px 25px"
                        onClick={() => {
                          getBookingRoomdetail(index);
                        }}
                      >
                        Change Date
                      </Button>
                    ) : null}
                  </Flex>
                </Box>
              )}

              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <Text color="black"> Cancel Booking</Text>
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    <Text textStyle="b1">
                      Are you sure you would like to cancel this booking?
                    </Text>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button
                      ref={cancelRef}
                      variant="secondary"
                      onClick={() => deleteRoom(index)}
                    >
                      Yes, I want to cancel
                    </Button>
                    <Button variant="primary" onClick={onClose} ml={3}>
                      No, Don’t Cancel
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Modal isOpen={isOpen2} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent h="840px" maxW="800px" style={{ left: "-6px" }}>
                  <ModalHeader p={0}>
                    <Flex w="800px" h="400px" justifyContent="center" mt={5}>
                      <Box w="600px" borderRadius="10px" overflow="hidden">
                        <Swiper
                          modules={[Navigation, Pagination]}
                          spaceBetween={1}
                          slidesPerView={1}
                          grabCursor={true}
                          centeredSlides={true}
                          initialSlide={0}
                          loop={true}
                          navigation={{
                            nextEl: ".button-next",
                            prevEl: ".button-prev",
                            clickable: true,
                          }}
                          pagination={{
                            dynamicBullets: true,
                          }}
                        >
                          {roomDetail?.room_picture?.map((picture, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <Image
                                  src={picture}
                                  w="640px"
                                  h="400px"
                                  objectFit="cover"
                                  borderRadius="10px"
                                ></Image>
                              </SwiperSlide>
                            );
                          })}

                          <Flex>
                            <Box>
                              <Image
                                w="50px"
                                ml={5}
                                src="/HomePage/icon/left-arrow.svg"
                                className="button-prev swiper-button-prev"
                              ></Image>
                            </Box>
                            <Box>
                              <Image
                                w="50px"
                                mr={5}
                                src="/HomePage/icon/right-arrow.svg"
                                className="button-next swiper-button-next"
                              ></Image>
                            </Box>
                          </Flex>
                        </Swiper>
                      </Box>
                    </Flex>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody p={0}>
                    <Flex w="800px" flexDirection="column" alignItems="center">
                      <Box
                        mt={10}
                        w="640px"
                        borderBottom="1px solid"
                        borderColor="gray.200"
                        pb={5}
                      >
                        <Box display="flex">
                          <Box display="flex" flexDirection="row">
                            <Box pr={2}>
                              <Text
                                textStyle="b1"
                                color="gray.700"
                                paddingRight="5px"
                              >
                                {roomDetail.amount_person} Person
                              </Text>
                            </Box>
                            <Box
                              borderX="1px solid"
                              borderColor="gray.500"
                              px={2}
                            >
                              <Text
                                textStyle="b1"
                                color="gray.700"
                                paddingRight="5px"
                              >
                                {roomDetail.bed_type}
                              </Text>
                            </Box>
                            <Box pl={2}>
                              <Text
                                textStyle="b1"
                                color="gray.700"
                                paddingRight="5px"
                              >
                                {roomDetail.room_size} sqm
                              </Text>
                            </Box>
                          </Box>
                        </Box>

                        <Text mt={3} textStyle="b1" color="gray.700">
                          {roomDetail.description}
                        </Text>
                      </Box>
                      <Flex w="640px" flexDirection="column" mt={5}>
                        <Text textStyle="b1" color="black">
                          Room Amenities
                        </Text>
                        <Flex w="640px" mt={3} ml={5}>
                          <Flex>
                            <UnorderedList mt="24px" w="300px">
                              {roomDetail.room_amenity
                                ?.slice(0, 7)
                                .map((amenity, index) => {
                                  return (
                                    <ListItem
                                      key={index}
                                      color="gray.700"
                                      textStyle="b1"
                                    >
                                      {amenity
                                        .split("_")
                                        .join(" ")
                                        .charAt(0)
                                        .toUpperCase() +
                                        amenity.split("_").join(" ").slice(1)}
                                    </ListItem>
                                  );
                                })}
                            </UnorderedList>
                            <UnorderedList mt="24px" w="300px">
                              {roomDetail.room_amenity
                                ?.slice(7)
                                .map((amenity, index) => {
                                  return (
                                    <ListItem
                                      key={index}
                                      color="gray.700"
                                      textStyle="b1"
                                    >
                                      {amenity
                                        .split("_")
                                        .join(" ")
                                        .charAt(0)
                                        .toUpperCase() +
                                        amenity.split("_").join(" ").slice(1)}
                                    </ListItem>
                                  );
                                })}
                            </UnorderedList>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Flex>
          );
        })}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default HistoryPage;
