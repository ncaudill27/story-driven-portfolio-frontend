import * as React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { toPlainText } from "@portabletext/react"
import type { HeadFC, PageProps } from "gatsby"
import type { IProject } from "../types/project"
import type { GalleryItemCbRefHeight } from "../hooks/use-gallery-height"

import SEO from "../components/seo"
import Image, { ImageProps } from "../components/image"
import { useImages } from "../hooks/use-images"
import GlobalStyles from "../styles/global-styles"
import { useGalleryHeight } from "../hooks/use-gallery-height"

type DataProps = {
  pageData: IProject
}

export const Head: HeadFC<DataProps> = ({ data }) => {
  const { name, images, brief } = data.pageData
  const { hero } = useImages(images)
  const description = toPlainText(brief)
  const seoImage = hero.asset.publicUrl
  const seoAlt = hero.asset.altText ?? ""

  return (
    <SEO
      title={name}
      description={description}
      imageAlt={seoAlt}
      imagePath={seoImage}
    />
  )
}

type GalleryImageProps = ImageProps & { set: GalleryItemCbRefHeight }
function GalleryImage({ image, set }: GalleryImageProps) {
  const imageEl = React.useCallback(set, [])

  return (
    <GalleryItem ref={imageEl}>
      <StyledGalleryImage image={image} />
    </GalleryItem>
  )
}

export type GalleryRef = React.MutableRefObject<HTMLUListElement | null>

export default function GalleryTemplate({ data }: PageProps<DataProps>) {
  const { images: rawImages } = data.pageData
  const { images } = useImages(rawImages)
  const [galleryHeight, callBackRefHeight] = useGalleryHeight()

  return (
    <GalleryWrapper style={{ "--height": galleryHeight + "px" }}>
      <GlobalStyles />
      {images.map(i => (
        <GalleryImage key={i.asset._id} image={i} set={callBackRefHeight} />
      ))}
    </GalleryWrapper>
  )
}

interface Gallery {
  style: {
    "--height": string
  }
}
const GalleryWrapper = styled.ul<Gallery>`
  --gap: 2%;
  padding: var(--gap);
  max-width: 100vw;
  display: flex;
  flex-flow: column wrap;
  align-content: space-between;
  /* Your container needs a fixed height, and it 
   * needs to be taller than your tallest column. */
  height: var(--height);
  &::before,
  &::after {
    content: "";
    flex-basis: 100%;
    width: 0;
    order: 2;
  }
`

const GalleryItem = styled.li`
  width: 32%;
  margin-bottom: var(--gap); /* Optional */
  &:nth-child(3n + 1) {
    order: 1;
  }
  &:nth-child(3n + 2) {
    order: 2;
  }
  &:nth-child(3n) {
    order: 3;
  }
`

const StyledGalleryImage = styled(Image)`
  margin-bottom: var(--gap);
`

export const query = graphql`
  query ProjectGalleryData($id: String!) {
    pageData: sanityProject(id: { eq: $id }) {
      name
      brief: _rawBrief
      images {
        ...SanityImageCoreFragment
      }
    }
  }
`
