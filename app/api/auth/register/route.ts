import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request, res: Response) {
    try{
        const { email, firstname, password } = await request.json();
        console.log({email, firstname, password});
        const hashedPassword = await hash(password, 10);
        const response = await sql`
            INSERT INTO users (email, firstname, password)
            VALUES (${email}, ${firstname}, ${hashedPassword})
        `;
        console.log(response);
    }catch(error){
        console.log(error);
    }
    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
}