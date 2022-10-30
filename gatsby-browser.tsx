import * as React from "react"
import QueryParamProvider from "./plugins/query-params-provider"

export const wrapRootElement = ({ element }) => (
  <QueryParamProvider>{element}</QueryParamProvider>
)

// If the pathname hasn't changed on an update, such as changing a query parameter
// then the page should not scroll to top.
export function shouldUpdateScroll({ prevRouterProps, routerProps }) {
  return prevRouterProps?.location?.pathname !== routerProps.location.pathname
}
