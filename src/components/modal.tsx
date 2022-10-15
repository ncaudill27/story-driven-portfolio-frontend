import * as React from "react"
import styled from "styled-components"
import * as Dialog from "@radix-ui/react-dialog"
import { IModalContext, ModalContext } from "../containers/layout"

const Overlay = styled(Dialog.Overlay)`
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
`

const Content = styled(Dialog.Content)`
  min-width: 300;
  background: white;
  padding: 30;
  border-radius: 4;
`

export default function Modal({ modal, setModal }: IModalContext) {
  const [open, setOpen] = React.useState(!!modal)
  const toggleModal = React.useCallback(
    (e: boolean) => {
      if (!e) setModal(null)
      setOpen(e => e && !!modal)
    },
    [setOpen, setModal]
  )
  React.useEffect(() => {
    setOpen(!!modal)
    if (!!modal === false) {
      setModal("null")
    }
  }, [modal, setOpen, setModal])

  console.log(open)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Overlay>
          <Content>GENERIC MODAL</Content>
        </Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
