import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'


export const PATCH = async (req, { params }) => {
    const data = await req.json()
    const slug = params?.slug
    try {
        const taskUpdated = await prisma.task.update({
            where: {
                slug: slug,
            },
            data: {
                ...data,
                slug: data?.title.split(' ').join('-')
            },
        })
        revalidatePath('/task',)
        return NextResponse.json({
            taskUpdated
        }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: 'Something went wrong'
        }, { status: 500 })
    }

};