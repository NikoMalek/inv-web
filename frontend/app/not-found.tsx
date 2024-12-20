import Link from "next/link";

export default function NotFoundRoot() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4">
        <BugIcon className="h-300 w-300 text-gray-900 dark:text-pink-700 ml-[-50px] " />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          La página que buscas no existe
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="300"
      viewBox="0 0 4000 4000"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >

      <g transform="scale(1, -1) translate(0, -5300)">
          <path d="M1837 2954 c-13 -14 6 -24 44 -24 21 0 39 -3 39 -6 0 -4 -18 -27 -41 -51 -26 -29 -38 -48 -32 -54 14 -14 126 -7 130 8 3 8 -11 13 -41 15 l-45 3 44 49 c25 27 42 53 39 57 -6 10 -127 12 -137 3z"/>
          <path d="M1049 2881 l-24 -19 -3 -451 -3 -451 -45 0 c-54 0 -92 -18 -128 -60 -33 -40 -36 -118 -6 -167 11 -18 19 -33 17 -34 -1 0 -26 -1 -56 -2 -30 -1 -56 -7 -58 -13 -6 -17 814 -25 1755 -17 633 5 824 4 818 -5 -12 -21 -82 -51 -153 -68 -60 -14 -91 -14 -259 -4 -241 16 -552 9 -649 -15 -45 -11 -109 -17 -180 -17 -131 0 -177 -10 -204 -45 -29 -35 -28 -94 2 -128 44 -51 91 -53 440 -14 149 16 239 19 535 18 388 -2 413 1 524 57 63 32 157 124 187 182 l21 42 81 0 c60 0 80 3 76 13 -2 8 -27 12 -76 12 -67 0 -72 1 -67 20 13 57 17 211 6 305 -21 198 -95 356 -230 490 -137 138 -269 198 -455 207 -130 7 -232 -14 -355 -73 -118 -56 -257 -167 -350 -279 l-54 -65 -24 24 c-21 21 -26 38 -34 128 -5 56 -13 106 -17 111 -4 4 -25 -5 -47 -21 -109 -78 -158 -102 -212 -102 -29 0 -79 -9 -111 -20 l-58 -19 -104 34 c-124 40 -119 47 -94 -116 13 -86 14 -115 5 -146 -12 -41 -10 -166 4 -195 8 -17 -3 -18 -153 -18 l-161 0 0 445 0 446 -25 24 c-29 30 -45 31 -76 6z m71 -111 l0 -80 -30 0 -30 0 0 84 c0 88 7 102 43 84 14 -7 17 -23 17 -88z m1915 -95 c196 -51 371 -200 467 -400 45 -94 65 -182 74 -320 16 -251 -53 -398 -226 -485 -103 -51 -127 -53 -507 -51 -294 1 -379 -2 -525 -18 -394 -45 -438 -40 -438 57 0 57 24 66 204 74 88 3 177 12 196 18 55 19 430 25 635 10 159 -11 188 -10 248 4 110 26 221 95 202 125 -4 8 -156 9 -526 5 l-520 -7 25 38 c51 75 25 178 -54 217 -31 16 -73 18 -412 18 l-376 0 -13 38 c-16 46 -16 126 0 175 10 30 9 56 -4 142 -9 59 -15 108 -13 111 3 2 46 -10 97 -27 92 -31 94 -31 130 -14 20 10 73 20 117 24 75 6 87 10 152 54 40 26 77 48 84 49 9 2 15 -21 19 -84 6 -85 7 -89 46 -131 37 -40 64 -95 77 -159 4 -16 11 -28 16 -28 17 0 11 56 -11 115 l-21 56 36 43 c84 103 210 213 306 269 53 30 135 63 205 82 69 19 237 19 310 0z m-1915 -365 l0 -350 -35 0 -35 0 0 343 c0 189 3 347 7 350 3 4 19 7 35 7 l28 0 0 -350z m130 -385 c0 -3 -10 -20 -22 -36 -32 -42 -31 -116 0 -158 l23 -31 -138 -2 c-180 -2 -190 -1 -224 23 -67 48 -52 168 26 200 22 9 335 12 335 4z m1042 -20 c57 -42 65 -116 19 -167 l-29 -33 -464 -5 c-255 -3 -479 -2 -498 2 -65 13 -107 95 -78 154 7 16 28 39 47 51 l35 24 470 -3 c453 -3 472 -4 498 -23z"/>
          <path d="M2885 2540 c-7 -11 -2 -13 70 -30 65 -14 138 -52 197 -101 72 -60 98 -49 30 13 -89 80 -275 154 -297 118z"/>
          <path d="M1512 2358 c3 -7 19 -16 36 -20 18 -5 39 -20 48 -33 20 -31 36 -32 32 -3 -2 12 -18 33 -37 45 -36 25 -85 31 -79 11z"/>
          <path d="M3245 2330 c-7 -11 51 -100 65 -100 16 0 11 18 -15 59 -28 45 -41 56 -50 41z"/>
          <path d="M1987 2170 c-6 -22 -36 -27 -55 -8 -16 16 -29 1 -16 -20 17 -27 69 -27 88 0 9 12 16 28 16 35 0 21 -27 15 -33 -7z"/>
          <path d="M1750 2120 c-12 -22 -40 -26 -58 -8 -16 16 -29 1 -16 -20 25 -39 104 -16 104 30 0 24 -17 23 -30 -2z"/>
          <path d="M1843 2030 c-29 -12 -28 -21 1 -42 26 -19 41 -11 48 27 4 22 -16 28 -49 15z"/>
          <path d="M1346 1848 c-9 -12 -16 -29 -16 -38 0 -49 63 -77 105 -46 21 15 25 67 5 90 -19 24 -76 20 -94 -6z m87 -20 c8 -30 -9 -58 -36 -58 -27 0 -47 17 -47 40 0 42 73 58 83 18z"/>
          <path d="M1720 1824 c-10 -11 -10 -17 0 -28 15 -19 40 -10 40 14 0 24 -25 33 -40 14z"/>
          <path d="M1864 1825 c-9 -23 15 -48 32 -34 19 15 18 35 -2 43 -22 8 -24 8 -30 -9z"/>
          <path d="M2013 1824 c-7 -20 11 -38 31 -31 23 9 20 34 -5 40 -13 3 -22 0 -26 -9z"/>
          <path d="M2173 1833 c-18 -6 -16 -40 1 -46 8 -3 20 1 27 9 10 12 9 18 -2 28 -8 8 -20 12 -26 9z"/>
          <path d="M1690 2655 c0 -9 10 -15 26 -15 l26 0 -26 -31 c-14 -17 -26 -35 -26 -40 0 -5 25 -9 56 -9 40 0 55 3 52 13 -3 6 -17 14 -32 17 l-28 5 26 24 c40 38 34 51 -24 51 -38 0 -50 -4 -50 -15z"/>
          <path d="M583 1693 c-80 -6 -63 -23 22 -23 43 0 75 4 75 10 0 6 -4 10 -9 10 -5 0 -15 1 -23 3 -7 2 -37 2 -65 0z"/>
          <path d="M3803 1692 c-13 -2 -23 -8 -23 -13 0 -5 41 -9 90 -9 50 0 90 4 90 9 0 9 -116 19 -157 13z"/>
      </g>
    </svg>


  );
}


