import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type GetOnePostDTO = {
    id: string;
};

export async function GET(
    request: NextRequest,
    { params }: { params: GetOnePostDTO }
) {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
        return NextResponse.json({
            status: 400,
            data: { message: "Invalid id format" },
        });
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        return NextResponse.json({
            status: 404,
            data: { message: "Post not found" },
        });
    }

    return NextResponse.json({
        status: 200,
        data: post,
    });
}

export async function PUT(
    request: NextRequest,
    { params }: { params: GetOnePostDTO }
) {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
        return NextResponse.json({
            status: 400,
            data: { message: "Invalid id format" },
        });
    }

    const body = await request.json();

    const post = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            title: body.title,
            content: body.content,
        },
    });

    return NextResponse.json({
        status: 200,
        data: post,
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: GetOnePostDTO }
) {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
        return NextResponse.json({
            status: 400,
            data: { message: "Invalid id format" },
        });
    }

    const post = await prisma.post.delete({
        where: {
            id: postId,
        },
    });

    return NextResponse.json({
        status: 200,
        data: post,
    });
}