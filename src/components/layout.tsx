import React, { ReactElement } from "react"

import GlobalStyles from "../styles/global-styles"
import Header from "./header"

type LayoutComponentProps = {
  children: ReactElement | ReactElement[]
}

const Layout = ({ children }: LayoutComponentProps) => (
  <>
    <GlobalStyles />
    <Header />
    {children}
  </>
)

export default Layout
