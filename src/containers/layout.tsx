import React, { ReactElement, createContext, useMemo } from "react"
import { useQueryParam } from "use-query-params"
import type { UrlUpdateType } from "use-query-params"

import Layout from "../components/layout"

type LayoutContainerProps = {
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
  const [modal, setModal] = useQueryParam<string | null>("modal")
  const modalValues = useMemo(() => ({ modal, setModal }), [modal, setModal])

  return (
    <ModalContext.Provider value={modalValues}>
      <Layout {...props} />
    </ModalContext.Provider>
  )
}

export default LayoutContainer
