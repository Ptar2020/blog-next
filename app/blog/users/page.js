import styles from "../../page.module.css";
import Link from "next/link";
import { baseURL } from "@/app/utils/baseUrl";

const Users = async () => {
  const res = await fetch(baseURL + "/api/users", { cache: "no-store" });
  const users = await res.json();
  return (
    <div className="">
      <p>Users </p>
      {users.map((user) => (
        <Link href={`/blog/users/${user._id}`} key={user._id}>
          {user.username}
          <br />
        </Link>
      ))}
      <Link href="/">Home</Link>
    </div>
  );
};
export default Users;
