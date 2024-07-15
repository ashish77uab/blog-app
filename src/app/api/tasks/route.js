export const revalidate = 0;
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'
import { BOOLEAN_VALUE } from "@/utils/constants";
export const POST = async (req) => {
    const data = await req.json()
    try {
        const taskCreated = await prisma.task.create({
            data: {
                ...data, slug: data?.title.split(' ').join('-'),
            },
        });
        revalidatePath('/task')
        return NextResponse.json({
            taskCreated
        }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: 'Something went wrong'
        }, { status: 500 })
    }

};
export const DELETE = async (req) => {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    try {
        const taskDeleted = await prisma.task.delete({
            where: {
                slug: slug,
            },
        });
        revalidatePath('/task')
        return NextResponse.json({
            taskDeleted
        }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: 'Something went wrong'
        }, { status: 500 })
    }

};
export const PUT = async (req) => {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const status = searchParams.get('status')
    try {
        const statusUpdated = await prisma.task.update({
            where: {
                slug: slug,
            },
            data: {
                isCompleted: BOOLEAN_VALUE[status]
            }
        });
        console.log(statusUpdated, 'statusUpdated')
        revalidatePath('/task')
        return NextResponse.json({
            statusUpdated
        }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: 'Something went wrong'
        }, { status: 500 })
    }

};