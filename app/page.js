import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { baseURL } from "./methods/baseUrl";
import axios from "axios";

export const metadata = {
  title: "Young Blogger",
  description: "Young Blogger Description",
};

export default async function Home() {
  // const res = await fetch(baseURL + "/api/blogs");
  // const blogs = res.json();
  const blogs = [
    {
      id: 1,
      title: "Title for blog 1 ",
      slug: "slug_1",
      body: "The body for 2nd blog post",
    },
    {
      id: 2,
      title: "Title for blog 2 ",
      slug: "slug_2",
      body: "The body for first blog post",
    },
    {
      id: 3,
      title: "Title for blog 3 ",
      slug: "slug_3",
      body: "The body for 3rd blog post",
    },
  ];
  return (
    <main>
      <div>
        <h2>Empowering Voices</h2>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <p>{blog.title}</p>
            <p>{blog.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
