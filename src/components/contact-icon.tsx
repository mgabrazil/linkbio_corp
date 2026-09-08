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

/** Cor do botão circular de cada contato da pessoa. */
export const platformColor: Record<LinkPlatform, string> = {
  site: "#4B5563",
  email: "#E5372C", // vermelho
  linkedin: "#0A66C2", // azul
  whatsapp: "#25D366", // verde
  phone: "#22B5E0", // azul ciano
  instagram: "#ED2A7B", // rosa
  facebook: "#1877F2",
  youtube: "#FF0000",
  x: "#000000",
  tiktok: "#010101",
};
