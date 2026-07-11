import type { SVGProps } from "react";
import type { LucideIcon } from "lucide-react";
import type { IconKey } from "@/lib/content";
import * as Icons from "./icons";

const map: Record<IconKey, LucideIcon> = {
  code: Icons.Code,
  cloud: Icons.Cloud,
  cpu: Icons.Cpu,
  layers: Icons.Layers,
  sparkle: Icons.Sparkle,
  shield: Icons.Shield,
  phone: Icons.Phone,
  grid: Icons.Grid,
  chart: Icons.Chart,
  gear: Icons.Gear,
  building: Icons.Building,
  health: Icons.Health,
  bag: Icons.Bag,
  cap: Icons.Cap,
};

/** Resolves a content IconKey to its lucide icon component. */
export default function Icon({
  name,
  ...props
}: { name: IconKey } & SVGProps<SVGSVGElement>) {
  const Cmp = map[name];
  return <Cmp {...props} />;
}
