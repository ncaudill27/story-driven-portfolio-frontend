import { useState } from "react"
import boundingClientRect from "../lib/bounding-client-rect"

export type GalleryItemCbRefHeight = (node: HTMLElement | null) => Promise<void>
type GalleryHeightTuple = [number, GalleryItemCbRefHeight]

export function useGalleryHeight(): GalleryHeightTuple {
  const [imageHeightArray, setImageHeightArray] = useState<number[]>([])
  let col1Height = 0,
    col2Height = 0,
    col3Height = 0

  for (let i = 0; i < imageHeightArray.length; i++) {
    const imageHeight = imageHeightArray[i]
    const columnKey = i % 3

    switch (columnKey) {
      case 0:
        col1Height += imageHeight
        break
      case 1:
        col2Height += imageHeight
        break
      case 2:
        col3Height += imageHeight
        break
      default:
        break
    }
  }

  const tallestColumn = Math.max(col1Height, col2Height, col3Height)
  const marginCoefficient = (imageHeightArray.length + 3 * 2) / 100 + 1
  const galleryHeight = tallestColumn * marginCoefficient

  async function callbackRefHeight(node: HTMLElement | null) {
    if (node !== null) {
      const { height } = await boundingClientRect(node)
      setImageHeightArray(prev => [...prev, height])
    }
  }

  return [galleryHeight, callbackRefHeight]
}
