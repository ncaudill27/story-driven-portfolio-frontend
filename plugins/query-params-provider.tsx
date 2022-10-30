import React, { useState } from "react"
import { navigate } from "gatsby"
import { QueryParamProvider } from "use-query-params"
import { globalHistory } from "@reach/router"
import type {
  PartialLocation,
  QueryParamAdapterComponent,
  QueryParamAdapter,
} from "use-query-params"

export const GatsbyAdapter: QueryParamAdapterComponent = ({ children }) => {
  const [adapter] = useState<QueryParamAdapter>(() => ({
    get location() {
      return globalHistory.location
    },
    push(location: PartialLocation) {
      navigate(location.search || "?", { replace: false })
    },
    replace(location: PartialLocation) {
      navigate(location.search || "?", { replace: true })
    },
  }))

  return children(adapter)
}

export default ({ children }: { children: React.ReactNode }) => (
  <QueryParamProvider adapter={GatsbyAdapter}>{children}</QueryParamProvider>
)
