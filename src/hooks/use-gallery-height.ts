import { SanityImage } from "../types/sanity"

export function useGalleryHeight(images: SanityImage[]) {
  let col1Height = 0,
    col2Height = 0,
    col3Height = 0

  for (let i = 0; i < images.length; i++) {
    const imageHeight = images[0].asset.metadata.dimensions.height
    const columnKey = i % 3

    switch (columnKey) {
      case 0:
        col1Height += imageHeight
        break
      case 1:
        col2Height += imageHeight
      case 2:
        col3Height += imageHeight
      default:
        break
    }
  }

  console.log(col1Height, col2Height, col3Height)
  return Math.max(col1Height, col2Height, col3Height)
}
