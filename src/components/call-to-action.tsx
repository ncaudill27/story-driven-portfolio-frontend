import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"
import { BLUE } from "../styles/constants"

type CTAProps = {
  to: string
  variant?: string
  children: any
}

export default function CTALink({ variant = "fill", ...props }: CTAProps) {
  if (variant === "fill") {
    return <Filled {...props} />
  }

  if (variant === "ghost") {
    return <Ghost {...props} />
  }

  return null
}

const BaseLink = styled(Link)`
  display: inline-block;
  margin-top: 48px;
  padding: 16px 32px;

  font-size: ${32 / 16}rem;
  color: inherit;
  text-decoration: none;
  font-family: inherit;
`

const Filled = styled(BaseLink)`
  color: ${BLUE[100]};
  background-color: ${BLUE[500]};

  &:hover {
    background-color: ${BLUE[400]};
  }
`

const Ghost = styled(BaseLink)`
  width: fit-content;
  margin-top: 0;
  padding: 8px 16px;

  &:hover {
    background-color: ${BLUE[200]};
  }
`
