import { PortableText } from "@portabletext/react"
import type { PortableTextProps } from "@portabletext/react"
import React from "react"

const BlockContent = ({ blocks }: PortableTextProps) => (
  <PortableText value={blocks} />
)

export default BlockContent
