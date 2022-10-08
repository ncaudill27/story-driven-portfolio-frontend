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

type SanityImageAsset = {
  _id: string
  title: string | null
  altText: string | null
  gatsbyImageData: IGatsbyImageData
  publicUrl: string
}

export type SanityImage = {
  asset: SanityImageAsset
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
}
