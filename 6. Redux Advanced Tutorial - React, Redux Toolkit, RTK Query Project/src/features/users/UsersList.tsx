import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { User, selectAllUsers } from "./usersSlice";
import { Flex, Text, CardBody, Card } from "@chakra-ui/react";
type UsersListProps = {};

const UsersList: React.FC<UsersListProps> = () => {
  const users = useAppSelector(selectAllUsers);
  if (!users) {
    return null;
  }
  return (
    <section>
      <Flex direction={"column"} w={"full"} align={"center"} p={"50px"}>
        <Text fontSize={"3xl"}>List of Users</Text>

        {users &&
          users.map((user: any) => (
            <Card as={Link} mb={"10px"} w={"full"} to={`/user/${user.id}`}>
              <CardBody key={user.id}>
                {user.name} ({user.email})
              </CardBody>
            </Card>
          ))}
      </Flex>
    </section>
  );
};
export default UsersList;
