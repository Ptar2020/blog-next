import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { baseURL } from "./methods/baseUrl";
import axios from "axios";

export const metadata = {
  title: "Young Blogger",
  description: "Young Blogger Description",
};

export default async function Home({ request, params }) {
  const res = await axios.get(baseURL + "/api/blogs");
  const blogs = res.data;
  // const blogs = res.json();

  return (
    <main>
      <div>
        <h2>Empowering Voices</h2>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <Link href={`/${blog.slug}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
