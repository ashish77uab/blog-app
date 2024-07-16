export const revalidate = 0;
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
export const POST = async (req) => {
    const data = await req.json()
    try {
        console.log(data,'data')
        const questions = await prisma.question.createMany({
            data: data,
        });
        return NextResponse.json({
            questions
        }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: 'Something went wrong'
        }, { status: 500 })
    }

};
