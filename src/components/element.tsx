import * as React from "react"
import styled from "styled-components"
import type { SanityImage } from "../types/sanity"
import type { Element } from "../types/project"

import Image from "./image"
import BlockContent from "./block-content"

type ElementSectionProps = {
  element: Element
  index: number
  image: SanityImage
}

export default function ElementSection({
  element,
  index,
  image,
}: ElementSectionProps) {
  const { name, description } = element

  // create two components EvenElement & OddElement and render based on index
  return (
    <RootWrapper>
      <ImageWrapper>
        <Image image={image} />
      </ImageWrapper>
      <CopyWrapper>
        <Name>{name}</Name>
        <BlockContent blocks={description} />
      </CopyWrapper>
    </RootWrapper>
  )
}

const RootWrapper = styled.div`
  display: flex;
  flex-direction: var(--flex-direction);
`

const CopyWrapper = styled.div``

const ImageWrapper = styled.div``

const Name = styled.h2`
  font-size: 32px;
  font-weight: bold;
`
