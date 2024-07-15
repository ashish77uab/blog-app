import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/User";

export const POST = async (req) => {
  await connect();
  const { email, password } = await req.json()

  try {
    const oldUser =  await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (!oldUser)
      return NextResponse.json({ message: "User doesn't exist" }, { status: 404 })

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return NextResponse.json({ message: "Invalid Password" }, { status: 404 })

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id,role: oldUser.role },
      process.env.JWTSECRET,
      {
        expiresIn: "1d",
      }
    );

    return NextResponse.json({
      message: 'Login successful',
      token: token,
      role: oldUser.role
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    console.log(error);
  }

};


