import * as React from "react"
import { QueryParamProvider } from "use-query-params"
import { GatsbyAdapter } from "./src/components/query-params-provider"

export const wrapRootElement = ({ element }) => (
  <QueryParamProvider adapter={GatsbyAdapter}>{element}</QueryParamProvider>
)
