import { Link } from "react-router-dom";

function UserItem({user, index}) {
  return (
    <li>
      <Link to={`/admin/users/${user.id}`}>{++index}. {user.email || user.telegram_username || user.name ||user.telegram_id}</Link>
    </li>
  );
}

export default UserItem;
