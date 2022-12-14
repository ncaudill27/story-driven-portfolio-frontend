import type { GatsbyEdges } from "../types/gatsby"
import type { SanityImage } from "../types/sanity"

export function cn<T>(...args: T[]) {
  return args.filter(Boolean).join(" ")
}

export function mapEdgesToNodes<T>(data?: GatsbyEdges<T>) {
  if (!data?.edges) {
    console.warn(`Missing property edges: \n${JSON.stringify(data, null, 2)}`)
    return []
  }
  return data.edges.map(edge => edge.node)
}

export function getPageData<T>(data?: GatsbyEdges<T>) {
  return mapEdgesToNodes<T>(data)[0]
}

type ProjectUrlParams = {
  slug: string
  mediaType: string
}

export function getProjectUrl({ slug, mediaType }: ProjectUrlParams) {
  return `/${mediaType}/${slug}/`
}

export function isValidImage(image: SanityImage): image is SanityImage {
  return !!image.asset?.gatsbyImageData
}

// export function buildImageObj(source: SanityImage) {
//   const imageObj = {
//     asset: { _ref: source.asset._ref || source.asset._id },
//     crop: source.crop ? source.crop : undefined,
//     hotspot: source.hotspot ? source.hotspot : undefined,
//   }

//   return imageObj
// }
