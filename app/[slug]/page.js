import Link from "next/link";
import { dbConnect } from "../database/database";
import { baseURL } from "../methods/baseUrl";



const BlogDetails = async ({ params }) => {
  const res = await fetch(baseURL + `/api/blogs/${params.slug}`, {
    cache: "no-store",
  });
  const blogData = await res?.json();
  console.log("blogData", blogData);

  if (!blogData.id) {
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
        {blogData?.title}
        {" - "}
        {blogData?.id}
      </h4>{" "}
      <p>{blogData?.body}</p>
      <Link href={"/"}>Home</Link>
    </div>
  );
};
export default BlogDetails;
