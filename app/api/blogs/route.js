import { dbConnect } from "../../database/database";
import Blog from "@/app/models/Blog";

export async function GET(request) {
  try {
    await dbConnect();
    const blogs = await Blog.find();

    return new Response(JSON.stringify(blogs), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
