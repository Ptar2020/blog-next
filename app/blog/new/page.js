"use client";
import { useAuth } from "@/app/utils/authProvider";
import { baseURL } from "@/app/utils/baseUrl";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function NewBlog() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState();
  const [snippet, setSnippet] = useState();
  const [category, setCategory] = useState();
  const [body, setBody] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    if (!user) {
      router.push("/blog/login");
    }
  }, [router, user]);

  const data = { title, body, snippet, category, image };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(baseURL + "/api/blog", data, { method: "post" });
  };

  return (
    <div>
      <div>NEW BLOG</div>
      <form onSubmit={handleSubmit} method="post">
        <input
          placeholder="Title of the blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <br />
        <input
          placeholder="Snippet of the blog"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          type="text"
        />
        <br />

        <textarea
          placeholder="Body of the blog"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <br />
        <button type="submit">Save Blog</button>
        <br />
      </form>
    </div>
  );
}
