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
  const seoAlt = hero.alt
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
  const { name, brief, intro, subject, elements, images } = data.pageData
  const leadParagraph = intro || brief
  const leadImage = images[0]
  const subjectImage = images[1]
  const elementImages = images.slice(2, 2 + elements.length)

  return (
    <Layout>
      <h1>{name}</h1>
      <>
        <GatsbyImage
          alt={leadImage.alt}
          image={leadImage.asset.gatsbyImageData}
        />
        <BlockContent blocks={leadParagraph} />
      </>
      <>
        <BlockContent blocks={subject} />
        <GatsbyImage
          alt={subjectImage.alt}
          image={subjectImage.asset.gatsbyImageData}
        />
      </>
      <>
        {elements.map((e, i) => {
          const name = e.name
          const description = e.description

          return (
            <>
              <h2>{name}</h2>
              <BlockContent blocks={description} />
              <GatsbyImage
                alt={elementImages[i].alt}
                image={elementImages[i].asset.gatsbyImageData}
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
      secondHero {
        secondHeroImage {
          ...SanityMainImageCoreFragment
        }
      }
      images {
        ...SanityMainImageCoreFragment
      }
    }
  }
`
