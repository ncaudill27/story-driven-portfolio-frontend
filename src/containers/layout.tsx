import React, { ReactElement } from "react"

import Layout from "../components/layout"

type LayoutContainerProps = {
  children: ReactElement | ReactElement[]
}

function LayoutContainer(props: LayoutContainerProps) {
  return <Layout {...props} />
}

export default LayoutContainer
