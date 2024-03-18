export async function GET(request) {
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
  return new Response(JSON.stringify(blogs));
}
