import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import type { GatsbyImageProps } from "gatsby-plugin-image"
import { useAsset } from "../hooks/use-asset"
import type { SanityImage } from "../types/sanity"

interface ImageProps extends Omit<GatsbyImageProps, "image" | "alt"> {
  image: SanityImage
}

export default function Image({ image, ...props }: ImageProps) {
  if (!image) return null

  const { altText, gatsbyImageData } = useAsset(image)

  return <GatsbyImage alt={altText} image={gatsbyImageData} {...props} />
}
