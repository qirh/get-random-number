import { NextResponse } from 'next/server';

export async function GET() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return NextResponse.json({ number: randomNumber });

}
