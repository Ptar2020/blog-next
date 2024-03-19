export async function GET(request) {
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
      slug: "slug_3",
      body: "The body for third blog post",
    },
  ];
  return new Response(JSON.stringify(blogs));
}
