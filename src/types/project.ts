import type { SanityImage } from "./sanity"
import type { PortableTextBlock } from "@portabletext/types"

export type SecondHero = {
  secondHeroImage: SanityImage
} | null

export interface IProject {
  id: string
  brief: PortableTextBlock
  intro?: PortableTextBlock
  subject: PortableTextBlock
  name: string
  mediaType: string
  slug: {
    current: string
  }
  hero: SanityImage
  secondHero: SecondHero
  images: SanityImage[]
  elements: {
    name: string
    description: PortableTextBlock
  }[]
}
