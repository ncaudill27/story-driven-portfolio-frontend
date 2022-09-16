import { PortableText } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import React from "react"

const BlockContent = ({ blocks }: { blocks: PortableTextBlock }) => (
  <PortableText value={blocks} />
)

export default BlockContent
