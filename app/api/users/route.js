import { dbConnect } from "@/app/database/database";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function GET(request) {
  // http://localhost:3000/api/users
  try {
    await dbConnect();
    const users = await User.find();
    return new Response(JSON.stringify(users));
  } catch (err) {
    console.log(err.message);
  }
}

export async function POST(request, { params }) {
  // http://localhost:3000/api/users
  try {
    await dbConnect();

    const userData = await request.json();
    const { username, password } = userData;
    if (!username || !password)
      return new Response(
        JSON.stringify({ msg: "Username and Password are required!" })
      );
    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(JSON.stringify({ msg: "Invalid username" }));
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return new Response(JSON.stringify({ msg: "Incorrect credentials" }));
    }
    const SECRET_KEY = "Ey5JU78!#8$%O0980gfTR5grtUYbn57";
    const accessToken = jwt.sign(
      {
        username,
        _id: user._id,
        is_superuser: user.is_superuser,
      },
      SECRET_KEY,
      {
        expiresIn: "1m",
      }
    );

    const refreshToken = jwt.sign(
      {
        username,
        _id: user._id,
        lastName: user.lastName,
        firstName: user.firstName,
        is_superuser: user.is_superuser,
      },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    return new Response(JSON.stringify({ accessToken, refreshToken }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
