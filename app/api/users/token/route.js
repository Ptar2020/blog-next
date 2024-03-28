import { dbConnect } from "@/app/database/database";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import { compareSync } from "bcryptjs";

// Define the POST route handler for refreshToken
export async function POST(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract the refresh token from the request body
    const { refreshToken } = await request.json();

    // Check if the refresh token exists
    if (!refreshToken) {
      return new Response(
        JSON.stringify({ error: "Refresh token is missing" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const SECRET_KEY = "Ey5JU78!#8$%O0980gfTR5grtUYbn57";

    // Verify the refresh token and extract the username
    const decodedData = jwt.verify(refreshToken, SECRET_KEY);
    // console.log("decodedData ", decodedData);
    console.log(JSON.stringify("decodedData ", decodedData));

    // Find the user in the database based on the username
    const user = await User.findOne({ _id: decodedData._id });
    // If user doesn't exist or refresh token doesn't match user's refresh token
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid refresh token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const accessToken = jwt.sign(
      {
        username: user.username,
        _id: user._id,
        is_superuser: user.is_superuser,
      },
      SECRET_KEY,
      {
        expiresIn: "1m",
      }
    );

    // Send the new access token back to the client
    return new Response(JSON.stringify({ accessToken }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
