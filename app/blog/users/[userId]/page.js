import React from "react";
import Link from "next/link";

const UserDetails = ({ params }) => {
  return (
    <div>
      <h3>User {params.userId} Details</h3>
      <Link href="/">Home</Link>
    </div>
  );
};
export default UserDetails;
