// src/redux/features/techSlice.js
import { createSlice } from "@reduxjs/toolkit";

g

const initialState = {
  techLinks: [
    { name: "React", logo: reactLogo, link: "https://react.dev/" },
    { name: "JavaScript", logo: jsLogo, link: "https://www.javascript.com/" },
    { name: "CSS", logo: CSSLogo, link: "https://www.w3schools.com/css/" },
    { name: "TypeScript", logo: TSLogo, link: "https://www.typescriptlang.org/" },
    { name: "Redux", logo: reduxLogo, link: "https://redux.js.org/" },
    { name: "Next.js", logo: nextLogo, link: "https://nextjs.org/" },
    { name: "Tailwind CSS", logo: tailwindLogo, link: "https://tailwindcss.com/" },
    { name: "React Router", logo: reactRouterdLogo, link: "https://reactrouter.com/" },
    { name: "MongoDB", logo: mongodbLogo, link: "https://www.mongodb.com/" },
    { name: "HTML", logo: HTMLLogo, link: "https://html.com/" },
    { name: "Express.js", logo: expressJSLogo, link: "https://expressjs.com/" },
  ],
};

const techSlice = createSlice({
  name: "tech",
  initialState,
  reducers: {},
});

export default techSlice.reducer;