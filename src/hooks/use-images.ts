import type { SanityImage } from "../types/sanity"

export function useImages(images: SanityImage[]) {
  const hero = images[0]
  const briefImages = images.slice(1)
  const subjectImage = images[1]
  const elementImages = images.slice(2)

  return { hero, briefImages, subjectImage, elementImages }
}
