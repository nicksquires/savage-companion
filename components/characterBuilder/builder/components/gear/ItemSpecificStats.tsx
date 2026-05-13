import {
  Activity,
  Crosshair,
  Settings2,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import { StatBadge } from "./StatBadge";

export const ItemSpecificStats = ({ item }: { item: any }) => {
  if (item.type === "WEAPON" && item.weapon) {
    const w = item.weapon;
    const f = w.firearm;
    return (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {w.damage && (
          <StatBadge
            icon={<Zap className="w-4 h-4 fill-current" />}
            label="Dmg"
            value={w.damage}
            color="error"
          />
        )}
        {w.ap > 0 && (
          <StatBadge
            icon={<Target className="w-4 h-4" />}
            label="AP"
            value={w.ap}
            color="warning"
          />
        )}
        {w.range && (
          <StatBadge
            icon={<Crosshair className="w-4 h-4" />}
            label="Rng"
            value={w.range}
            color="success"
          />
        )}
        {w.rof > 1 && <StatBadge label="RoF" value={w.rof} color="secondary" />}
        {f?.ammoCapacity && (
          <StatBadge label="Ammo" value={f.ammoCapacity} color="neutral" />
        )}
      </div>
    );
  }

  if (item.type === "ARMOR" && item.armor) {
    const a = item.armor;
    return (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {a.armorBonus && (
          <StatBadge
            icon={<Shield className="w-4 h-4 fill-info/30" />}
            label="Armor"
            value={`+${a.armorBonus}`}
            color="info"
          />
        )}
        {a.minStrength && (
          <StatBadge
            icon={<Activity className="w-4 h-4" />}
            label="Min Str"
            value={a.minStrength}
            color="accent"
          />
        )}
        {a.covers && (
          <StatBadge label="Covers" value={a.covers} color="base-content" />
        )}
      </div>
    );
  }

  if (item.type === "TOOL" && item.tool) {
    const t = item.tool;
    return (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {t.skill && (
          <StatBadge
            icon={<Settings2 className="w-4 h-4" />}
            label="Skill"
            value={t.skill}
            color="accent"
          />
        )}
        {t.skillBonus && (
          <StatBadge label="Bonus" value={`+${t.skillBonus}`} color="neutral" />
        )}
      </div>
    );
  }

  if (item.type === "CONSUMABLE" && item.consumable) {
    return (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {item.consumable.maxUses && (
          <StatBadge
            label="Uses"
            value={item.consumable.maxUses}
            color="navbar"
          />
        )}
      </div>
    );
  }

  return null;
};
