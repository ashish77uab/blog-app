import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";

export const POST = async (req) => {
  await connect();
  const { email, password, firstName, lastName,role } = await req.json()
  try {
    const oldUser = await await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (oldUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName: `${firstName} ${lastName}`,
        role
      },
    })
  

    const token = jwt.sign(
      { email: createdUser.email,role:createdUser.role, id: createdUser._id },
      process.env.JWTSECRET,
      {
        expiresIn: "1d",
      }
    );
    return NextResponse.json({
      createdUser, token
    }, { status: 201 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
};


