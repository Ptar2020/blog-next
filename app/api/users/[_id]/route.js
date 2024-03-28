import { dbConnect } from "@/app/database/database";
import User from "@/app/models/User";

export async function GET(request, { params }) {
  // http://localhost:3000/api/users/:_id
  try {
    await dbConnect();
    const { _id } = params;

    const user = await User.findOne({ _id: _id });
    return new Response(JSON.stringify(user));
  } catch (err) {
    console.log(err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
