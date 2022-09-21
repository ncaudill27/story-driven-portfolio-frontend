import type { SanityImage } from "../lib/helpers"
import type { PortableTextBlock } from "@portabletext/types"

export type SecondHero = {
  secondHeroImage: SanityImage
} | null

export interface IProject {
  id: string
  _rawBrief: PortableTextBlock
  _rawIntro?: PortableTextBlock
  _rawSubject: PortableTextBlock
  name: string
  slug: {
    current: string
  }
  elements: {
    name: string
    _rawDescription: PortableTextBlock
  }[]
  hero: SanityImage
  secondHero: SecondHero
  images: SanityImage[]
}
