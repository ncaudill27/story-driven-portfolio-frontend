import type { SanityImage } from "./sanity"
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
  mediaType: string
  slug: {
    current: string
  }
  hero: SanityImage
  secondHero?: SecondHero
  images: SanityImage[]
  elements: {
    name: string
    _rawDescription: PortableTextBlock
  }[]
}
