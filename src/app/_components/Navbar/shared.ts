import { BsPostcard, BsTags } from "react-icons/bs";
import { PiProjectorScreenChart } from "react-icons/pi";
import { RiHome2Line } from "react-icons/ri";

export const menus = [
  {
    label: "Home",
    href: "/",
    icon: RiHome2Line,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BsPostcard,
  },
  {
    label: "Project",
    href: "/project",
    icon: PiProjectorScreenChart,
  },
  {
    label: "Tags",
    href: "/tag",
    icon: BsTags,
  },
  //   {
  //     label: "Contact Me",
  //     href: "/contact",
  //   },
] as const;
