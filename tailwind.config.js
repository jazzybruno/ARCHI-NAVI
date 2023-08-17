/** @type {import('tailwindcss').Config} */
module.exports = {
   mode: 'jit',
   darkMode: false, // 'media' or 'class'
   purge: {
      content: [
         './src/pages/**/*.{js,ts,jsx,tsx}',
         './src/components/**/*.{js,ts,jsx,tsx}',
         './src/layouts/**/*.{js,ts,jsx,tsx}',
      ],
      options: {
         // https://purgecss.com/safelisting.html#patterns
         safelist: {
            standard: [/^bg-/, /^text-/],
         },
      },
   },
   content: [],
   theme: {
      screens: {
         msm : '10px',
         sm: '400px',
         md: '768px',
         lg: '976px',
         xl: '1440px',
       },
      extend: {},
   },
   plugins: [],
}
