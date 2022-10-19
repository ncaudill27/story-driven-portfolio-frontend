import type { SanityImage } from "../types/sanity"

export function useAsset({ asset }: SanityImage) {
  return {
    _id: asset._id ?? "",
    title: asset.title ?? "",
    altText: asset.altText ?? "",
    gatsbyImageData: asset.gatsbyImageData,
    metadata: asset.metadata,
    publicUrl: asset.publicUrl,
  }
}
