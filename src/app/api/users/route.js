import { NextResponse } from "next/server";
import { User } from "@/models/User";
import connect from "@/utils/db";

export const GET = async (req) => {
    await connect();
    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 12
    const startIndex = (Number(page) - 1) * limit;
    try {
        const total = await User.countDocuments();
        const users = await User.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(startIndex);

        return NextResponse.json({
            data: users,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / limit),
        });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
};


