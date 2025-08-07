export interface Attribute {
  name: string
  dieType: string
}

export interface Skill {
  name: string
  dieType: string
  linkedAttr?: string
}

// export interface Attack {
//   name: string
//   damage: string
//   range?: string
//   notes?: string
// }

export interface Ability {
  name: string
  description: string
}

export interface Creature {
  id: string
  name: string
  description?: string
  size?: string
  race?: string
  pace?: number
  parry?: number
  toughness?: number
  attributes: Attribute[]
  skills: Skill[]
  // attacks: Attack[]
  abilities: Ability[]
  tags: string[]
}