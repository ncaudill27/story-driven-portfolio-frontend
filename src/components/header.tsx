import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"
import { spacing } from "../styles/constants"
import Hidden from "./hidden"

export default function Header() {
  return (
    <RootWrapper>
      <Nav>
        <Link to="/">
          <PlaceholderLogomark>
            {/* TODO place logomark img here */}
            <Hidden>Home</Hidden>
          </PlaceholderLogomark>
        </Link>
        <NavLink to="/analog/">Analog</NavLink>
        <NavLink to="/digital/">Digital</NavLink>
        <NavLink to="/film/">Film</NavLink>
        <NavLink to="/contact/">Contact</NavLink>
      </Nav>
    </RootWrapper>
  )
}

const RootWrapper = styled.header`
  height: 80px;
  padding-top: 14px;
  padding-left: ${spacing(3)};
  padding-right: ${spacing(9)};
`

const Nav = styled.nav`
  display: flex;
  gap: 45px;

  & :first-child {
    margin-right: auto;
  }
`

const NavLink = styled(Link)`
  height: fit-content;
  margin-top: 16px;

  text-decoration: none;
  color: inherit;
  font-family: inherit;

  &:focus {
    outline-offset: ${spacing(0)};
  }
`

const PlaceholderLogomark = styled.div`
  background-color: gray;
  height: 52px;
  width: 52px;
  border-radius: 50%;
`
