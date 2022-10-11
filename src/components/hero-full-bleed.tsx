import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import type { IGatsbyImageData } from "gatsby-plugin-image"
import type { SanityImageMetadata } from "../types/sanity"

type HeroFullBleedProps = {
  alt: string
  imageData: IGatsbyImageData
  dimensions: SanityImageMetadata["dimensions"]
}

export default function HeroFullBleed({
  alt,
  imageData,
  dimensions,
}: HeroFullBleedProps) {
  // TODO determine if dimensions needed

  return (
    <HeroWrapper>
      <GatsbyImage
        alt={alt}
        image={imageData}
        loading="eager"
        objectFit="contain"
      />
    </HeroWrapper>
  )
}

const HeroWrapper = styled.div`
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
