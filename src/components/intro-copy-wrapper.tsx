import * as React from "react"
import styled from "styled-components"

interface IntroCopyWrapperProps {
  children: JSX.Element
  extraMargin?: number
}

export default function IntroCopyWrapper({
  children,
  extraMargin,
}: IntroCopyWrapperProps) {
  return (
    <Wrapper style={{ "--extra-margin": extraMargin + "px" }}>
      {children}
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
