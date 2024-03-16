export async function GET(request, { params }) {
  // http://localhost:3000/api/blogs/:slug

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

  // Destructure the slug from params
  const { slug } = params;

  const blogData = blogs.find((blog) => blog.slug === slug);
  if (!blogData) {
    return new Response("Blog not found", { status: 404 });
  } else {
    return new Response(JSON.stringify(blogData));
  }
}
