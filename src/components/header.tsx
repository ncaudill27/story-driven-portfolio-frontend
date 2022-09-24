import * as React from "react"
import styled from "styled-components"
import { spacing } from "../styles/constants"
import Hidden from "./hidden"

export default function Header() {
  return (
    <RootWrapper>
      <PlaceholderLogomark>
        {/* TODO place logomark img here */}
        <Hidden>Home</Hidden>
      </PlaceholderLogomark>
    </RootWrapper>
  )
}

const RootWrapper = styled.header`
  height: 80px;
  padding-left: ${spacing(3)};
  padding-right: ${spacing(9)};
`

const PlaceholderLogomark = styled.div`
  background-color: gray;
  height: 52px;
  width: 52px;
  border-radius: 50%;
`
