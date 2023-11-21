import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type GetOneCategoryDTO = {
    id: string;
};

export async function GET(
    request: NextRequest,
    { params }: { params: GetOneCategoryDTO }
) {
    const categoryId = parseInt(params.id, 10);

    if (isNaN(categoryId)) {
        return NextResponse.json({
            status: 400,
            data: { message: "Invalid id format" },
        });
    }

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });

    if (!category) {
        return NextResponse.json({
            status: 404,
            data: { message: "Category not found" },
        });
    }

    return NextResponse.json({
        status: 200,
        data: category,
    });
}

export async function PUT(
    request: NextRequest,
    { params }: { params: GetOneCategoryDTO }
) {
    const categoryId = parseInt(params.id, 10);

    if (isNaN(categoryId)) {
        return NextResponse.json({
            status: 400,
            data: { message: "Invalid id format" },
        });
    }

    const body = await request.json();

    const category = await prisma.category.update({
        where: {
            id: categoryId,
        },
        data: {
            name: body.name
        },
    });

    return NextResponse.json({
        status: 200,
        data: category,
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: GetOneCategoryDTO }
) {
    const categoryId = parseInt(params.id, 10);

    if (isNaN(categoryId)) {
        return NextResponse.json({
            status: 400,
            data: { message: "Invalid id format" },
        });
    }

    const category = await prisma.category.delete({
        where: {
            id: categoryId,
        },
    });

    return NextResponse.json({
        status: 200,
        data: category,
    });
}