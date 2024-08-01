import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const socials = [
  {
    label: "Github",
    icon: FaGithub,
    href: "/social/github",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "/social/instagram",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "/social/linkedin",
  },
  {
    label: "Twitter",
    icon: FaXTwitter,
    href: "/social/twitter",
  },
] as const;
