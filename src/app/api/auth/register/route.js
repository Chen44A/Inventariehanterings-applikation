import { signJWT } from "@/utils/helpers/authHelpers";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req) {
    //尝试解析请求体为 JSON 格式，并检查是否包含 email、password 和 name 字段。如果缺少这些字段，返回 400 错误和错误消息。
    let body;
    try {
        body = await req.json();
        if(!body.email || !body.password || !body.name) {
            throw new Error("Email, password, and name are required")
        }
    }catch(error) {
        return NextResponse.json( {
            message: error.message,
          },
          {
            status: 400,
          }
        )
    }

    //使用 Prisma 创建一个新用户，并打印注册的用户信息。
    try {
          // Check if the email already exists
          const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: body.email },
                    { name: body.name }
                ]
            }
        });

        if (existingUser) {
            const message = existingUser.email === body.email
                ? "Email is already registered"
                : "Name is already taken";

            return NextResponse.json(
                { message },
                { status: 400 }
            );
        }

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name 
            }
        })
        console.log("user registered: ",user);

        //使用 signJWT 函数生成一个包含用户 ID 的 JWT。
        const token = await signJWT({
            userId: user.id
        })

        return NextResponse.json({
            user,
            token
        })
    //如果在创建用户或生成 JWT 的过程中发生错误，捕获错误并返回 400 错误和错误消息。
    } catch(error) {
        console.log(error);
        return NextResponse.json({
            error: error.message
        },{
            status:400
        })
    }
}