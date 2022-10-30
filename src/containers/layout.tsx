import React, { ReactElement } from "react"
import { useQueryParam, StringParam } from "use-query-params"

import Layout from "../components/layout"

type LayoutContainerProps = {
  children: ReactElement | ReactElement[]
}

function LayoutContainer(props: LayoutContainerProps) {
  const [modal, setModal] = useQueryParam("modal", StringParam)

  console.log("\n#####\n", "MODAL: ", modal, "\n#####\n")
  return <Layout {...props} />
}

export default LayoutContainer
