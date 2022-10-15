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

// grabs two random images after ignoring the first
function randomTwo(images: SanityImage[]) {
  return [...images.slice(1)].sort(() => 0.5 - Math.random()).slice(0, 2)
}

export function useImages(images: SanityImage[]) {
  images = images.filter(onlyUniqueAndValid)
  const hero = images[0]
  const previewImages = randomTwo(images)
  const subjectImage = images[1]
  const elementImages = images.slice(2)

  return { hero, previewImages, subjectImage, elementImages, images }
}
