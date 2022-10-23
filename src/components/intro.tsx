import * as React from "react"
import styled from "styled-components"
import type { PortableTextBlock } from "@portabletext/types"
import type { SanityImage } from "../types/sanity"

import Image from "../components/image"
import BlockContent from "./block-content"

type IntroProps = {
  heading?: string
  blocks: PortableTextBlock
  image: SanityImage
}

export default function Intro({ heading, blocks, image }: IntroProps) {
  return (
    <RootWrapper>
      <CopyWrapper style={{ "--extra-margin": "94px" }}>
        {heading && <Title>Analog Page</Title>}
        <BlockContent blocks={blocks} />
      </CopyWrapper>
      <ImageWrapper>
        <Image image={image} objectFit="contain" />
      </ImageWrapper>
    </RootWrapper>
  )
}

const Title = styled.h1`
  font-size: ${92 / 16}rem;
`

const RootWrapper = styled.div`
  margin-top: 180px;
  padding-inline: 120px; /* TODO find fliud value that maxes at 120px */

  display: flex;
  justify-content: center;
  isolation: isolate;
`
interface Wrapper {
  style: {
    "--extra-margin": string
  }
}
const CopyWrapper = styled.div<Wrapper>`
  max-width: 705px;
  margin-top: var(--extra-margin);

  z-index: 1;
`

const ImageWrapper = styled.div`
  margin-left: -90px;
  width: 750px;
`
