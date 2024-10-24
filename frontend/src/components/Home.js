// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Flex,
//   Text,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";
// import Auth from "./Authentication/Auth";
// import { useContext } from "react";
// import chatContext from "../context/chatContext";
// import { Link, useNavigate } from "react-router-dom";

// const Home = () => {
//   // Accessing chat context
//   const context = useContext(chatContext);

//   // Using Chakra UI hook for modal
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   // State for keeping track of index for login/signup in modal
//   const [index, setindex] = useState();
//   const navigator = useNavigate();

//   // Redirect to dashboard if already authenticated
//   useEffect(() => {
//     if (context.isauthenticated) {
//       navigator("/dashboard");
//     }
//   }, [context.isauthenticated, navigator]);

//   // Function to open login modal
//   const handleloginopen = () => {
//     setindex(0);
//     onOpen();
//   };

//   // Function to open signup modal
//   const handlesignupopen = () => {
//     setindex(1);
//     onOpen();
//   };

//   return (
//     <Box h={"max-content"} verticalAlign="middle">
//       <Flex direction="column" align="center" justify="center" minH="80vh">
//         <Box textAlign="center">
//           <Text fontSize={"7xl"} fontWeight={"bold"} fontFamily={"Work sans"}>
//             Chatterbox
//           </Text>
//           <Text fontSize="xl" fontWeight="bold" mb={4}>
//             Online Chatting App
//           </Text>
//           <Button mr={3} onClick={handleloginopen}>
//             Login
//           </Button>
//           <Button colorScheme="purple" onClick={handlesignupopen}>
//             Sign Up
//           </Button>
//         </Box>
//       </Flex>
//       {/* Copyright */}
//       <Text
//         fontSize="sm"
//         position={"fixed"}
//         bottom={2}
//         left={"calc(50% - 155px)"}
//         mt={4}
//         textAlign="center"
//       >
//         &copy; 2024 Chatterbox. All rights reserved.
//         <Link to="https://github.com/Codewithakk" target="_blank">
//           <Text as="u" color="purple.500" ml={1}>
//             Akshay Kumar Singh
//           </Text>
//         </Link>
//       </Text>
//       {/* Modal for Login/Signup */}
//       <Modal
//         isOpen={isOpen}
//         onClose={onClose}
//         colorScheme="red"
//         size={{ base: "md", md: "xl" }}
//       >
//         <ModalOverlay />
//         <ModalContent w={{ base: "95vw" }}>
//           <ModalHeader></ModalHeader>
//           <ModalBody>
//             <Auth tabindex={index} />
//           </ModalBody>
//           <ModalCloseButton />
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Auth from "./Authentication/Auth";
import { useContext } from "react";
import chatContext from "../context/chatContext";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
  const context = useContext(chatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [index, setindex] = useState();
  const navigator = useNavigate();

  useEffect(() => {
    if (context.isauthenticated) {
      navigator("/dashboard");
    }
  }, [context.isauthenticated, navigator]);

  const handleloginopen = () => {
    setindex(0);
    onOpen();
  };

  const handlesignupopen = () => {
    setindex(1);
    onOpen();
  };

  return (
    <Box className="page-transition" h={"max-content"} verticalAlign="middle">
      <Flex direction="column" align="center" justify="center" minH="80vh">
        <Box textAlign="center">
          {/* Animated title */}
          <Text
            className="title-animation"
            fontSize={{ base: "5xl", md: "7xl" }}
            fontWeight={"bold"}
            fontFamily={"Work sans"}
          >
            Chatterbox
          </Text>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Online Chatting App
          </Text>
          {/* Buttons with hover effects */}
          <Button className="btn-hover" mr={3} onClick={handleloginopen}>
            Login
          </Button>
          <Button className="btn-hover btn-signup" colorScheme="purple" onClick={handlesignupopen}>
            Sign Up
          </Button>
        </Box>
      </Flex>

      {/* Footer */}
      <Text
        fontSize="sm"
        position={"fixed"}
        bottom={2}
        left={"calc(50% - 155px)"}
        mt={4}
        textAlign="center"
      >
        &copy; 2024 Chatterbox. All rights reserved.
        <Link to="https://github.com/Codewithakk" target="_blank">
          <Text as="u" color="purple.500" ml={1} className="footer-hover">
            Akshay Kumar Singh
          </Text>
        </Link>
      </Text>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "md", md: "xl" }}>
        <ModalOverlay />
        <ModalContent w={{ base: "95vw" }} className="modal-animation">
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Auth tabindex={index} />
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
