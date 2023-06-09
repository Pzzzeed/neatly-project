import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Image,
  Avatar,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import axios from "axios";
import { PhoneIcon, ChevronDownIcon, WarningIcon } from "@chakra-ui/icons";

const Nav_user = () => {
  const { logout } = useAuth();
  const userId = useAuth();
  const [userData, setUserData] = useState({});

  async function getUserData() {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(
        `${backend}/profile/${userId.UserIdFromLocalStorage}`
      );
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Flex
      bg="white"
      color="black"
      w="1440px"
      h="100px"
      px={150}
      alignItems="center"
      borderBottom="2px solid"
      borderColor="gray.300"
    >
      <RouterLink to="/">
        <Image src="/HomePage/logo.svg" w="167px" h="45px" mr={10} />
      </RouterLink>
      {window.location.pathname === "/" ? (
        <Flex flexGrow={1} alignItems="center">
          <Box ml={8}>
            <Link to="content" smooth={true} duration={1000}>
              <Text textStyle="b2" mr={5} cursor="pointer">
                About Neatly
              </Text>
            </Link>
          </Box>
          <Box ml={8}>
            <Link to="service" smooth={true} duration={1000}>
              <Text textStyle="b2" mr={5} cursor="pointer">
                Service & Facilities
              </Text>
            </Link>
          </Box>
          <Box ml={8}>
            <Link to="room-type" smooth={true} duration={1000}>
              <Text textStyle="b2" mr={5} cursor="pointer">
                Rooms & Suite
              </Text>
            </Link>
          </Box>
        </Flex>
      ) : (
        <Flex flexGrow={1} alignItems="center">
          <Box ml={8}>
            <RouterLink to="/">
              <Text textStyle="b2" mr={5} cursor="pointer">
                About Neatly
              </Text>
            </RouterLink>
          </Box>
          <Box ml={8}>
            <RouterLink to="/">
              <Text textStyle="b2" mr={5} cursor="pointer">
                Service & Facilities
              </Text>
            </RouterLink>
          </Box>
          <Box ml={8}>
            <RouterLink to="/">
              <Text textStyle="b2" mr={5} cursor="pointer">
                Rooms & Suite
              </Text>
            </RouterLink>
          </Box>
        </Flex>
      )}
      <Flex h="48px" alignItems="center">
        <Text textStyle="h5" color="green.700" fontWeight="700">
          Hello,
        </Text>
        <Text textStyle="h5" fontWeight="500" color="orange.500" ml={2}>
          {userData.fullname}
        </Text>
      </Flex>

      <Popover>
        <PopoverTrigger>
          <Image
            cursor="pointer"
            boxSize="50px"
            borderRadius="50%"
            src={userData.profile_picture}
            ml={4}
          />
        </PopoverTrigger>
        <PopoverContent
          w="200px"
          h="172px"
          _focus={{
            outlineStyle: "none",
            boxShadow: "none",
          }}
        >
          <PopoverArrow />
          <PopoverBody>
            <Box>
              <List>
                <RouterLink to="/profile">
                  <ListItem>
                    <Flex
                      h="37px"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box>
                        <Image
                          src="/HomePage/icon/icon_profile.svg"
                          boxSize="20px"
                        ></Image>
                      </Box>
                      <Box w="142px" ml="15px">
                        <Text textStyle="b2" color="gray.700">
                          Profile
                        </Text>
                      </Box>
                    </Flex>
                  </ListItem>
                </RouterLink>
                <RouterLink to="/payment-method">
                  <ListItem>
                    <Flex
                      h="37px"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box>
                        <Image
                          src="/HomePage/icon/icon_payment.svg"
                          boxSize="20px"
                        ></Image>
                      </Box>
                      <Box w="142px" ml="15px">
                        <Text textStyle="b2" color="gray.700">
                          Payment Method
                        </Text>
                      </Box>
                    </Flex>
                  </ListItem>
                </RouterLink>
                <RouterLink to="/history">
                  <ListItem>
                    <Flex
                      h="37px"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box>
                        <Image
                          src="/HomePage/icon/icon_menu.svg"
                          boxSize="20px"
                        ></Image>
                      </Box>
                      <Box w="142px" ml="15px">
                        <Text textStyle="b2" color="gray.700">
                          Booking History
                        </Text>
                      </Box>
                    </Flex>
                  </ListItem>
                </RouterLink>
                <RouterLink to="">
                  <ListItem>
                    <Flex
                      h="37px"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box>
                        <Image
                          src="/HomePage/icon/icon_logout.svg"
                          boxSize="20px"
                        ></Image>
                      </Box>
                      <Box w="142px" ml="15px">
                        <Button
                          variant="link"
                          onClick={() => {
                            logout();
                          }}
                        >
                          <Text textStyle="b2" color="gray.700">
                            Log out
                          </Text>
                        </Button>
                      </Box>
                    </Flex>
                  </ListItem>
                </RouterLink>
              </List>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Nav_user;
