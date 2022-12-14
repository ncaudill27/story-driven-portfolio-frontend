import type { SanityImage } from "./sanity"
import type { PortableTextBlock } from "@portabletext/types"

export interface IProject {
  id: string
  brief: PortableTextBlock
  intro: PortableTextBlock
  subject: PortableTextBlock
  name: string
  mediaType: string
  hero: SanityImage
  images: SanityImage[]
  elements: Element[]
}

export type Element = {
  name: string
  description: PortableTextBlock
}
