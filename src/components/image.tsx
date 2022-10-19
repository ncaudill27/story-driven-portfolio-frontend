import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useAsset } from "../hooks/use-asset"
import { isValidImage } from "../lib/helpers"
import type { SanityImage } from "../types/sanity"

type ImageProps = {
  image: SanityImage
}

export default function Image({ image }: ImageProps) {
  if (!isValidImage(image)) return null
  const { altText, gatsbyImageData } = useAsset(image)

  return <GatsbyImage alt={altText} image={gatsbyImageData} />
}
