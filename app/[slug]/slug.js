"use client";
import Link from "next/link";
import { useAuth } from "../utils/authProvider";

const Slug = ({ blogData }) => {
  const { user, setUser } = useAuth();

  return (
    <div>
      <h4>
        {blogData?.title} {" - "}
        {user?._id && (
          <span>
            <Link href={"/edit"}>Edit</Link>
          </span>
        )}
      </h4>
      <p>{blogData?.body}</p>
    </div>
  );
};
export default Slug;
