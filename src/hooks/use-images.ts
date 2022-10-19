import { isValidImage } from "../lib/helpers"
import type { SanityImage } from "../types/sanity"

function onlyUniqueAndValid(
  image: SanityImage,
  index: number,
  self: SanityImage[]
) {
  return (
    self.findIndex(
      i => isValidImage(image) && i.asset._id === image.asset._id
    ) === index
  )
}

export function useImages(images: SanityImage[]) {
  images = images.filter(onlyUniqueAndValid)
  const hero = images[0]
  const briefImages = images.slice(1)
  const subjectImage = images[1]
  const elementImages = images.slice(2)

  return { hero, briefImages, subjectImage, elementImages }
}
