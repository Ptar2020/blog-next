import React from "react";
import Link from "next/link";
import { baseURL } from "@/app/utils/baseUrl";

const UserDetails = async ({ params }) => {
  const res = await fetch(baseURL + `/api/users/${params._id}`, {
    cache: "no-store",
  });
  const user = await res.json();
  return (
    <div>
      <h3>User {user.username} Details</h3>
      <p>{user.email}</p>
      <Link href="/">Home</Link>
    </div>
  );
};
export default UserDetails;
