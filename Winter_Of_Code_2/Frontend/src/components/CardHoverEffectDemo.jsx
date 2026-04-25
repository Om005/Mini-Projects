import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    (<div className="max-w-5xl mx-auto px-8">
      <h2 className="text-white text-center poppins-regular text-3xl hover:scale-105 duration-200">Why PIXELCODE?</h2>
      <HoverEffect items={projects} />
    </div>)
  );
}
export const projects = [
  {
    title: "Guest & Authenticated Access",
    description:
      "Explore as a guest or unlock premium features as an authenticated user.",
  },
  {
    title: "Customizable Workspace",
    description:
      "Organize your IDE with resizable file menu, terminal, and editor sections.",
  },
  {
    title: "Flexible Input Options",
    description:
      "Upload files, drag and drop, or manually input text with ease.",
  },
  {
    title: "Run Any Programming Language",
    description:
      "Seamlessly execute code in over 30+ languages with blazing-fast performance.",
  },
  {
    title: "Multiple Themes",
    description:
      "Choose from vibrant themes to create your perfect coding atmosphere.",
  },
  {
    title: "AI Chatbot Support",
    description:
      "Chat with an AI-powered assistant to resolve your coding doubts instantly.",
  },
];
