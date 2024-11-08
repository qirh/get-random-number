'use client'

import { useState } from 'react';



export default function Home() {
  const [number, setNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchRandomNumber = async () => {
    setLoading(true);
    setError('');
    setNumber(null);

    try {
      const response = await fetch('/api/random/v1');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: { number: number } = await response.json();
      console.log("data.number -- " + data.number);
      setNumber(data.number);
    } catch (err) {
      setError('Failed to fetch the random number.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };




  return (

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Random Number Generator</h1>
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium
          hover:from-blue-700 hover:to-purple-700 transition-all duration-200
          active:from-blue-800 active:to-purple-800 focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          disabled={loading}
          onClick={fetchRandomNumber}
        >
          Get Random Number
        </button>
        <div className="mt-4 text-lg font-medium">
          {number === null ? (
            <span className="text-gray-500">Click button to generate number</span>
          ) : (
            <span>Random Number: <span className="text-blue-600 dark:text-blue-400">{number}</span></span>
          )}
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}

      </main>

    </div>
  );
}
