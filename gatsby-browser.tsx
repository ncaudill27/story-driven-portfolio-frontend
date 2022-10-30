import * as React from "react"
import QueryParamProvider from "./plugins/query-params-provider"

export const wrapRootElement = ({ element }) => (
  <QueryParamProvider>{element}</QueryParamProvider>
)
