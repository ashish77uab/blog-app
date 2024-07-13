import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/User";
// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     // Handle GET request
//     res.status(200).json({ message: 'This is a GET request' });
//   } else {
//     // Handle other HTTP methods
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
export const POST = async (req) => {
  await connect();
  const { email, password, firstName, lastName } = await req.json()
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      fullName: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWTSECRET,
      {
        expiresIn: "1d",
      }
    );
    return NextResponse.json({
      result, token
    }, { status: 201 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
};


