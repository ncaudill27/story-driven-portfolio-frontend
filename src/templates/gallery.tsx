import * as React from "react"
import { graphql } from "gatsby"
import { toPlainText } from "@portabletext/react"
import type { HeadFC, PageProps } from "gatsby"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Image from "../components/image"
import { useImages } from "../hooks/use-images"

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

export default function ProjectTemplate({ data }: PageProps<DataProps>) {
  const { images: rawImages } = data.pageData
  const { images } = useImages(rawImages)

  return (
    <>
      {images.map(i => (
        <Image image={i} />
      ))}
    </>
  )
}

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
