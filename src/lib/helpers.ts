import type { IGatsbyImageData } from "gatsby-plugin-image"

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

export function cn<T>(...args: T[]) {
  return args.filter(Boolean).join(" ")
}

export function mapEdgesToNodes<T>(data: { edges: { node: T }[] }) {
  if (!data?.edges) {
    console.warn(`Missing property edges: \n${JSON.stringify(data, null, 2)}`)
    return []
  }
  return data.edges.map(edge => edge.node)
}

export function getProjectUrl(slug: { current: string }) {
  return `/projects/${slug.current || slug}/`
}

// export function buildImageObj(source: SanityImage) {
//   const imageObj = {
//     asset: { _ref: source.asset._ref || source.asset._id },
//     crop: source.crop ? source.crop : undefined,
//     hotspot: source.hotspot ? source.hotspot : undefined,
//   }

//   return imageObj
// }
