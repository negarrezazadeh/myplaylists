import FullPageSpinner from "@/ui/FullPageSpinner";
import { useUsers } from "./useUsers";
import UserItem from "./UserItem";

function UsersList() {
  const { users, isLoading } = useUsers();

  if (isLoading) return <FullPageSpinner />;
  return (
    <ul className="flex flex-col gap-y-5">
      {users.map((user, index) => <UserItem key={user.id} index={index} user={user} />)}
    </ul>
  );
}

export default UsersList;
