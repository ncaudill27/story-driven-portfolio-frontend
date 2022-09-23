import type { IGatsbyImageData } from "gatsby-plugin-image"

export type SanityGQLData<T> = {
  [key: string]: {
    edges: {
      node: T
    }[]
  }
}

type SanityImageCrop = {
  top: number
  bottom: number
  left: number
  right: number
}

type SanityImageHotspot = {
  x: number
  y: number
  height: number
  width: number
}

interface SEOImageAsset extends StandardImageAsset {
  publicUrl: string
}

type StandardImageAsset = {
  _id: string
  gatsbyImageData: IGatsbyImageData
}

type SanityImageAsset = StandardImageAsset | SEOImageAsset

export type SanityImage = {
  title: string
  alt: string
  asset: SanityImageAsset
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
}
