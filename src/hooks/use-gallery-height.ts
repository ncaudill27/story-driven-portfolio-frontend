import { useState } from "react"
import boundingClientRect from "../lib/bounding-client-rect"

export type GalleryItemCbRefHeight = (
  id: number
) => (node: HTMLElement | null) => Promise<void>

type GalleryHeightTuple = [number, GalleryItemCbRefHeight]
type DynamicRefHeights = {
  [id: number]: number
}

function calculateHeight(heights: DynamicRefHeights) {
  let col1Height = 0,
    col2Height = 0,
    col3Height = 0

  for (const [k, v] of Object.entries(heights)) {
    console.log("\n#####\n", "K: ", k, "\n#####\n")
    console.log("\n#####\n", "V: ", v, "\n#####\n")
    const imageIndex = parseInt(k, 10)
    const imageHeight = v
    const columnKey = imageIndex % 3

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
  const marginCoefficient = (6 + 3 * 2) / 100 + 1
  const galleryHeight = tallestColumn * marginCoefficient

  return galleryHeight
}

export function useGalleryHeight(): GalleryHeightTuple {
  const [imageHeights, setImageHeights] = useState<DynamicRefHeights>({})
  let galleryHeight = calculateHeight(imageHeights)

  const ro = new ResizeObserver(entries => {
    for (let entry of entries) {
      setImageHeights(prev => ({
        ...prev,
        [entry.target.id]: entry.contentRect.height,
      }))
    }
  })

  function callbackRefHeight(id: number) {
    return async (node: HTMLElement | null) => {
      if (node !== null && !!id) {
        const { height } = await boundingClientRect(node)
        setImageHeights(prev => ({ ...prev, [id]: height }))
        ro.observe(node)
      }
    }
  }

  return [galleryHeight, callbackRefHeight]
}
