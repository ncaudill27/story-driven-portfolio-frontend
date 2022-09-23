export function cn<T>(...args: T[]) {
  return args.filter(Boolean).join(" ")
}

export function mapEdgesToNodes<T>(data?: { edges: { node: T }[] }) {
  if (!data?.edges) {
    console.warn(`Missing property edges: \n${JSON.stringify(data, null, 2)}`)
    return []
  }
  return data.edges.map(edge => edge.node)
}

// interface MayHaveSlug {
//   slug: {
//     current?: string
//   } | null // you can use any type, number is just an example
// }
// interface HasSlug {
//   slug: { current: string }
// }
// export function filterSlugless<T extends MayHaveSlug>(
//   a: T[]
// ): Array<T & HasSlug> {
//   let filtered = []
//   for (let i = 0; i < a.length; i++) {
//     if (a[i].slug !== null) {
//       filtered.push(a[i])
//     }
//   }

//   return filtered
// }

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
