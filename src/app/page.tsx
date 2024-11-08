'use client'

import { useState, ChangeEvent } from 'react';



export default function Home() {
  const [number, setNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [useV1, setuseV1] = useState<boolean>(true);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setuseV1(e.target.value === 'true');
  };

  const fetchRandomNumber = async () => {
    setLoading(true);
    setError('');
    setNumber(null);

    try {
      let response;
      if (useV1) {
        response = await fetch('/api/random/v1');
      } else {
        response = await fetch('/api/random/v2');
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: { number: number } = await response.json();
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
        <div className="flex items-center gap-4">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium
            hover:from-blue-700 hover:to-purple-700 transition-all duration-200
            active:from-blue-800 active:to-purple-800 focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            disabled={loading}
            onClick={fetchRandomNumber}
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Get Random Number'
            )}
          </button>
          <label className="flex items-center">
            <input
              type="radio"
              name="version"
              value="true"
              className="mr-2"
              checked={useV1 === true}
              onChange={handleRadioChange}
            />
            v1
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="version"
              value="false"
              className="mr-2"
              checked={useV1 === false}
              onChange={handleRadioChange}
            />
            v2
          </label>
        </div>
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
