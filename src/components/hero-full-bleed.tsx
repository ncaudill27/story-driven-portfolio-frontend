import * as React from "react"
import styled from "styled-components"
import Image from "./image"
import type { SanityImage } from "../types/sanity"

type HeroFullBleedProps = {
  image: SanityImage
}

export default function HeroFullBleed({ image }: HeroFullBleedProps) {
  // TODO determine if dimensions needed

  return (
    <HeroWrapper>
      <Image image={image} loading="eager" objectFit="contain" />
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
