import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useAsset } from "../hooks/use-asset"
import type { SanityImage } from "../types/sanity"

type ImageProps = {
  image: SanityImage
}

export default function Image({ image, ...props }: ImageProps) {
  const { altText, gatsbyImageData } = useAsset(image)

  return <GatsbyImage alt={altText} image={gatsbyImageData} {...props} />
}
