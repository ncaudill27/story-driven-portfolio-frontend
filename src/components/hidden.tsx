import * as React from "react"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

interface HiddenProps {
  children: string
}

export default function Hidden(props: HiddenProps) {
  return <VisuallyHidden.Root {...props} />
}
