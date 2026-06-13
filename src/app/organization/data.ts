export const vandor = {
  name: "Vandor",
  href: "https://vandordev.vercel.app",
  summary:
    "Vandor is an open organization focused on backend-oriented developer tools, documentation, and technical writing.",
  description:
    "The current surface is intentionally narrow: ship products that are useful on their own, keep reference material close to the work, and publish the reasoning behind the decisions so the ecosystem stays understandable.",
  products: [
    {
      name: "vx",
      description:
        "Composable CLI for starting structured backend work with clearer boundaries.",
    },
    {
      name: "vxt",
      description:
        "Spec-first Go templating library for structured Vandor workflows.",
    },
    {
      name: "vpkg",
      description:
        "Packaging system for shipping reusable artifacts.",
    },
  ],
} as const;
