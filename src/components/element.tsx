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
  const isEven = index % 2 == 0

  // create two components EvenElement & OddElement and render based on index
  return (
    <RootWrapper
      style={{
        "--flex-direction": isEven ? "row-reverse" : "row",
        "--padding-left": isEven ? "142px" : "80px",
      }}
    >
      <ImageWrapper style={{ "--margin-top": isEven ? "60px" : "120px" }}>
        <Image image={image} />
      </ImageWrapper>
      <CopyWrapper style={{ "--margin-right": isEven ? "-12px" : "0" }}>
        <Name>{name}</Name>
        <BlockContent blocks={description} />
      </CopyWrapper>
    </RootWrapper>
  )
}

interface Root {
  style: {
    "--flex-direction": "row-reverse" | "row"
    "--padding-left": string
  }
}

const RootWrapper = styled.div<Root>`
  margin-top: 180px;
  padding-left: var(--padding-left);
  padding-right: 136px;

  display: flex;
  flex-direction: var(--flex-direction);
  justify-content: center;

  isolation: isolate;
`

interface Copy {
  style: {
    "--margin-right": string
  }
}

const CopyWrapper = styled.div<Copy>`
  min-width: 568px;
  margin-right: var(--margin-right);

  z-index: 1;
`

interface Image {
  style: { "--margin-top": "60px" | "120px" }
}

const ImageWrapper = styled.div<Image>`
  margin-top: var(--margin-top);
  margin-left: -176px;
`

const Name = styled.h2`
  font-size: ${52 / 16}rem;
  font-weight: bold;
`
