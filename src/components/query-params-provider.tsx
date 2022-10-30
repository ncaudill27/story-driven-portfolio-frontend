import { globalHistory } from "@reach/router"
import { useState } from "react"
import {
  PartialLocation,
  QueryParamAdapterComponent,
  QueryParamAdapter,
} from "use-query-params"
import { navigate } from "gatsby"

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
