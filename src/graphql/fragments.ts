import { graphql } from "gatsby"

export const SanityMainImageCoreFragment = graphql`
  fragment SanityMainImageCoreFragment on SanityMainImage {
    alt
    asset {
      gatsbyImageData
    }
  }
`

export const SanityMainImageCropFragment = graphql`
  fragment SanityMainImageCropFragment on SanityMainImage {
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
export const SanityMainImageHotspotFragment = graphql`
  fragment SanityMainImageHotspotFragment on SanityMainImage {
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
    slug {
      current
    }
    hero {
      title
      ...SanityMainImageCoreFragment
    }
    secondHero {
      secondHeroImage {
        title
        ...SanityMainImageCoreFragment
      }
    }
    images {
      alt
      title
      asset {
        _id
        gatsbyImageData
      }
    }
  }
`
