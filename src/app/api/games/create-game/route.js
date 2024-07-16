export const revalidate = 0;
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
export const POST = async (req) => {
    const data = await req.json()
    try {
        const gameCreated = await prisma.game.create({
            data: data,
        });
        return NextResponse.json({
            gameCreated
        }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: 'Something went wrong'
        }, { status: 500 })
    }

};
