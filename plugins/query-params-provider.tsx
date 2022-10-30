import React from "react"
import { QueryParamProvider } from "use-query-params"
import { ReachAdapter } from "use-query-params/adapters/reach"

export default ({ children }: { children: React.ReactNode }) => (
  <QueryParamProvider adapter={ReachAdapter}>{children}</QueryParamProvider>
)
