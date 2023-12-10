import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
const Login = () => {
  const userRef = React.useRef<HTMLInputElement>(null);
  const errRef = React.useRef<HTMLDivElement>(null);
  const [user, setUser] = useState("");
  const [pwd, setpwd] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (errMsg) {
      errRef.current!.focus();
    }
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && pwd) {
      try {
        const userData = await login({ user, pwd }).unwrap();
        console.log(userData);

        dispatch(setCredentials({ ...userData, user }));
        setUser("");
        setpwd("");
        navigate("/welcome");
      } catch (err) {
        if (!(err as any)?.response) {
          seterrMsg("No server response");
        } else if ((err as any).response?.status === 400) {
          seterrMsg("missing username or password");
        } else if ((err as any).response?.status === 401) {
          seterrMsg("unauthorized");
        } else {
          seterrMsg("login failed");
        }
        errRef.current!.focus();
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"blue.400"}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>user name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                value={user}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setpwd(e.target.value)}
                value={pwd}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Login;
