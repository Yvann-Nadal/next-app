import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
    const posts = await prisma.post.findMany()

    return NextResponse.json({
        status: 200,
        data: posts
    })
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    console.log("POST request body", body)

    const posts = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            category: {
                connect: {
                    id: body.categoryId
                }
            }
        }
    })

    return NextResponse.json({
        status: 200,
        body: posts
    })
}