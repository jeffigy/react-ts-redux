import { useAppSelector } from "app/hooks";
import { UsersType, selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useAppSelector(selectAllUsers);
  return (
    <section>
      <h2 className="text-2xl font-black">Users</h2>
      <ul>
        {users &&
          users.map((user: UsersType) => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default UsersList;
