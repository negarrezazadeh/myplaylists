import { Link } from "react-router-dom";

function UserItem({user, index}) {
  return (
    <li>
      <Link to={`/admin/users/${user.id}`}>{++index}. {user.email}</Link>
    </li>
  );
}

export default UserItem;
