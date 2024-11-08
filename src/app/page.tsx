'use client'

import Image from "next/image";
import { useState } from 'react';



export default function Home() {
  const [number, setNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);



  return (

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>Random Number Generator</div>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium 
          hover:bg-blue-700 transition-colors duration-200 
          active:bg-blue-800 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
        >
          Get Random Number
        </button>
        <div>Random Number: {number}</div>
      </main>

    </div>
  );
}
