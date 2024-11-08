import { NextResponse } from 'next/server';

export async function GET() {

    try {
        const response = await fetch('https://api.random.org/json-rpc/4/invoke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'generateIntegers',
                params: {
                    apiKey: process.env.RANDOM_API_KEY,
                    n: 1,
                    min: 200,
                    max: 300
                },
                id: 1
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch random number');
        }

        const data = await response.json();
        return NextResponse.json({ number: data.result.random.data[0] });

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to generate random number. -- ' + error },
            { status: 500 }
        );
    }

}
