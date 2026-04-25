import withMT from "@material-tailwind/react/utils/withMT";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}



export default ({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: "class",
  theme: {
    extend: {
      // You can add custom theme extensions here
    },
  },
  plugins: [addVariablesForColors],
});


// import defaultTheme from "tailwindcss/defaultTheme";
// import colors from "tailwindcss/colors";
// import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
// import withMT from "@material-tailwind/react/utils/withMT";

// /** Function to add CSS variables for colors */
// function addVariablesForColors({ addBase, theme }) {
//   const allColors = flattenColorPalette(theme("colors"));
//   const newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//   );

//   addBase({
//     ":root": newVars,
//   });
// }

// /** Tailwind CSS Configuration */
// export default ({
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: "class", // Enable dark mode
//   theme: {
//     extend: {
//       boxShadow: {
//         input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
//       },
//       // Add additional custom theme extensions here if needed
//     },
//   },
//   plugins: [addVariablesForColors],
// });




// import defaultTheme from "tailwindcss/defaultTheme";
// import colors from "tailwindcss/colors";
// import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
// import withMT from "@material-tailwind/react/utils/withMT";

// /** @type {import('tailwindcss').Config} */
// function addVariablesForColors({ addBase, theme }) {
//   let allColors = flattenColorPalette(theme("colors"));
//   let newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//   );

//   addBase({
//     ":root": newVars,
//   });
// }

// export default withMT({
//   content: ["./src/**/*.{js,jsx}"],
//   darkMode: "class",
//   theme: {
//     // rest of the code
//   },
//   plugins: [addVariablesForColors],
// });
