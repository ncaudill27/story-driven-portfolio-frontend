import { graphql } from "gatsby"

export const SanityImage = graphql`
  fragment SanityMainImageFragment on SanityMainImage {
    alt
    title
    asset {
      _id
      gatsbyImageData
    }
    crop {
      _key
      _type
      bottom
      left
      right
      top
    }
    hotspot {
      _key
      _type
      height
      width
      x
      y
    }
  }
`
