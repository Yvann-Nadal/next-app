import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
    const categories = await prisma.category.findMany()

    return NextResponse.json({
        status: 200,
        data: categories
    })
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    console.log("POST request body", body)

    const categories = await prisma.category.create({
        data: {
            name: body.name,
            posts: {
                connect: {
                    id: body.postId
                }
            }
        }
    })

    return NextResponse.json({
        status: 200,
        body: categories
    })
}

export async function PUT(request: NextRequest) {
    const body = await request.json()
    console.log("PUT request body", body)

    const categories = await prisma.category.update({
        where: {
            id: body.id
        },
        data: {
            name: body.name,
            posts: {
                connect: {
                    id: body.postId
                }
            }
        }
    })

    return NextResponse.json({
        status: 200,
        body: categories
    })
}

export async function DELETE(request: NextRequest) {
    const body = await request.json()
    console.log("DELETE request body", body)

    const categories = await prisma.category.delete({
        where: {
            id: body.id
        }
    })

    return NextResponse.json({
        status: 200,
        body: categories
    })
}