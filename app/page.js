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
  const res = await fetch(baseURL + "/api/blogs", {
    cache: "no-store",
  });
  const blogs = await res.json();

  return (
    <main>
      <div>
        <h2>Empowering Tomorrow's Voices</h2>
        {blogs?.map((blog) => (
          <div key={blog.id}>
            <Link href={`/${blog.slug}`}>{blog.title}</Link>
            <p>{blog.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
