import {
  Crosshair,
  FlaskConical,
  PackageOpen,
  Shield,
  Sword,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CategoryIcon = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => {
  switch (type) {
    case "WEAPON":
      return <Sword className={cn("text-error fill-error", className)} />;
    case "ARMOR":
      return <Shield className={cn("text-info fill-info", className)} />;
    case "TOOL":
      return <Wrench className={cn("text-warning fill-warning", className)} />;
    case "CONSUMABLE":
      return <FlaskConical className={cn("text-success", className)} />;
    case "AMMUNITION":
      return <Crosshair className={cn("text-accent", className)} />;
    default:
      return <PackageOpen className={cn("text-base-content/50", className)} />;
  }
};
