import * as React from "react"
import styled from "styled-components"
import { BLUE } from "../styles/constants"

type HeadingProps = {
  view: "preview" | "project" | "primary"
  children: string | React.ReactNode
}

export default function Heading({ view, ...props }: HeadingProps) {
  switch (view) {
    case "primary":
      return null
    case "preview":
      return <Preview as="h2" {...props} />
    case "project":
      return <Project {...props} />
    default:
      return null
    // throw new Error('Prop Error: Missing or invalid "tag" prop')
  }
}

const BaseHeading = styled.h1`
  --max-font: ${92 / 16}rem;
  --min-font: ${60 / 16}rem;
  --fluidity: 4.8vw;
  --mixin: ${28 / 16}rem;
  font-size: clamp(
    var(--min-font),
    var(--fluidity) + var(--mixin),
    var(--max-font)
  );
  color: ${BLUE[700]};
  font-weight: bold;
  line-height: 1.1;
`

const Preview = styled(BaseHeading)`
  text-align: center;
  margin-bottom: 80px;
`

const Project = styled(BaseHeading)`
  min-width: 630px;
`
