import {Tag} from "./Tag"

export interface Edge {
  id: string
  name: string
  slug: string
  category?: string
  rank: "NOVICE" | "SEASONED" | "VETERAN" | "HEROIC" | "LEGENDARY"
  isHomebrew?: boolean
  isPublic?: boolean
  requirements?: JSON
  description?: string
  summary?: string
  sourceName?: string
  tags: Tag[]
  owner?: {
    name: string
  }
}