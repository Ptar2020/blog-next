export async function GET(request, { params }) {
  // http://localhost:3000/api/blogs/:slug

  const blogs = [
    {
      id: 1,
      title: "Title for blog ",
      slug: "slug_1",
      body: "The body for first blog post",
    },
    {
      id: 2,
      title: "Title for blog ",
      slug: "slug_2",
      body: "The body for second blog post",
    },
    {
      id: 3,
      title: "Title for blog ",
      slug: "slug_376",
      body: "The body for third blog post",
    },
  ];

  const { slug } = params;

  const blogData = blogs.find((blog) => blog.slug === slug);

  if (blogData.id) {
    return new Response(JSON.stringify(blogData));
  } else {
    return new Response("Blog not found", { status: 404 });
  }
}
