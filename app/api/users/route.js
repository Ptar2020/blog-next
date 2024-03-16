const GET = async (request) => {
  // http://localhost:3000/api/users

  const users = [
    {
      id: 1,
      username: "ptar",
      password: "1234",
      phone: "+254725109389",
    },
    {
      id: 2,
      username: "user2",
      password: "1234",
      phone: "+254725109389",
    },
    {
      id: 3,
      username: "user3",
      password: "1234",
      phone: "+254725109389",
    },
  ];

  return new Response(JSON.stringify(users));
};

export { GET };
