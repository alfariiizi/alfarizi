import { BsPostcard, BsTags } from "react-icons/bs";
import { PiProjectorScreenChart } from "react-icons/pi";
import { RiContactsBookLine, RiHome2Line, RiStackLine } from "react-icons/ri";

export const menus = [
  {
    label: "Home",
    href: "/",
    icon: () => <RiHome2Line className="size-5" />,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: () => <BsPostcard className="size-5" />,
  },
  {
    label: "Project",
    href: "/project",
    icon: () => <PiProjectorScreenChart className="size-5" />,
  },
  {
    label: "Tags",
    href: "/tag",
    icon: () => <BsTags className="size-5" />,
  },
  {
    label: "Tech",
    href: "/tech",
    icon: () => <RiStackLine className="size-5" />,
  },
  // {
  //   label: "Tools",
  //   href: "/tools",
  //   icon: () => <VscTools className="size-5" />,
  // },
  {
    label: "Contact",
    href: "/contact",
    icon: () => <RiContactsBookLine className="size-5" />,
  },
] as const;
