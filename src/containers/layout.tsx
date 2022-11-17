import React, { ReactElement, createContext, useMemo } from "react"
import { useQueryParam } from "use-query-params"
import type { PageProps } from "gatsby"
import type { UrlUpdateType } from "use-query-params"

import Layout from "../components/layout"

type LayoutContainerProps = {
  location?: PageProps["location"]
  children: ReactElement | ReactElement[]
}

export interface IModalContext {
  modal: string | null | undefined
  setModal: (newValue: string | null, updateType?: UrlUpdateType) => void
}

export const ModalContext = createContext<IModalContext>({
  modal: null,
  setModal: () => undefined,
})

function LayoutContainer(props: LayoutContainerProps) {
  const { location } = props
  const [modal, setModal] = useQueryParam<string | null>("modal")
  const modalValues = useMemo(() => ({ modal, setModal }), [modal, setModal])
  const hideNav = !!location?.pathname && !/gallery/.test(location.pathname)

  return (
    <ModalContext.Provider value={modalValues}>
      <Layout hideNav={hideNav} {...props} />
    </ModalContext.Provider>
  )
}

export default LayoutContainer
