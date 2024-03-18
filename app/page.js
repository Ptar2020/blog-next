import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { baseURL } from "./methods/baseUrl";

export const metadata = {
  title: "Young Blogger",
  description: "Young Blogger Description",
};

const Home = async () => {
  const res = await fetch(baseURL + "/api/blogs");
  const blogs = await res.json();

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
};

export default Home;
