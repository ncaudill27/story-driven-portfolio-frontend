import React, { ReactElement } from "react"

import GlobalStyles from "../styles/global-styles"

type LayoutComponentProps = {
  children: ReactElement | ReactElement[]
}

const Layout = ({ children }: LayoutComponentProps) => (
  <>
    <GlobalStyles />
    {children}
  </>
)

export default Layout
