// For getting blogs
import { dbConnect } from "@/app/database/database";
import Blog from "@/app/models/Blog";

export async function GET(request, { params }) {
  // http://localhost:3000/api/blogs/:slug
  try {
    await dbConnect();
    const { slug } = params;

    const blogData = await Blog.findOne({ slug: slug });

    if (blogData) {
      return new Response(JSON.stringify(blogData), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("Blog not found", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// For adding blogs
export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const image = formData.get("image");
  const category = formData.get("category");
  const data = { title, slug, category, image, category };
  return Response.json(data);
}
