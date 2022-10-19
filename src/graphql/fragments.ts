import { graphql } from "gatsby"

export const SanityImageCoreFragment = graphql`
  fragment SanityImageCoreFragment on SanityImage {
    asset {
      _id
      altText
      gatsbyImageData
      metadata {
        dimensions {
          width
          height
          aspectRatio
        }
      }
    }
  }
`

export const SanityImageCropFragment = graphql`
  fragment SanityImageCropFragment on SanityImage {
    crop {
      _key
      _type
      bottom
      left
      right
      top
    }
  }
`
export const SanityImageHotspotFragment = graphql`
  fragment SanityImageHotspotFragment on SanityImage {
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

export const SanityProjectPreview = graphql`
  fragment SanityProjectPreview on SanityProject {
    id
    brief: _rawBrief
    name
    mediaType
    images {
      asset {
        _id
        title
        altText
        gatsbyImageData
      }
    }
  }
`
