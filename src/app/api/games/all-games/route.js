export const revalidate = 0;
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
export const GET = async () => {
    try {
        const games = await prisma.game.findMany({});
        return NextResponse.json({
            games
        }, { status: 200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: 'Something went wrong'
        }, { status: 500 })
    }

};
