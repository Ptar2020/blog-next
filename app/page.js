import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { baseURL } from "./methods/baseUrl";
import axios from "axios";

export const metadata = {
  title: "Young Blogger",
  description: "Young Blogger Description",
};

const Home = async () => {
  const res = await axios.get(baseURL + "/api/blogs");
  const blogs = res.data;
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
