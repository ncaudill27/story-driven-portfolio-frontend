import type { IGatsbyImageData } from "gatsby-plugin-image"
import type { GatsbyEdges } from "../types/gatsby"

export type SanityGQLData<T> = {
  [key: string]: GatsbyEdges<T>
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

export type SanityImageAsset = {
  _id: string
  title: string | null
  altText: string | null
  gatsbyImageData: IGatsbyImageData
  metadata: SanityImageMetadata
  publicUrl: string
}

export type SanityImageMetadata = {
  dimensions: {
    height: number
    width: number
    aspectRatio: number
  }
}

export type SanityImage = {
  asset: SanityImageAsset
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
}
