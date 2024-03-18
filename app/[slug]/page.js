import styles from "../page.module.css";
import Link from "next/link";
import { dbConnect } from "../database/database";
import { baseURL } from "../methods/baseUrl";

const BlogDetails = async ({ params }) => {
  const res = await fetch(baseURL + `/api/blogs/${params.slug}`);
  const blogData = await res.json();
  alert(params.slug);

  if (!res.ok) {
    return (
      <div>
        <p>404 | Blog not found.</p>
        <Link href={"/"}>Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h4>
        {blogData.title}-{blogData.id}
      </h4>
      <p>{blogData.body}</p>
      <Link href={"/"}>Home</Link>
    </div>
  );
};
export default BlogDetails;
