import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { toPlainText } from "@portabletext/react"
import type { HeadFC, PageProps } from "gatsby"
import type { IProject } from "../types/project"

import SEO from "../components/seo"
import Layout from "../components/layout"
import BlockContent from "../components/block-content"

type DataProps = {
  pageData: IProject
}

export const Head: HeadFC<DataProps> = ({ data }) => {
  const { name, hero, brief } = data.pageData
  const description = toPlainText(brief)
  const seoImage = hero.asset.publicUrl
  const seoAlt = hero.asset?.altText ?? ""
  console.log(description)

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
  console.log(data.pageData)
  const { name, intro, subject, elements, images } = data.pageData
  const leadParagraph = intro
  const { altText: leadAltText, gatsbyImageData: leadGatsbyImageData } =
    images[0].asset
  const {
    altText: subjectImageAltText,
    gatsbyImageData: subjectImageGatsbyData,
  } = images[1].asset
  const elementImages = images.slice(2, 2 + elements.length)

  return (
    <Layout>
      <h1>{name}</h1>
      <>
        <GatsbyImage alt={leadAltText ?? ""} image={leadGatsbyImageData} />
        <BlockContent blocks={leadParagraph} />
      </>
      <>
        <BlockContent blocks={subject} />
        <GatsbyImage
          alt={subjectImageAltText ?? ""}
          image={subjectImageGatsbyData}
        />
      </>
      <>
        {elements.map((e, i) => {
          const name = e.name
          const description = e.description
          const {
            altText: imageAltText,
            gatsbyImageData: imageGatsbyImageData,
          } = elementImages[i].asset

          return (
            <>
              <h2>{name}</h2>
              <BlockContent blocks={description} />
              <GatsbyImage
                alt={imageAltText ?? ""}
                image={imageGatsbyImageData}
              />
            </>
          )
        })}
      </>
      <pre>
        <code>{JSON.stringify(data.pageData, null, 2)}</code>
      </pre>
    </Layout>
  )
}
export const query = graphql`
  query ProjectTemplateData($id: String!) {
    pageData: sanityProject(id: { eq: $id }) {
      name
      mediaType
      brief: _rawBrief
      intro: _rawIntro
      subject: _rawSubject
      elements {
        name
        description: _rawDescription
      }
      hero {
        alt
        asset {
          gatsbyImageData
        }
      }
      images {
        ...SanityMainImageCoreFragment
      }
    }
  }
`
