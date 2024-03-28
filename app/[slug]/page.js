import Link from "next/link";
import { baseURL } from "../utils/baseUrl";
import Slug from "./slug";

export const metadata = {
  title: "Blog Slug",
  description: "Blog Description",
};
const BlogDetails = async ({ params }) => {
  const res = await fetch(baseURL + `/api/blogs/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-danger text-center mt-4 pt-4">
        <h4>404 | Blog Not Found.</h4>
        <hr className="" />
        <Link href={"/"}>Back</Link>
      </div>
    );
  }

  const blogData = await res?.json();

  return <Slug {...{ blogData }} />;
};
export default BlogDetails;
