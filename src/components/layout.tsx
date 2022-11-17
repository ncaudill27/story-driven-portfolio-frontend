import React, { ReactElement } from "react"

import GlobalStyles from "../styles/global-styles"
import Header from "./header"

type LayoutComponentProps = {
  hideNav: boolean
  children: ReactElement | ReactElement[]
}

const Layout = ({ hideNav, children }: LayoutComponentProps) => (
  <>
    <GlobalStyles />
    {hideNav && <Header />}
    {children}
  </>
)

export default Layout
