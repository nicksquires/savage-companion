export interface WeaponState {
  currentAmmo: number;
  isJammed: boolean;
  isBroken: boolean;
}

export interface ConsumableState {
  charges: number;
  isOpened: boolean;
}

// A helper to cast the state safely
export type ItemInstanceState = WeaponState | ConsumableState | Record<string, unknown>;