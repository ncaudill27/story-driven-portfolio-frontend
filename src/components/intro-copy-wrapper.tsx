import * as React from "react"
import styled from "styled-components"
import BlockContent from "./block-content"
import type { PortableTextBlock } from "@portabletext/types"

interface IntroCopyProps {
  blocks: PortableTextBlock
  extraMargin?: number
}

export default function IntroCopy({ blocks, extraMargin }: IntroCopyProps) {
  return (
    <Wrapper style={{ "--extra-margin": extraMargin + "px" }}>
      <BlockContent blocks={blocks} />
    </Wrapper>
  )
}

interface Wrapper {
  style: {
    "--extra-margin": string
  }
}
const Wrapper = styled.div<Wrapper>`
  max-width: 705px;
  margin-top: var(--extra-margin);

  z-index: 1;
`
