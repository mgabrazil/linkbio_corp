import { Globe, Mail, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/brand-icons";
import type { LinkPlatform } from "@/types";

type IconProps = React.SVGProps<SVGSVGElement>;

export const platformIcon: Record<
  LinkPlatform,
  (props: IconProps) => React.ReactNode
> = {
  site: Globe,
  email: Mail,
  phone: Phone,
  whatsapp: WhatsappIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  x: XIcon,
  tiktok: TiktokIcon,
};

/** Cor de marca usada nos botões circulares da pessoa. */
export const platformColor: Record<LinkPlatform, string> = {
  site: "#4B5563",
  email: "#E8552D",
  phone: "#2F80ED",
  whatsapp: "#25D366",
  linkedin: "#0A66C2",
  instagram: "#E1306C",
  facebook: "#1877F2",
  youtube: "#FF0000",
  x: "#000000",
  tiktok: "#010101",
};
