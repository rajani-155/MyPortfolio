/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background:'#75A985',
        intro:"#859FFF",
        nav: '#5C946E',
        custom: '#ffffff',
      },
    },
 

    screens: {     
      lg: { max: "2023px" },         

      sm: { max: "639px" },
      
    },
  },
  plugins: [],
};
